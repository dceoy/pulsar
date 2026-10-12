import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const articles = defineCollection({
  loader: glob({ base: './src/content/articles', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    publishedAt: z.coerce.date(),
    tags: z
      .array(z.string().trim().min(1).regex(/^[\x20-\x7E]+$/, 'Tags must use printable ASCII only'))
      .default([])
      .refine((tags) => new Set(tags).size === tags.length, {
        message: 'Tags must be unique',
      }),
  }),
});

export const collections = { articles };
