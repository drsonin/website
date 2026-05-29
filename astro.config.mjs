// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

export default defineConfig({
    site: 'https://www.drsonin.com',
    integrations: [mdx(), sitemap(), tailwind()],
});