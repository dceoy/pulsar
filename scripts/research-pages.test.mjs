import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';

test('each research run has one complete static page and timestamped stories', async () => {
  const sourceDir = 'src/content/articles';
  const names = (await readdir(sourceDir)).filter((name) =>
    name.endsWith('.md'),
  );
  const reports = new Map();

  for (const name of names) {
    const raw = await readFile(join(sourceDir, name), 'utf8');
    const researchId = raw.match(
      /^researchId: ([a-z0-9]+(?:-[a-z0-9]+)*)$/m,
    )?.[1];
    const publishedAt = raw.match(/^publishedAt: ['"]([^'"]+)['"]$/m)?.[1];
    assert.ok(researchId, `${name} needs a researchId`);
    assert.match(
      publishedAt ?? '',
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/,
      `${name} needs a quoted, timezone-aware publication timestamp`,
    );
    const author = raw.match(/^author: (.+)$/m)?.[1];
    const items = reports.get(researchId) ?? [];
    items.push({
      id: name.slice(0, -3),
      publishedAt,
      author,
    });
    reports.set(researchId, items);
  }

  if (reports.size === 0) return;

  const newest = [...reports].sort(
    (a, b) =>
      Math.max(...b[1].map((article) => Date.parse(article.publishedAt))) -
      Math.max(...a[1].map((article) => Date.parse(article.publishedAt))),
  )[0][0];
  const home = await readFile('dist/index.html', 'utf8');
  function assertUniqueHeadingIds(html, page) {
    const ids = [...html.matchAll(/<h[1-6][^>]*id="([^"]+)"/g)].map(
      (match) => match[1],
    );
    assert.equal(
      new Set(ids).size,
      ids.length,
      `${page} has duplicate heading IDs`,
    );
  }
  assertUniqueHeadingIds(home, 'Homepage');

  for (const [id, stories] of reports) {
    const report = await readFile(
      join('dist/research', id, 'index.html'),
      'utf8',
    );
    assertUniqueHeadingIds(report, id);
    for (const story of stories) {
      assert.ok(
        report.includes(`id="${story.id}"`),
        `Research ${id} is missing the body for ${story.id}`,
      );
      assert.ok(
        report.includes(
          `datetime="${new Date(story.publishedAt).toISOString()}"`,
        ),
        `Research ${id} is missing the exact posting time for ${story.id}`,
      );
      if (story.author) {
        assert.ok(
          report.includes(`data-author="${story.author}"`),
          `Research ${id} is missing the author for ${story.id}`,
        );
        assert.ok(
          report.includes(`Author: ${story.author}`),
          `Research ${id} is missing the visible byline for ${story.id}`,
        );
        const articlePage = await readFile(
          join('dist/articles', story.id, 'index.html'),
          'utf8',
        );
        assert.ok(
          articlePage.includes(`name="author" content="${story.author}"`),
          `Article ${story.id} lacks author metadata`,
        );
      }
      if (id === newest) {
        assert.ok(
          home.includes(`id="${story.id}"`),
          `Homepage missing ${story.id}`,
        );
      }
    }
  }
});
