# Ruleset setup (repo admins)

## Public repo — who can push?

**Public does not mean open push.** By default, only the repo owner and invited collaborators can push. Random users can only clone unless you change org/repo permissions.

### Lock down write access

**Personal or org repo:**

1. **Settings → Collaborators and teams** — only invite writers who need direct push access
2. Do **not** give every org member **Write** on this repo unless intended

**If `cartel360` is an organization**, also check:

1. **Organization → Settings → Member privileges → Base permissions**
2. Set to **Read** (not Write) for members by default
3. Grant **Write** on this repo only to specific writers or teams

Non-collaborators should use **fork + PR** (documented in README). That is the normal workflow for public repos.

## Import ruleset

1. **Settings → Rules → Rulesets → Import a ruleset**
2. Upload `.github/rulesets/protect-main.json`
3. After import, confirm **Target branches** is only `main` (not "All branches")
4. Add **Bypass list** entries: **Repository admin** (and **Maintain** for reviewers who merge)

## Writers cannot push to their own branch?

The ruleset must apply **only to `main`**. If it targets all branches, the `Restrict updates` rule blocks every push — including new feature branches.

### Fix on GitHub

1. Open **Protect main branch** ruleset
2. Under **Target branches**, set:
   - **Include:** `main` (or `refs/heads/main`)
   - **Do not** use "All branches" or `**`
3. Save

Writers should then be able to push branches like `article/my-post`. Only `main` stays protected.

### Give writers push access

Writers need **Write** role on the repo:

1. **Settings → Collaborators and teams**
2. **Add people** → invite the writer
3. Role: **Write** (not Read or Triage)

Read-only users can clone but cannot push any branch.

### Check for org-level rules

If `cartel360` is an organization, check **Organization → Settings → Rules → Rulesets** for rules that apply to all repositories or all branches.

## What writers should run

```bash
git checkout -b article/my-article-slug
git push -u origin article/my-article-slug
```

Do **not** run `git push origin main`. The `-u origin <branch-name>` part is required on the first push.

## Bypass (repo owner)

After import, add bypass manually (not in JSON):

1. Open the ruleset → **Bypass list → Add bypass**
2. **Repository admin** — allows you to push/merge `main` when needed
3. **Maintain** — for reviewers who should merge PRs
