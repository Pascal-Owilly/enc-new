// vite.config.js
import { defineConfig } from "file:///home/pascal/projects/enceptics/frontend-v2/node_modules/vite/dist/node/index.js";
import react from "file:///home/pascal/projects/enceptics/frontend-v2/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["tailwind-merge"]
  },
  server: {
    host: "0.0.0.0",
    // Allow external access
    port: 5173,
    https: false
  },
  build: {
    outDir: "dist",
    // Specify the output directory
    sourcemap: true,
    // Enable source maps for easier debugging
    rollupOptions: {
      // Customize Rollup options if needed
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.split("node_modules/")[1].split("/")[0].toString();
          }
        }
      }
    }
  },
  base: "/"
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wYXNjYWwvcHJvamVjdHMvZW5jZXB0aWNzL2Zyb250ZW5kLXYyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wYXNjYWwvcHJvamVjdHMvZW5jZXB0aWNzL2Zyb250ZW5kLXYyL3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Bhc2NhbC9wcm9qZWN0cy9lbmNlcHRpY3MvZnJvbnRlbmQtdjIvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGV4Y2x1ZGU6IFsndGFpbHdpbmQtbWVyZ2UnXSxcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgaG9zdDogJzAuMC4wLjAnLCAvLyBBbGxvdyBleHRlcm5hbCBhY2Nlc3NcbiAgICBwb3J0OiA1MTczLCAgICAgIFxuICAgIGh0dHBzOiBmYWxzZSwgICAgXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiAnZGlzdCcsIC8vIFNwZWNpZnkgdGhlIG91dHB1dCBkaXJlY3RvcnlcbiAgICBzb3VyY2VtYXA6IHRydWUsIC8vIEVuYWJsZSBzb3VyY2UgbWFwcyBmb3IgZWFzaWVyIGRlYnVnZ2luZ1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIC8vIEN1c3RvbWl6ZSBSb2xsdXAgb3B0aW9ucyBpZiBuZWVkZWRcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3MoaWQpIHtcbiAgICAgICAgICAvLyBUaGlzIGNhbiBoZWxwIHdpdGggY29kZS1zcGxpdHRpbmdcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcycpKSB7XG4gICAgICAgICAgICByZXR1cm4gaWQuc3BsaXQoJ25vZGVfbW9kdWxlcy8nKVsxXS5zcGxpdCgnLycpWzBdLnRvU3RyaW5nKCk7IFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgYmFzZTogJy8nLCBcbn0pOyJdLAogICJtYXBwaW5ncyI6ICI7QUFBbVQsU0FBUyxvQkFBb0I7QUFDaFYsT0FBTyxXQUFXO0FBR2xCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixjQUFjO0FBQUEsSUFDWixTQUFTLENBQUMsZ0JBQWdCO0FBQUEsRUFDNUI7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQTtBQUFBLElBQ1IsV0FBVztBQUFBO0FBQUEsSUFDWCxlQUFlO0FBQUE7QUFBQSxNQUViLFFBQVE7QUFBQSxRQUNOLGFBQWEsSUFBSTtBQUVmLGNBQUksR0FBRyxTQUFTLGNBQWMsR0FBRztBQUMvQixtQkFBTyxHQUFHLE1BQU0sZUFBZSxFQUFFLENBQUMsRUFBRSxNQUFNLEdBQUcsRUFBRSxDQUFDLEVBQUUsU0FBUztBQUFBLFVBQzdEO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsTUFBTTtBQUNSLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
