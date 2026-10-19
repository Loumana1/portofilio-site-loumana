import { defineConfig } from 'vite';

// One project, one HTML file per page. Each page loads its own script
// from site/pages/, which imports the shared header, footer, and styles.
export default defineConfig({
  // Project Pages: https://Loumana1.github.io/portofilio-site-loumana/
  // Switch to '/' when loumana.co (or a user site) is the host.
  base: '/portofilio-site-loumana/',
  // assets/ is copied to dist as-is (images, fonts, downloads, models, games).
  publicDir: 'assets',
  server: { port: 5174, host: '127.0.0.1' },
  build: {
    outDir: 'dist',
    assetsDir: 'bundle',
    rollupOptions: {
      input: {
        home: 'index.html',
        music: 'music.html',
        technology: 'technology.html',
        radio: 'radio.html',
        about: 'about.html',
      },
    },
  },
});
