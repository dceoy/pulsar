---
name: write-article
description: Research, write, revise, and fact-check English articles for Pulsar. Use when asked to publish news, research summaries, or analysis under src/content/articles/.
---

# Write a Pulsar article

Create a self-contained, evidence-based English article that can be read directly
on the site or used as source material by an AI notebook.

## Prepare

1. Read `src/content.config.ts`, the content conventions in `README.md`, and
   existing articles. Follow the current schema if it differs from this skill.
2. Identify one clear news event, research finding, or analytical question.
   Avoid duplicating an existing article; update an existing one when appropriate.
3. Research the subject using accessible, verifiable sources. Prefer original
   papers, official releases, regulatory filings, and direct announcements;
   corroborate consequential or disputed claims with independent reporting.
4. Check event dates and source publication dates separately. Do not confuse a
   publication date with when an event occurred. Do not invent citations,
   quotations, figures, URLs, findings, or claims of verification. If the
   evidence cannot be checked, flag the limitation instead of reporting
   speculation as fact.

## Write

- Create or update one file at `src/content/articles/<slug>.md`. Use a
  descriptive, lowercase kebab-case filename; the filename determines the URL
  `/articles/<slug>/`.
- Use YAML frontmatter with `title` (specific and informative),
  `description` (brief standalone summary), and `publishedAt` (the article's
  publication date in `YYYY-MM-DD` format). Set `tags` to a short, relevant
  list of distinct lowercase kebab-case values matching
  `^[a-z0-9]+(?:-[a-z0-9]+)*$`. Choose tags freely for each article;
  do not rely on a fixed list. Omit unnecessary YAML quotes.
- Write in English only. Lead with what happened or was found, when it happened,
  and why it matters. Use descriptive headings and short, factual paragraphs.
- Explain the key evidence and its limitations, including study design or
  sample size for research, and uncertainty for evolving news. Distinguish
  verified facts, attributed claims, and your own interpretation.
- Link substantive claims to accessible source URLs near the relevant text.
  Finish with a compact `## Sources` section linking the most important
  original material. Use informative link labels; do not include fabricated
  or unvisited references.
- Keep the article useful without relying on a reader to open the sources:
  provide essential context, concrete details, and meaningful implications.
  Avoid filler, sensationalism, unsupported predictions, and repetitive
  summaries. Clearly label opinion or forward-looking analysis.

## Validate

1. Check required frontmatter, valid and unique tags, dates, Markdown links,
   attribution, and whether the article duplicates or contradicts existing
   content.
2. Run the repository's `local-qa` skill when tooling is available; at minimum
   verify `pnpm format:check`, `pnpm lint:markdown`, `pnpm check`, and
   `pnpm build`. Review any automated edits.
3. Report the article path, principal sources, and any verification or tooling
   limitations. Do not claim that checks ran unless they did.
