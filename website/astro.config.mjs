// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from "vite"; // Load environment variables

const { PUBLIC_IS_GH_PAGES } = loadEnv(process.env.NODE_ENV, process.cwd(), "");
const isGhPages = PUBLIC_IS_GH_PAGES === 'true';

// * Integrations
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';

// https://astro.build/config
export default defineConfig({
  site: isGhPages ? 'https://adrianolmrs.github.io' : 'https://pousada-tao.onrender.com',
  base: isGhPages ? '/Pousada-TAO' : undefined,
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