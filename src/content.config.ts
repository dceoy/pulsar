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
      .array(
        z
          .string()
          .regex(
            /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            'Tags must use lowercase kebab-case (a-z, 0-9, single hyphens)',
          ),
      )
      .default([])
      .refine((tags) => new Set(tags).size === tags.length, {
        message: 'Tags must be unique',
      }),
  }),
});

export const collections = { articles };
