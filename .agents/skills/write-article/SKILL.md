---
name: write-article
description: Research, write, revise, and fact-check English articles for Pulsar. Use when asked to publish news, research summaries, or analysis under src/content/articles/.
---

# Write a Pulsar article

Create self-contained, evidence-based English coverage. **Every research run
must be readable in full at one URL** so an AI notebook can ingest its content
without following links to individual stories.

## Prepare

1. Read the standing research scope, topic priorities, and exclusions in
   `RESEARCH.md` **before selecting topics**. Treat it as the source of truth
   for editorial scope. If it is missing or inaccessible, report the blocker
   instead of guessing a research agenda.
2. Read `src/content.config.ts`, the content conventions in `README.md`, and
   existing articles. Follow the current schema if it differs from this skill.
3. Assign one unique lowercase kebab-case `researchId` for this research run.
   Reuse the same ID for every story researched in this run; never split a
   single run across IDs or reuse an ID for a later run.
4. Select news events, research findings, or analytical questions according to
   `RESEARCH.md`. Apply explicit run-specific topic instructions as temporary
   additions or changes to scope; they do not waive source verification or
   other editorial safeguards. Avoid duplicating existing coverage; update an
   existing story when appropriate. If no topic meets the evidence and
   significance thresholds, report that instead of publishing filler.
5. Research the subject using accessible, verifiable sources. Prefer original
   papers, official releases, regulatory filings, and direct announcements;
   corroborate consequential or disputed claims with independent reporting.
6. Check event dates and source publication dates separately. Do not confuse a
   publication date with when an event occurred. Do not invent citations,
   quotations, figures, URLs, findings, or claims of verification. If the
   evidence cannot be checked, flag the limitation instead of reporting
   speculation as fact.

## Evidence and critical appraisal protocol

1. For each consequential claim (numbers, findings, effectiveness, safety,
   forecasts, policy changes, or product capabilities), identify the supporting
   source and the **specific passage, table, figure, or dataset** that supports
   it. Check the claim against that material, not merely the source title or
   abstract. Recheck the final wording after editing. Keep a claim-to-evidence
   checklist during the run; do not describe an unread or inaccessible source
   as independently verified.
2. Prefer stable, version-specific primary references: original research papers
   (DOI or publisher permalink), official reports or datasets, regulatory
   filings, trial registries, and dated first-party statements. Avoid generic
   report indexes when a specific edition is available. Confirm source and
   event dates, units, denominators, comparison baselines, and subsequent
   updates. Check corrections or retractions for research when practicable.
3. Seek independent corroboration for disputed, surprising, high-impact, or
   self-interested claims. Independently reported repetition of a press release
   is **not** independent corroboration. Actively look for material
   counterevidence or conflicting findings; address discrepancies rather than
   selecting only supporting sources. Do not impose an arbitrary source count.
4. For empirical studies, critically appraise the study design, population and
   setting, sample size, comparison group, outcomes, effect sizes and
   uncertainty estimates **when reported**, plus relevant confounding, missing
   data, selection bias, multiple testing, sensitivity analyses, and
   generalizability. Distinguish association, prediction, and causal effects.
   Consider replication, external validation, data/code access, funding, and
   conflicts of interest. Apply the applicable checks; do not invent details
   that the source does not report.
5. Label preprints and unreviewed work explicitly. Treat company benchmarks,
   projected performance, expert opinions, regulatory proposals, and economic
   forecasts as attributed claims or scenarios, not established independent
   outcomes. Explain uncertainty and missing methodology proportionately to
   the decision impact.
6. Record the research cutoff/check date for time-sensitive evidence in the
   article, separately from the actual `publishedAt` timestamp. Where only an
   abstract, secondary account, or inaccessible document can be checked,
   disclose that restriction and avoid claims requiring the unseen material.

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
- Use the optional `author` field for a factual byline. For AI-authored work,
  format the byline as `<tool> (<model>)` when both the writing application or
  agent and the exact reported model label are known, e.g.
  `author: ChatGPT (GPT-6-high)`. If only the authoring tool is verified,
  specify just its name. Never infer
  a model or effort level from a chat client or subscription; if the agent,
  model, or authorship cannot be verified, omit unsupported attribution rather
  than inventing it. The site renders the byline as visible text for AI
  notebook readers and as standard HTML author metadata on article pages.
- The platform aggregates every article with the same `researchId` into
  one complete, server-rendered HTML report at `/research/<researchId>/`.
  The newest report also appears in full at `/`. Verify all stories and
  their sources are actually present in that HTML, not just linked previews.
- Write in English only. Lead with what happened or was found, when it happened,
  and why it matters. Use descriptive headings and short, factual paragraphs.
- Explain the key evidence and its limitations, including study design or
  sample size for research, and uncertainty for evolving news. Distinguish
  verified facts, attributed claims, and your own interpretation.
- Link substantive claims to the **specific, directly supporting** source
  near the statement; do not cite unrelated passages or imply that a secondary
  citation is a direct reading of the primary work. Finish with a compact
  `## Sources` section linking the most important materials using stable,
  specific URLs and informative labels. Do not include fabricated or unvisited
  references. Separate sourced findings from interpretation, and disclose
  evidence gaps affecting the conclusions.
- Keep the article useful without relying on a reader to open the sources:
  provide essential context, concrete details, and meaningful implications.
  Avoid filler, sensationalism, unsupported predictions, and repetitive
  summaries. Clearly label opinion or forward-looking analysis.

## Publication gate

Do not publish an article with a material claim unsupported by the evidence
actually inspected, an invented or misleading citation, a known unaddressed
contradiction, or causal/clinical/financial recommendations beyond the study's
support. Omit the claim, qualify it as an explicitly attributed and unverified
statement when appropriate, or decline publication. A syntactically valid link
or a passing automated test **does not establish factual correctness**.

## Validate

1. Check topic selection against `RESEARCH.md` and run-specific instructions;
   verify required metadata, research grouping, unique tags, accurate author
   attribution, actual timezone-aware publication time, duplication, and
   consistency with existing reporting.
2. Recheck every consequential claim against its original source location.
   Verify quotations, figures, units, denominators, comparative baselines,
   study design, and distinctions between evidence and interpretation. Resolve
   or explicitly disclose counterevidence and material uncertainty. Check
   whether references are accessible and genuinely support the adjacent text.
3. Run the repository's `local-qa` skill when tooling is available; at minimum
   verify `pnpm format:check`, `pnpm lint:markdown`, `pnpm check`,
   `pnpm build`, `pnpm test:research`, and `pnpm test:evidence`. Review
   automated edits. The evidence test checks citation structure only, not the
   truth of statements or the availability of external sites.
4. Report the article path, principal primary sources, significant conflicting
   evidence or verification limitations, and exact checks executed. Do not
   claim sources were read or tests passed when they were not.
