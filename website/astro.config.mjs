// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

import robotsTxt from 'astro-robots-txt';

// https://astro.build/config
export default defineConfig({
  site: 'https://pousada-tao.onrender.com',

  vite: {
      resolve: {
          alias: {
              '@': String(new URL('./src', import.meta.url)),
          },
      },
  },

  image: {
      responsiveStyles: true,
  },

  integrations: [sitemap(), robotsTxt()],
});