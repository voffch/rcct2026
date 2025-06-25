// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  i18n: {
    locales: ["en", "ru"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: true,
    },
  },
  vite: {
    ssr: {
      noExternal: ["beercss"],
    },
  },
});
