import { defineConfig } from 'vite';

// One project, one HTML file per page. Each page loads its own script
// from site/pages/, which imports the shared header, footer, and styles.
export default defineConfig({
  // assets/ is copied to dist as-is and served at the site root,
  // so /fonts/x.ttf, /images/x.png, /downloads/x.pdf, /models/x.ply.
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
