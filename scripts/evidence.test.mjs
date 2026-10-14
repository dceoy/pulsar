import assert from 'node:assert/strict';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { validateArticles, validateEvidence } from './evidence.mjs';

const citation = '[Source](https://example.com/source)';
const valid = `# Article\n\nA finding ${citation}.\n\n## Sources\n\n- ${citation}\n`;

test('every article has traceable in-text citations and a Sources section', async () => {
  await validateArticles('src/content/articles');
});

for (const filename of ['example.md', '2026/october/example.md']) {
  test(`validates article citations at ${filename}`, async (t) => {
    const directory = await mkdtemp(join(tmpdir(), 'pulsar-evidence-'));
    t.after(() => rm(directory, { recursive: true, force: true }));
    const path = join(directory, filename);
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, '# Article\n\nNo citations.\n');
    await assert.rejects(
      validateArticles(directory),
      /expected exactly one "## Sources" section/,
    );
    await writeFile(path, valid);
    await validateArticles(directory);
  });
}

for (const { name, markdown, error } of [
  {
    name: 'links in a later level-two section cannot fill an empty Sources section',
    markdown: `A finding ${citation}.\n\n## Sources\n\n## Further reading\n\n- ${citation}\n`,
    error: /missing source references/,
  },
  {
    name: 'links in a later level-one section cannot fill an empty Sources section',
    markdown: `A finding ${citation}.\n\n## Sources\n\n# Appendix\n\n- ${citation}\n`,
    error: /missing source references/,
  },
  {
    name: 'commented-out evidence is not visible evidence',
    markdown: `# Article\n\n<!--\n${citation}\n\n## Sources\n\n- ${citation}\n-->\n`,
    error: /expected exactly one "## Sources" section/,
  },
  {
    name: 'code examples cannot supply a Sources section',
    markdown: `# Article\n\n\`\`\`markdown\n${valid}\`\`\`\n`,
    error: /expected exactly one "## Sources" section/,
  },
  {
    name: 'a commented-out body citation cannot satisfy a visible source list',
    markdown: `# Article\n\n<!-- ${citation} -->\n\n## Sources\n\n- ${citation}\n`,
    error: /cite at least one listed source/,
  },
  {
    name: 'frontmatter citations do not count as body citations',
    markdown: `---\ndescription: '${citation}'\n---\n# Article\n\n## Sources\n\n- ${citation}\n`,
    error: /cite at least one listed source/,
  },
]) {
  test(name, async () => {
    await assert.rejects(validateEvidence(markdown, 'fixture.md'), error);
  });
}

test('a later section does not invalidate a complete Sources section', async () => {
  await validateEvidence(
    `${valid}\n## Appendix\n\n- Additional context\n`,
    'fixture.md',
  );
});
