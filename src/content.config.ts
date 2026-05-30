import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		lang: z.enum(['ru', 'et', 'fi', 'en']).default('ru'),
		author: z.string().default('Дмитрий Сонин'),
		tags: z.array(z.string()).default([]),
		category: z.string().optional(),
	}),
});

export const collections = { blog };
