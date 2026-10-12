import { execFile } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import { promisify } from 'node:util';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { applyFixes } from 'markdownlint';
import { lint } from 'markdownlint/promise';

const execFileAsync = promisify(execFile);
const config = {
  default: true,
  MD013: false,
  MD033: false,
  MD041: false,
};

export function lintMarkdownStrings(strings) {
  return lint({ config, strings });
}

function printErrors(files, results) {
  let count = 0;
  for (const file of files) {
    for (const error of results[file] ?? []) {
      const rule = error.ruleNames[0];
      const detail = error.errorDetail ? `: ${error.errorDetail}` : '';
      process.stderr.write(
        `${file}:${error.lineNumber}: ${rule} ${error.ruleDescription}${detail}\n`,
      );
      count++;
    }
  }
  return count;
}

async function run() {
  const { stdout } = await execFileAsync(
    'git',
    ['ls-files', '-z', '--', '*.md', '*.mdx'],
    { encoding: 'utf8' },
  );
  const files = stdout.split('\0').filter(Boolean);
  const strings = Object.fromEntries(
    await Promise.all(
      files.map(async (file) => [file, await readFile(file, 'utf8')]),
    ),
  );

  let results = await lintMarkdownStrings(strings);
  if (process.argv.includes('--fix')) {
    const fixes = files
      .map((file) => {
        const errors = results[file] ?? [];
        if (errors.length === 0) {
          return null;
        }

        const fixed = applyFixes(strings[file], errors);
        return fixed === strings[file] ? null : [file, fixed];
      })
      .filter((fix) => fix !== null);

    await Promise.all(fixes.map(([file, fixed]) => writeFile(file, fixed)));
    for (const [file, fixed] of fixes) {
      strings[file] = fixed;
    }
    results = await lintMarkdownStrings(strings);
  }

  if (printErrors(files, results) > 0) {
    process.exitCode = 1;
  }
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  run().catch((error) => {
    process.stderr.write(`${error.stack ?? error}\n`);
    process.exitCode = 1;
  });
}
