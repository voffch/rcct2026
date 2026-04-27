// @ts-check
import { defineConfig } from 'astro/config';
import cssHasPseudo from 'css-has-pseudo';
import AstroPWA from '@vite-pwa/astro';

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
  integrations: [AstroPWA({
    devOptions: {
      enabled: true
    },
    registerType: 'autoUpdate',
    includeAssets: ['favicon.ico'],
    manifest: {
      name: 'RCCT 2026',
      short_name: 'RCCT 2026',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,ico,jpg,png,svg,woff2}'],
    },
    experimental: {
      directoryAndTrailingSlashHandler: true,
    },
  })],
});
