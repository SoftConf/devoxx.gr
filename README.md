# devoxx.gr

Static version of the Devoxx Greece website, built with [Astro](https://astro.build) and deployed to GitHub Pages.

## Run it locally

```sh
npm install
npm run fetch-assets   # first time only: downloads the site images into public/images/
npm run dev            # http://localhost:4321
```

Commit the downloaded `public/images/` folder. After that the script and `scripts/assets.txt` can be deleted.

## Where things live

| What | Where |
| --- | --- |
| Menu, hero slides, event dates, footer text | `src/data/site.json` |
| Homepage sections (one HTML file each, shown in file-name order) | `src/content/home/` |
| Inner pages (one HTML file each; the file name is the URL) | `src/content/pages/` |
| Inner page titles | `src/data/pages.json` |
| Header, footer, `<head>` | `src/layouts/Base.astro` |
| Colours, fonts, layout | `src/styles/global.css` |
| Images | `public/images/` |

To add a page, drop `my-page.html` in `src/content/pages/` and add its title to `src/data/pages.json`. It is served at `/my-page/`.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages.
In the repository settings, set **Pages → Source** to **GitHub Actions**.

Until the custom domain is switched, the site is served from `https://softconf.github.io/devoxx.gr/`.
To go live on `devoxx.gr`, add the custom domain under **Settings → Pages** and point the DNS records at GitHub Pages.
