export const categorySlugs = [
  'ai',
  'security',
  'technology',
  'science',
  'medicine',
  'startup-business',
  'finance',
  'economics',
  'politics',
] as const;

export type Category = (typeof categorySlugs)[number];

export const categoryLabels: Record<Category, string> = {
  ai: 'AI',
  security: 'Security',
  technology: 'Technology',
  science: 'Science',
  medicine: 'Medicine',
  'startup-business': 'Startup business',
  finance: 'Finance',
  economics: 'Economics',
  politics: 'Politics',
};
