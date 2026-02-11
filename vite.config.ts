import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,woff,woff2}'],
        navigateFallbackDenylist: [/^\/~oauth/],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*supabase\.co\/rest\/v1\/cafeterias.*/,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'cafeterias-cache', expiration: { maxEntries: 50, maxAgeSeconds: 300 } },
          },
          {
            urlPattern: /^https:\/\/.*supabase\.co\/rest\/v1\/menu_items.*/,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'menu-cache', expiration: { maxEntries: 200, maxAgeSeconds: 300 } },
          },
        ],
      },
      manifest: {
        name: 'BHU-Quick-Food',
        short_name: 'BHU-Food',
        description: 'Campus food delivery for Bingham University students',
        theme_color: '#ea580c',
        background_color: '#faf6f1',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        categories: ['food', 'lifestyle'],
        icons: [
          { src: '/pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/pwa-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/pwa-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
