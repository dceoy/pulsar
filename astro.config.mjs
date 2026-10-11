import { defineConfig } from 'astro/config';
import { URL } from 'node:url';

const site = new URL(process.env.SITE_URL || 'https://example.com');
if (
  !['http:', 'https:'].includes(site.protocol) ||
  site.pathname !== '/' ||
  site.search ||
  site.hash ||
  site.username ||
  site.password
) {
  throw new Error(
    'SITE_URL must be an HTTP(S) origin, such as https://pulsar.example.org',
  );
}

export default defineConfig({
  site: site.origin,
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
