// Helpers for the base path, so the site works both on devoxx.gr ("/")
// and on a github.io project URL ("/devoxx.gr/").
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const url = (path) => (/^(https?:|mailto:|tel:|#)/.test(path) ? path : base + path);

export const withBase = (html) =>
  base
    ? html
        .replace(/\b(href|src)="\/(?!\/)/g, `$1="${base}/`)
        .replace(/url\(\/(?!\/)/g, `url(${base}/`)
    : html;

export const isExternal = (path) => /^https?:/.test(path);
