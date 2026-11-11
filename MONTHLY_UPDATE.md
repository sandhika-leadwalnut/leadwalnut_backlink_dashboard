# Monthly dashboard update (LeadWalnut)

Every monthly number and text on the dashboard comes from `data/report.json`, generated from the monthly LeadWalnut "Backlink Performance Analysis" Word doc. Nobody edits components or `data/mockdata.ts` by hand. The Claude skill `leadwalnut-dashboard-monthly-update` runs all of this, including preview, publish and the final link (see `SETUP_AND_TEST.md`).

## Commands (from the repo root)

```
python3 scripts/update_dashboard.py "monthly-docs/2026-10 Backlink Performance Dashboard data.docx" --report-date "November 11, 2026" [--dry-run]
python3 scripts/set_link_name.py <name> | --default
python3 scripts/make_preview.py      # portable preview in preview/ (what Claude shows in the chat)
npm run build
```

The script prints a report: **PROBLEMS** must be fixed in the Word doc before publishing; **WARNINGS** should be checked.

## Config files (change rarely)

| File | What it holds |
|---|---|
| `data/site-config.json` | Client name, report title/subtitle, link prefix (`leadwalnut-backlinking-dashboard`) |
| `data/url-config.json` | The 5 tracked service pages in Performance Summary order, and each page's keywords. The doc's per-URL tables have no URL in them, so each table is matched to a page by its keywords. |
| `data/business-impact.json` | The Business Impact keyword list (one group, "Target Keywords", in display order) |

## How each section is calculated

- **Business Impact**: each keyword's rank in the baseline month (Aug 2026) and the report month. While no keyword has a rank (`-` in the doc), the section shows a table of keywords, target page and `-`; as soon as any keyword ranks it switches to the bar chart used in the client dashboards.
- **Backlink Quality Assurance**: DA split from the doc; the statement gives the share of referring domains with DA 41 or higher, rounded.
- **Monthly Growth**: backlinks added each month, from the doc.
- **Keyword Ranking**: Top 5 and Page 1 counts and lists for baseline and report month (`0` with no list is fine).
- **Performance Summary**: per page, Total Backlinks for every month column in the doc's table, keywords tracked, and keywords ranking (keywords with a rank in the report month). The doc has no Page Authority, so the PA / best move / worst move columns of the client dashboards are not used.
- **Highlights**: optional. If the doc has a `Highlights` or `LLM Highlights` section (title, screenshot, description per item), it is shown; otherwise the section is hidden.

## What the script reads from the Word doc

Keep the layout of the October 2026 doc (`monthly-docs/2026-10 ...docx`):

| Section | What it needs |
|---|---|
| Title | `Backlink Performance Analysis (Oct’ 26)` (gives the report month) |
| KPIs | `URLs Tracked` 5, `Keywords Tracked` 15, `Plan Total Backlinks` 65, `Actual Total Backlinks (Till Oct)` 45 |
| Business Impact | Under `Business Impact of Backlinks`: a list for the report month (`Oct’26`, then one `keyword<tab>rank` line per keyword, `-` if no rank) and the same for the baseline (`Aug’26`). Optional: `Add this KeyTakeaway:` with one paragraph. |
| DA split | `DA 71 - 100 - 10`, `DA 41-70 - 33`, `DA 25 -40 - 2` |
| Monthly growth | `Monthly Backlink Growth`, a line of months, then `Total Backlinks` with one number per month |
| Keywords in Top 5 | `Aug’26 - 0` / `Oct’26 - 0` counts, then the keyword lists (if any) |
| Keywords on First Page | Same pattern |
| Tracked URLs | One URL per line |
| Per-URL tables | One Word table per page: header row of months, then `Total Backlinks` and one row per keyword. `-` means no rank. |
| Implementation Details | A hyperlink to the monthly backlinks sheet |
| Key Findings | One paragraph per finding; **bold** text in Word stays bold on the dashboard |
| Highlights / LLM Highlights | Optional. Per item: title line, screenshot, description |

New tracked page or keyword: add it to `data/url-config.json` (and to `data/business-impact.json` if it belongs in Business Impact), then rerun.
