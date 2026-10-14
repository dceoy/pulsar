import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import {
  createMarkdownProcessor,
  parseFrontmatter,
} from '@astrojs/markdown-remark';

function text(node) {
  return node.value ?? (node.children ?? []).map(text).join('');
}

function links(node) {
  if (node.type === 'link') return [node.url];
  return (node.children ?? []).flatMap(links);
}

export async function validateEvidence(markdown, filename) {
  let tree;
  const processor = await createMarkdownProcessor({
    syntaxHighlight: false,
    remarkPlugins: [
      () => (parsed) => {
        tree = parsed;
      },
    ],
  });
  await processor.render(parseFrontmatter(markdown).content);
  const nodes = tree.children;
  const headings = nodes.filter(
    (node) =>
      node.type === 'heading' && node.depth === 2 && text(node) === 'Sources',
  );
  assert.equal(
    headings.length,
    1,
    `${filename}: expected exactly one "## Sources" section`,
  );
  const start = nodes.indexOf(headings[0]);
  const next = nodes.findIndex(
    (node, index) =>
      index > start && node.type === 'heading' && node.depth <= 2,
  );
  const sources = nodes.slice(start + 1, next === -1 ? undefined : next);
  const entries = sources
    .filter((node) => node.type === 'list')
    .flatMap((node) => node.children);
  assert.ok(entries.length > 0, `${filename}: missing source references`);
  const urls = entries.map((entry) => {
    const paragraph = entry.children[0];
    const link = paragraph?.children?.[0];
    assert.ok(
      entry.children.length === 1 &&
        paragraph.type === 'paragraph' &&
        paragraph.children.length === 1 &&
        link.type === 'link' &&
        text(link).trim() &&
        /^https:\/\/\S+$/.test(link.url),
      `${filename}: use a labeled, direct HTTPS Markdown link per source`,
    );
    return link.url;
  });
  const citations = nodes.slice(0, start).flatMap(links);
  assert.ok(
    urls.some((url) => citations.includes(url)),
    `${filename}: cite at least one listed source in the article body`,
  );
}

export async function validateArticles(directory) {
  const files = (
    await readdir(directory, { recursive: true, withFileTypes: true })
  ).filter((entry) => entry.isFile() && entry.name.endsWith('.md'));
  for (const entry of files) {
    const filename = join(entry.parentPath, entry.name);
    await validateEvidence(await readFile(filename, 'utf8'), filename);
  }
}
