import { Buffer } from 'node:buffer';
import type { CollectionEntry } from 'astro:content';

export function getTags(articles: CollectionEntry<'articles'>[]): string[] {
  return [...new Set(articles.flatMap((article) => article.data.tags))].sort(
    (a, b) => a.localeCompare(b),
  );
}

export function tagSlug(tag: string): string {
  return /^[a-z0-9-]+$/.test(tag)
    ? tag
    : `~${Buffer.from(tag, 'utf8').toString('base64url')}`;
}

export function tagHref(tag: string): string {
  return `/categories/${tagSlug(tag)}/`;
}
