// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";

export default defineConfig({
  output: "server",
  adapter: vercel(),
  vite: {
    plugins: [tailwind()],
  },
});
