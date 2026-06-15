# Innova Writers

The official blog for [Innova Limited](https://innova.co.ke) — articles on software engineering, data science, finance, and technology from the Innova team.

**Live site:** [blogs.innova.co.ke](https://blogs.innova.co.ke)

## Get started

### Clone the repository

```bash
git clone https://github.com/cartel360/innova-writers.git
cd innova-writers
```

### Prerequisites

- Ruby 3.x
- Bundler

### Run locally

```bash
bundle install
bundle exec jekyll serve
```

Open [http://localhost:4000](http://localhost:4000) in your browser to preview the site.

## Public repository

This repo is **public**, so anyone can **clone and read** it. That does **not** mean anyone can push.

| Action | Who can do it |
|--------|----------------|
| Clone / read | Anyone |
| Push a branch | Invited collaborators only |
| Merge to `main` | Reviewers only (via approved PR) |

If you are not an invited collaborator, use the **fork workflow** below instead of pushing directly to this repo.

## Contributing an article

All article changes go through a pull request. Do not push directly to `main`.

### Option A — Invited writer (collaborator)

Use this if a repo admin has added you under **Settings → Collaborators** with **Write** access.

#### 1. Create a branch

```bash
git checkout main
git pull
git checkout -b article/your-article-slug
```

#### 2. Add your files

- **Article:** `_posts/YYYY-MM-DD-your-article-slug.md`
- **Cover image:** `assets/images/your-cover-image.jpg`

#### 3. Commit and push

Make sure you push to **your branch**, not `main`:

```bash
git add _posts/ assets/images/
git commit -m "Add article: Your Article Title"
git push -u origin HEAD
```

`HEAD` pushes whatever branch you are on (e.g. `article/your-article-slug`). Do not run `git push origin main`.

If push is rejected, you are not a collaborator — use **Option B (fork)** instead.

#### 4. Open a pull request

Open a PR into `main` on GitHub and wait for:

1. The **Validate articles** check to pass
2. A reviewer to approve your PR

A reviewer will merge your article once it is approved.

### Option B — Fork workflow (not a collaborator)

Anyone can contribute this way without push access to the original repo.

#### 1. Fork and clone your fork

On GitHub, click **Fork**, then:

```bash
git clone https://github.com/YOUR-USERNAME/innova-writers.git
cd innova-writers
git remote add upstream https://github.com/cartel360/innova-writers.git
```

#### 2. Create a branch

```bash
git checkout -b article/your-article-slug
```

#### 3. Add, commit, and push to your fork

```bash
git add _posts/ assets/images/
git commit -m "Add article: Your Article Title"
git push -u origin HEAD
```

#### 4. Open a pull request

On GitHub, open a PR **from your fork** into `cartel360/innova-writers` → `main`.

Wait for the **Validate articles** check and a reviewer approval. A reviewer will merge your PR.

## Article format

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

- `author` must match your name exactly as listed in `_data/team.yml`
- `featured` is optional (`true` or `false`)

## Validation rules

These are checked automatically when you open a pull request:

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

## Project structure

```
_posts/              Your article markdown files
assets/images/       Cover images for articles
_data/team.yml       Author names for the author field
_authors/            Author profile pages
```
