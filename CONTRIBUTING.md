# Contributing articles

All article changes must go through a pull request. Direct pushes to `main` are blocked.

## Workflow for writers

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

## Required article format

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

## Roles and permissions

| Role | Who | Can do |
|------|-----|--------|
| **Write** | Article writers | Push branches, open pull requests |
| **Maintain** | Designated reviewers | Approve PRs, merge after review |
| **Admin** | Repo owner | Approve PRs, merge after review |

Writers with **Write** access cannot merge to `main`. Only **Maintain** and **Admin** users can merge.

## Reviewers

Add reviewer GitHub usernames to `.github/CODEOWNERS`:

```
/_posts/ @cartel360 @reviewer-username
/assets/images/ @cartel360 @reviewer-username
```

Then give those reviewers **Maintain** access under **Settings → Collaborators and teams**.

## Enable branch protection (repo admins)

Import the ruleset once so GitHub enforces the PR workflow:

1. Go to **Settings → Rules → Rulesets**
2. Click **New ruleset → Import a ruleset**
3. Upload `.github/rulesets/protect-main.json`
4. Under **Bypass list**, confirm only **Admin** and **Maintain** roles are listed
5. Add any extra reviewer GitHub accounts that should be allowed to merge
6. Save the ruleset

Or apply it with the GitHub CLI:

```bash
gh api repos/:owner/:repo/rulesets \
  --method POST \
  --input .github/rulesets/protect-main.json
```

After the ruleset is active:

- Writers cannot push directly to `main`
- Changes must be merged through a pull request
- The **Validate articles** check must pass before merge
- A **CODEOWNERS** reviewer must approve the PR
- Authors cannot approve their own PR after pushing new commits
- Only **Admin** and **Maintain** users can merge to `main`
