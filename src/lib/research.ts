import type { CollectionEntry } from 'astro:content';

type Article = CollectionEntry<'articles'>;

export interface ResearchReport {
  id: string;
  publishedAt: Date;
  articles: Article[];
}

/** Group a single research run into one readable, static HTML page. */
export function getResearchReports(articles: Article[]): ResearchReport[] {
  const groups = new Map<string, Article[]>();
  for (const article of articles) {
    const group = groups.get(article.data.researchId) ?? [];
    group.push(article);
    groups.set(article.data.researchId, group);
  }

  return [...groups]
    .map(([id, items]) => {
      items.sort(
        (a, b) =>
          b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf() ||
          a.id.localeCompare(b.id),
      );
      return { id, publishedAt: items[0].data.publishedAt, articles: items };
    })
    .sort(
      (a, b) =>
        b.publishedAt.valueOf() - a.publishedAt.valueOf() ||
        a.id.localeCompare(b.id),
    );
}

export function formatPublishedAt(date: Date): string {
  return `${new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'UTC',
  }).format(date)} UTC`;
}
