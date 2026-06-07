// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
// https://astro.build/config
export default defineConfig({
  site: 'https://www.hawthorneeast-village.com',
  output: 'static',
  trailingSlash: 'always',
  integrations: [],
  vite: {
    plugins: [tailwindcss()],
  },
});
