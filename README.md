# Innova Writers

The official blog for [Innova Limited](https://innova.co.ke) — articles on software engineering, data science, finance, and technology from the Innova team.

**Live site:** [blogs.innova.co.ke](https://blogs.innova.co.ke)

## About

Innova Writers is a Jekyll static site. Articles live in `_posts/`, author profiles in `_authors/`, and cover images in `assets/images/`.

## Local development

### Prerequisites

- Ruby 3.x
- Bundler

### Run locally

```bash
bundle install
bundle exec jekyll serve
```

Open [http://localhost:4000](http://localhost:4000) in your browser.

## Contributing

All article changes must go through a pull request. Direct pushes to `main` are blocked.

### Workflow for writers

1. Create a branch from `main`:
   ```bash
   git checkout main
   git pull
   git checkout -b article/your-article-slug
   ```

2. Add your article and cover image:
   - Post file: `_posts/YYYY-MM-DD-your-article-slug.md`
   - Cover image: `assets/images/your-cover-image.jpg`

3. Commit and push your branch:
   ```bash
   git add _posts/ assets/images/
   git commit -m "Add article: Your Article Title"
   git push -u origin article/your-article-slug
   ```

4. Open a pull request into `main` on GitHub.

5. Wait for the **Validate articles** check to pass.

6. A reviewer listed in `.github/CODEOWNERS` must approve the PR.

7. Only reviewers with **Maintain** or **Admin** access (or the repo owner) can merge after approval.

### Required article format

```yaml
---
layout: post
title: "Your Article Title"
author: Billy Okeyo
categories: [Programming, Software Development]
tags: [Clean Code, Best Practices]
description: "A short summary of the article used for SEO and social previews. At least 50 characters."
image: assets/images/your-cover-image.jpg
featured: false
---

Your article content starts here...
```

### Rules enforced in CI

| Rule | Requirement |
|------|-------------|
| Filename | `YYYY-MM-DD-lowercase-slug.md` |
| Layout | Must be `post` |
| Author | Must match a name in `_data/team.yml` |
| Categories | Non-empty list |
| Tags | Non-empty list |
| Description | At least 50 characters |
| Cover image | Required, must exist under `assets/images/` |
| Body | At least 200 characters after front matter |

### Roles and permissions

| Role | Who | Can do |
|------|-----|--------|
| **Write** | Article writers | Push branches, open pull requests |
| **Maintain** | Designated reviewers | Approve PRs, merge after review |
| **Admin** | Repo owner | Approve PRs, merge after review |

Writers with **Write** access cannot merge to `main`. Only **Maintain** and **Admin** users can merge.


After the ruleset is active:

- Writers cannot push directly to `main`
- Changes must be merged through a pull request
- The **Validate articles** check must pass before merge
- A **CODEOWNERS** reviewer must approve the PR
- Authors cannot approve their own PR after pushing new commits
- Only **Admin** and **Maintain** users can merge to `main`

## Project structure

```
_posts/              Article markdown files
_authors/            Author profile pages
_data/team.yml       Author names used in post front matter
assets/images/       Cover images and site assets
_includes/           Reusable HTML partials
_layouts/            Page templates
.github/             CI workflows, CODEOWNERS, and branch rulesets
scripts/             Post validation script
```

## License

See [LICENSE.txt](LICENSE.txt).
