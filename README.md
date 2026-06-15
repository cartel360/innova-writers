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

## Contributing an article

All article changes go through a pull request. Do not push directly to `main`.

### 1. Create a branch

```bash
git checkout main
git pull
git checkout -b article/your-article-slug
```

### 2. Add your files

- **Article:** `_posts/YYYY-MM-DD-your-article-slug.md`
- **Cover image:** `assets/images/your-cover-image.jpg`

### 3. Commit and push

```bash
git add _posts/ assets/images/
git commit -m "Add article: Your Article Title"
git push -u origin article/your-article-slug
```

### 4. Open a pull request

Open a PR into `main` on GitHub and wait for:

1. The **Validate articles** check to pass
2. A reviewer to approve your PR

A reviewer will merge your article once it is approved.

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
