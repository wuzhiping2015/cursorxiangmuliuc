import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@views": path.resolve(__dirname, "./src/views"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@assets": path.resolve(__dirname, "./src/assets"),
        },
    },
    server: {
        open: true,
        host: true,
        hmr: true,
        strictPort: false,
        port: 3000,
    },
});