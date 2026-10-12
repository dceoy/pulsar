# Pulsar

News intelligence across science, technology, business, finance, and global affairs.

A content-first website built with Astro 7 and strict TypeScript. Every page is
generated into `dist/` and hosted by Cloudflare Workers Static Assets. The initial
reading room contains two clearly labeled Markdown samples and nine topic pages.
It uses local CSS and system fonts, with no browser JavaScript, SSR, runtime
database, or news ingestion.

## Develop and verify

Use Node.js 24.16.0 or later (Node 24 LTS recommended) and pnpm 12.10.1.
Install that pnpm version with your preferred package manager, for example
`npm install --global pnpm@12.10.1` when npm is available.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open the local URL printed by Astro (normally `http://localhost:4321`).

```sh
pnpm format:check
pnpm lint
pnpm check
pnpm build
pnpm preview
```

`pnpm format:check` uses Biome for supported files, including Astro frontmatter.
Full Astro template formatting is experimental and remains disabled.
`pnpm lint` uses Oxlint for JS/TS and Biome lint for other supported files.
`pnpm check` validates TypeScript and Astro templates. `pnpm build` writes
static pages and CSS to `dist/`, and `pnpm preview` serves the site locally.
Generated output, dependencies, and local secrets are ignored by Git.

## Content and canonical URLs

Add Markdown files to `src/content/articles/`. Their paths determine article IDs:
`reading-ai-research.md` becomes `/articles/reading-ai-research/`. The typed schema
in `src/content.config.ts` requires this frontmatter:

```yaml
title: A descriptive article title
description: A short summary for listings and metadata.
publishedAt: 2026-10-11
category: technology
```

Allowed categories are `ai`, `security`, `technology`, `science`, `medicine`,
`startup-business`, `finance`, `economics`, and `politics`. The shared registry is
`src/data/categories.ts`. All category routes are built, including empty topics;
articles are listed newest first. Rebuild after changing content.

Set `SITE_URL` to the public HTTP(S) origin when building or deploying:

```sh
SITE_URL=https://pulsar.example.org pnpm build
```

The default `https://example.com` is a development placeholder. Replace it with
your actual Workers URL or custom domain before publishing. Only an origin is
accepted (no path, query, fragment, or credentials). This setting controls
canonical and Open Graph URLs at build time. The 404 page is marked `noindex`.

## Cloudflare preview and deployment

`wrangler.jsonc` configures `assets.directory: "./dist"` and a custom 404 page.
Wrangler serves assets directly; no Worker entrypoint or Astro adapter is needed.
Trailing slashes match Astro's generated directory routes. See the
[Workers Static Assets guide](https://developers.cloudflare.com/workers/static-assets/)
and [Astro documentation](https://docs.astro.build/).

Validate packaging without uploading anything, then preview Cloudflare routing:

```sh
pnpm build
pnpm exec wrangler deploy --dry-run
pnpm exec wrangler dev --local --port 8787
```

Open `http://localhost:8787`. Unknown URLs should return the custom 404 page.
The dry run and local preview do not need Cloudflare credentials.

For a live deployment, sign in to your Cloudflare account and inspect the selected
account:

```sh
pnpm exec wrangler login
pnpm exec wrangler whoami
```

Enable or choose your account's Workers subdomain when prompted (or in the
Cloudflare dashboard under Workers & Pages). The Worker name is `pulsar`, with
`workers_dev: true`, so its address is
`https://pulsar.<your-workers-subdomain>.workers.dev`. Then deploy with that origin:

```sh
SITE_URL="https://pulsar.<your-workers-subdomain>.workers.dev" pnpm deploy
```

Replace the angle-bracket placeholder before running the command. `pnpm deploy`
always builds first, then uploads `dist/` through Wrangler. A Cloudflare account
is required to demonstrate the live URL; normal development and CI are local.

For non-interactive deployment, provide `CLOUDFLARE_API_TOKEN` with Workers Scripts
Edit permission for the target account and `CLOUDFLARE_ACCOUNT_ID` via your secret
manager or shell environment. Never commit token values. Wrangler supports OAuth
locally or these environment variables in CI; `.env*` and `.dev.vars*` files are
ignored.

## CI

The existing GitHub Actions CI workflow installs from the pnpm lockfile and runs
`format:check`, `lint`, `check`, `build`, and dependency auditing. It needs no
Cloudflare credentials and does not deploy. Production deployment is opt-in via
the local `pnpm deploy` command. A future separate deployment job should receive
`CLOUDFLARE_API_TOKEN` as a GitHub Actions secret and `CLOUDFLARE_ACCOUNT_ID` and
`SITE_URL` as repository/environment variables, with credentials limited to the
deployment step.

Repository-wide local QA is available as
`bash .agents/skills/local-qa/scripts/qa.sh`; it also needs npm/npx, uv/uvx, and
actionlint installed. It formats files, fixes lint issues, audits dependencies,
and scans GitHub Actions configuration. Review its changes before committing.
