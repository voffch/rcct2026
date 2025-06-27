// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  i18n: {
    locales: ["en", "ru"],
    defaultLocale: "ru",
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    ssr: {
      noExternal: ["beercss"],
    },
  },
});
