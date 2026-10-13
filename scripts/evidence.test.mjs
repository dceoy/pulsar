import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';

test('every article has traceable in-text citations and a Sources section', async () => {
  const directory = 'src/content/articles';
  const files = (await readdir(directory)).filter((name) => name.endsWith('.md'));

  for (const filename of files) {
    const markdown = await readFile(join(directory, filename), 'utf8');
    const sections = markdown.split(/^## Sources[ \t]*$/m);
    assert.equal(
      sections.length,
      2,
      `${filename}: expected exactly one "## Sources" section`,
    );

    const entries = sections[1]
      .trim()
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.startsWith('- '));
    assert.ok(entries.length > 0, `${filename}: missing source references`);

    const urls = entries.map((entry) => {
      const match = entry.match(/^- \[[^\]\n]+\]\((https:\/\/[^\s)]+)\)$/);
      assert.ok(
        match,
        `${filename}: use a labeled, direct HTTPS Markdown link per source`,
      );
      return match[1];
    });

    assert.ok(
      urls.some((url) => sections[0].includes(`](${url})`)),
      `${filename}: cite at least one listed source in the article body`,
    );
  }
});
