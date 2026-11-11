# LeadWalnut Backlink Dashboard: how the monthly update works

Repo: **https://github.com/sandhika-leadwalnut/leadwalnut_backlink_dashboard** (one repo for every month)

## The flow

1. **Attach the month's LeadWalnut Word doc** in a new Claude chat and type: *Update the LeadWalnut dashboard with this doc*.
2. **Claude checks the doc** and builds the data. You get a short summary plus anything to double-check.
3. **Claude shows you the dashboard in the chat** as a private preview page. Nothing is public yet.
4. **Ask for corrections, if any.** Claude applies them and refreshes the same preview. For number changes, also fix the Word doc so the records match.
5. **Claude asks for a link name (optional).** Type a name, or say **skip** for the default monthly link `leadwalnut-backlinking-dashboard-<month><year>`, e.g. `...-october2026`.
6. **Say "yes" to publish.** Claude pushes to GitHub itself. GitHub Actions deploys to Vercel and attaches the link.
7. **Claude waits for the deploy (about 1 to 2 minutes) and gives you the final link**: `https://<link name>.vercel.app`
8. **Claude records the link in the [Backlink Dashboard URLs](https://docs.google.com/document/d/1LgqVfKNtLLj7GPX1dQcrJPvhCqfo1t8oHCejcSM4C9Y/edit) Google Doc**, in a **LeadWalnut** tab (add the tab first). One line per month; publishing the same month again overwrites that month's line.

Each deployment is a frozen copy: publishing November never changes October's link. Link names: lowercase letters, numbers and `-` only, up to 63 characters.

---

## One-time setup

| Step | Status |
|---|---|
| Repo created, code and automation pushed | Done |
| Claude GitHub App has access to this repo | Check: GitHub **Settings** > **Applications** > **Claude** > **Configure** > Repository access includes `leadwalnut_backlink_dashboard` |
| Vercel project for this repo (Leadwalnut team) | Vercel > **Add New** > **Project** > import this repo. Then project **Settings** > **Deployment Protection** > turn **Vercel Authentication** off, or the links ask for a Vercel login. |
| GitHub secrets | Repo **Settings** > **Secrets and variables** > **Actions**: `VERCEL_TOKEN` (same team-scoped Leadwalnut token as Splashtop/Fortinet), `VERCEL_ORG_ID` (Vercel Team ID, same as the other repos), `VERCEL_PROJECT_ID` (this project's ID from its **Settings** > **General**) |
| People who run updates | GitHub linked in Claude (**Settings** > **Connectors** > **GitHub**) and Write access to this repo (repo **Settings** > **Collaborators**) |
| Links log | Add a **LeadWalnut** tab to the Backlink Dashboard URLs doc; each person needs Editor access and Google Docs connected in Claude |

Vercel does not deploy on its own (`vercel.json` turns off Git deployments); only the GitHub Action deploys, so every month gets its own link.

---

## Test it with the October 2026 doc

1. Save the `leadwalnut-dashboard-monthly-update` skill.
2. New Claude chat: attach the Oct 2026 LeadWalnut doc and type *Update the LeadWalnut dashboard with this doc*.
3. Check the preview: KPI cards 5 / 15 / 65 / 45; DA split 10 / 33 / 2; monthly growth Aug 13, Sep 28, Oct 4; Top 5 and Page 1 both 0; 15 keywords in Business Impact (all `-`); Performance Summary backlinks 15 / 14 / 4 / 6 / 6 in October; 2 key findings.
4. Say **skip** at the link question and **yes** to publish. You get `https://leadwalnut-backlinking-dashboard-october2026.vercel.app`.

---

## Troubleshooting

| What you see | What to do |
|---|---|
| Claude says it cannot push / "no GitHub access" | Link GitHub in Claude, be a collaborator with Write access, and make sure the Claude GitHub App includes this repo. |
| Deploy fails at **Deploy to Vercel** | A Vercel secret is wrong or missing. |
| Deploy fails at **Attach the monthly link**: "User not found" | `VERCEL_TOKEN` is project-scoped. Use a token with scope **Leadwalnut** (team). |
| Deploy fails at **Attach the monthly link**: domain in use | That link name belongs to another Vercel project. Publish again with a different link name. |
| The link asks for a Vercel login | Turn off **Vercel Authentication** under the project's **Deployment Protection**. |
| A month's link shows wrong data | Send Claude the corrected doc and use the same link name. Only that link changes. |
| Need an old month's data | `data/history/<YYYY-MM>.json` and `monthly-docs/` keep every month. |

Manual fallback (no Claude): GitHub > **Actions** > **Deploy monthly dashboard** > **Run workflow**. This redeploys whatever month is in the repo.
