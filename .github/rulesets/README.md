# Ruleset setup (repo admins)

Import `.github/rulesets/protect-main.json` via **Settings → Rules → Rulesets → Import a ruleset**.

GitHub does not accept bypass actors in imported JSON reliably. After import, add bypass manually:

1. Open **Protect main branch** ruleset
2. Under **Bypass list**, click **Add bypass**
3. Add **Repository admin** (and **Maintain** for reviewers who should merge)
4. Save

This lets admins merge or push to `main` when needed. Writers remain blocked from direct pushes.
