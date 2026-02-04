// @ts-check
import { defineConfig } from 'astro/config';
import cssHasPseudo from 'css-has-pseudo';

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
    css: {
      transformer: 'postcss', 
      postcss: {
        plugins: [
          cssHasPseudo({ preserve: true }),
        ]
      }
    },
    ssr: {
      noExternal: ["beercss"],
    },
  },
});
