// @ts-check
import mdx from '@astrojs/mdx';
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

export default defineConfig({
    site: 'https://drsonin.com',
    integrations: [mdx(), tailwind()],
});