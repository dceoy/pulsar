---
name: write-article
description: Research, write, revise, and fact-check English articles for Pulsar. Use when asked to publish news, research summaries, or analysis under src/content/articles/.
---

# Write a Pulsar article

Create self-contained, evidence-based English coverage. **Every research run
must be readable in full at one URL** so an AI notebook can ingest its content
without following links to individual stories.

## Prepare

1. Read `src/content.config.ts`, the content conventions in `README.md`, and
   existing articles. Follow the current schema if it differs from this skill.
2. Assign one unique lowercase kebab-case `researchId` for this research run.
   Reuse the same ID for every story researched in this run; never split a
   single run across IDs or reuse an ID for a later run.
3. Identify the news events, research findings, or analytical questions to cover.
   Avoid duplicating existing coverage; update an existing story when appropriate.
4. Research the subject using accessible, verifiable sources. Prefer original
   papers, official releases, regulatory filings, and direct announcements;
   corroborate consequential or disputed claims with independent reporting.
5. Check event dates and source publication dates separately. Do not confuse a
   publication date with when an event occurred. Do not invent citations,
   quotations, figures, URLs, findings, or claims of verification. If the
   evidence cannot be checked, flag the limitation instead of reporting
   speculation as fact.

## Write

- Create or update one file at `src/content/articles/<slug>.md`. Use a
  descriptive, lowercase kebab-case filename; the filename determines the URL
  `/articles/<slug>/`.
- Use YAML frontmatter with `title` (specific and informative),
  `description` (brief standalone summary), `researchId` (shared across all
  stories in this run), and `publishedAt` (the actual publication timestamp
  with hours, minutes, seconds, and explicit timezone, e.g.
  `'2026-10-13T00:07:08+09:00'`). **Quote the timestamp in YAML** so it remains
  a string for strict schema validation. Never use a date-only value, assume
  midnight, or invent a publication time. Set `tags` to a short, relevant
  list of distinct lowercase kebab-case values matching
  `^[a-z0-9]+(?:-[a-z0-9]+)*$`. Choose tags freely for each article;
  do not rely on a fixed list. Omit unnecessary YAML quotes.
- Record AI provenance in optional `aiAgent` (the writing interface or agent,
  e.g. `ChatGPT`) and `aiModel` (the exact model label reported by the tool,
  e.g. `GPT-6-high`) fields. Include each field only when independently known
  from the actual writing environment. Do not infer an exact model from the
  chat client, user subscription, or product name; do not invent metadata to
  fill a missing value. Preserve the reported model/effort label verbatim.
  The site presents the provenance as visible text for notebook readers and
  exposes article-level HTML data attributes and per-article head metadata.
- The platform aggregates every article with the same `researchId` into
  one complete, server-rendered HTML report at `/research/<researchId>/`.
  The newest report also appears in full at `/`. Verify all stories and
  their sources are actually present in that HTML, not just linked previews.
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

1. Check required frontmatter, research run grouping, valid and unique tags,
   **actual timezone-aware publication timestamps**, Markdown links,
   attribution, accurately declared AI provenance (if known), and whether
   the article duplicates or contradicts existing
   content.
2. Run the repository's `local-qa` skill when tooling is available; at minimum
   verify `pnpm format:check`, `pnpm lint:markdown`, `pnpm check`, and
   `pnpm build`, and `pnpm test:research`. Review any automated edits.
3. Report the article path, principal sources, and any verification or tooling
   limitations. Do not claim that checks ran unless they did.
