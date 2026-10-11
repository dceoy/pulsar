import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import ts from 'typescript-eslint';

export default [
  { ignores: ['dist/**', '.astro/**', '.wrangler/**', '.agents/**'] },
  js.configs.recommended,
  ...ts.configs.recommended.map((config) => ({
    ...config,
    files: ['**/*.ts'],
  })),
  ...astro.configs.recommended,
  {
    files: ['**/*.astro'],
    languageOptions: { parserOptions: { parser: ts.parser } },
  },
  {
    files: ['astro.config.mjs'],
    languageOptions: { globals: { process: 'readonly' } },
  },
];
