import { defineConfig } from 'astro/config';

// SITE and BASE are set by the GitHub Pages workflow. With the custom domain
// (devoxx.gr) BASE is "/"; on the temporary github.io preview it is "/devoxx.gr".
const base = process.env.BASE || '/';
const prefix = base.replace(/\/$/, '');

export default defineConfig({
  site: process.env.SITE || 'https://devoxx.gr',
  base,
  trailingSlash: 'always',
  // Old URLs that changed in the move to the static site.
  redirects: {
    '/press-kit-2/': `${prefix}/press-kit/`,
  },
});
