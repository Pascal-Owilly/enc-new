import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['tailwind-merge'],
  },
  server: {
    host: '0.0.0.0', // Allow external access
    port: 5173,      
    https: false,    
  },
  build: {
    outDir: 'dist', // Specify the output directory
    sourcemap: true, // Enable source maps for easier debugging
    rollupOptions: {
      // Customize Rollup options if needed
      output: {
        manualChunks(id) {
          // This can help with code-splitting
          if (id.includes('node_modules')) {
            return id.split('node_modules/')[1].split('/')[0].toString(); 
          }
        },
      },
    },
  },
  base: '/', 
});