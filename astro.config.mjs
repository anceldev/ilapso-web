// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  adapter: vercel(),

  // Permitir hosts de ngrok y otros para desarrollo
  server: {
    allowedHosts: true, // Permite cualquier hostname (útil para ngrok)
  },
});