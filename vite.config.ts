import { defineConfig } from "vite";
import UnoCSS from "unocss/vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [UnoCSS(), react()],
  css: {
    preprocessorOptions: {
      less: {},
    },
  },
  resolve: {
    alias: {
      '@': '/src',  // 这应该正确指向 src 目录
    },
  }
});
