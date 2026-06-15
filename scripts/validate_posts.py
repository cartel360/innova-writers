#!/usr/bin/env python3
"""Validate new or changed Jekyll posts in a pull request."""

from __future__ import annotations

import argparse
import re
import subprocess
import sys
from pathlib import Path

import yaml

REPO_ROOT = Path(__file__).resolve().parents[1]
POSTS_DIR = REPO_ROOT / "_posts"
TEAM_FILE = REPO_ROOT / "_data" / "team.yml"
IMAGE_DIR = REPO_ROOT / "assets" / "images"

FILENAME_PATTERN = re.compile(r"^\d{4}-\d{2}-\d{2}-[a-z0-9][a-z0-9-]*\.md$")
REQUIRED_FIELDS = ("layout", "title", "author", "categories", "tags", "description", "image")
IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif"}
MIN_DESCRIPTION_LENGTH = 50
MIN_BODY_LENGTH = 200


def load_team_names() -> set[str]:
    with TEAM_FILE.open(encoding="utf-8") as handle:
        team = yaml.safe_load(handle) or []
    return {member["name"] for member in team if member.get("name")}


def parse_front_matter(path: Path) -> tuple[dict, str]:
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---"):
        raise ValueError("missing opening front matter delimiter '---'")

    parts = text.split("---", 2)
    if len(parts) < 3:
        raise ValueError("front matter is not closed with a second '---'")

    front_matter = yaml.safe_load(parts[1]) or {}
    body = parts[2].strip()
    if not isinstance(front_matter, dict):
        raise ValueError("front matter must be a YAML mapping")

    return front_matter, body


def changed_post_files(base_ref: str) -> list[Path]:
    result = subprocess.run(
        ["git", "diff", "--name-only", "--diff-filter=ACMR", f"{base_ref}...HEAD", "--", "_posts"],
        cwd=REPO_ROOT,
        check=True,
        capture_output=True,
        text=True,
    )
    files = [REPO_ROOT / line for line in result.stdout.splitlines() if line.endswith(".md")]
    return [path for path in files if path.exists()]


def resolve_image_path(image_value: str) -> Path:
    normalized = image_value.strip().lstrip("/")
    return REPO_ROOT / normalized


def validate_post(path: Path, team_names: set[str]) -> list[str]:
    errors: list[str] = []
    rel_path = path.relative_to(REPO_ROOT)

    if not FILENAME_PATTERN.match(path.name):
        errors.append(
            f"{rel_path}: filename must match YYYY-MM-DD-lowercase-slug.md "
            "(example: 2026-02-23-clean-code.md)"
        )

    try:
        front_matter, body = parse_front_matter(path)
    except (ValueError, yaml.YAMLError) as exc:
        return [f"{rel_path}: {exc}"]

    for field in REQUIRED_FIELDS:
        if field not in front_matter or front_matter[field] in (None, "", []):
            errors.append(f"{rel_path}: missing required front matter field '{field}'")

    if front_matter.get("layout") != "post":
        errors.append(f"{rel_path}: layout must be 'post'")

    title = front_matter.get("title")
    if isinstance(title, str) and not title.strip():
        errors.append(f"{rel_path}: title cannot be empty")

    author = front_matter.get("author")
    if isinstance(author, str) and author.strip() not in team_names:
        errors.append(
            f"{rel_path}: author '{author}' is not listed in _data/team.yml. "
            f"Use one of: {', '.join(sorted(team_names))}"
        )

    for list_field in ("categories", "tags"):
        value = front_matter.get(list_field)
        if value is None:
            continue
        if not isinstance(value, list) or not value:
            errors.append(f"{rel_path}: {list_field} must be a non-empty YAML list")
        elif any(not isinstance(item, str) or not item.strip() for item in value):
            errors.append(f"{rel_path}: each entry in {list_field} must be a non-empty string")

    description = front_matter.get("description")
    if isinstance(description, str):
        if len(description.strip()) < MIN_DESCRIPTION_LENGTH:
            errors.append(
                f"{rel_path}: description must be at least {MIN_DESCRIPTION_LENGTH} characters"
            )

    if len(body) < MIN_BODY_LENGTH:
        errors.append(
            f"{rel_path}: article body must be at least {MIN_BODY_LENGTH} characters "
            "after the front matter"
        )

    image_value = front_matter.get("image")
    if isinstance(image_value, str) and image_value.strip():
        image_path = resolve_image_path(image_value)
        if IMAGE_DIR not in image_path.parents and image_path.parent != IMAGE_DIR:
            errors.append(
                f"{rel_path}: image must live under assets/images/ "
                f"(got '{image_value}')"
            )
        elif image_path.suffix.lower() not in IMAGE_EXTENSIONS:
            errors.append(
                f"{rel_path}: cover image must be one of {', '.join(sorted(IMAGE_EXTENSIONS))}"
            )
        elif not image_path.is_file():
            errors.append(
                f"{rel_path}: cover image file not found at '{image_value}'. "
                "Add the image in this pull request."
            )

    featured = front_matter.get("featured")
    if featured is not None and not isinstance(featured, bool):
        errors.append(f"{rel_path}: featured must be true or false when provided")

    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate changed blog posts.")
    parser.add_argument(
        "--base",
        default="origin/main",
        help="Git ref to compare against (default: origin/main)",
    )
    args = parser.parse_args()

    if not TEAM_FILE.exists():
        print(f"ERROR: missing team file at {TEAM_FILE}", file=sys.stderr)
        return 1

    team_names = load_team_names()
    posts = changed_post_files(args.base)

    if not posts:
        print("No changed post files to validate.")
        return 0

    all_errors: list[str] = []
    for post in posts:
        all_errors.extend(validate_post(post, team_names))

    if all_errors:
        print("Post validation failed:\n", file=sys.stderr)
        for error in all_errors:
            print(f"  - {error}", file=sys.stderr)
        print(
            "\nRequired article format:\n"
            "  _posts/YYYY-MM-DD-article-slug.md\n"
            "  ---\n"
            "  layout: post\n"
            "  title: \"Your Article Title\"\n"
            "  author: Author Name\n"
            "  categories: [Category One, Category Two]\n"
            "  tags: [Tag One, Tag Two]\n"
            "  description: \"Short summary used for SEO and previews.\"\n"
            "  image: assets/images/your-cover-image.jpg\n"
            "  featured: false\n"
            "  ---\n",
            file=sys.stderr,
        )
        return 1

    print(f"Validated {len(posts)} changed post file(s).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
