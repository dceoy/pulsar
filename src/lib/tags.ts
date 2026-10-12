import type { CollectionEntry } from 'astro:content';

export function getTags(articles: CollectionEntry<'articles'>[]): string[] {
  return [...new Set(articles.flatMap((article) => article.data.tags))].sort(
    (a, b) => a.localeCompare(b),
  );
}

export function tagHref(tag: string): string {
  return `/categories/${tag}/`;
}
