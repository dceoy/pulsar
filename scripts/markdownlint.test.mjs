import assert from 'node:assert/strict';
import it from 'node:test';
import katex from 'katex';
import { lintMarkdownStrings } from './markdownlint.mjs';

it('markdown linting treats nested brace filenames as plain names', async () => {
  const filename = `${'{'.repeat(10_000)}payload${'}'.repeat(10_000)}.md`;
  const markdown = '# Heading\n\nInline math: $x^2$.\n\n$$\nx^2 + y^2\n$$\n';
  const results = await lintMarkdownStrings({ [filename]: markdown });
  assert.deepEqual(results[filename], []);
});

it('the pinned KaTeX release renders math', () => {
  const html = katex.renderToString('x^2 + y^2', { output: 'html' });
  assert.match(html, /class="katex"/u);
});
