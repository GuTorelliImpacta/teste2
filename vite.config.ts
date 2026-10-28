import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  ssgOptions: {
    script: 'defer',
    dirStyle: 'nested',
    format: 'esm',
    // Sem CSS crítico inline: mantém a CSP sem 'unsafe-inline' em style-src.
    beastiesOptions: false,
  } as never,
  build: { cssCodeSplit: false, target: 'es2022' },
});
