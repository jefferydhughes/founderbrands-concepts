# FounderBrands landing page concepts

Two single-CTA landing pages for FounderBrands, built as a sample of work. Static HTML, no build step.

| Path | Audience | Framework | Single CTA |
|---|---|---|---|
| `/option-a-cpa/` | CPAs and fractional CFOs | StoryBrand (SB7) | Free advisory profile audit |
| `/option-b-founders/` | B2B founders | The founder-led growth agency, brash voice | Free profile audit |

`/index.html` is a simple chooser page for reviewing both.

## Preview locally

Open `index.html` in a browser. Fonts are self-hosted in `assets/fonts/` with a jsDelivr fallback. Client photos load from founderbrands.io.

## Deploy to Vercel

1. Import this repo in Vercel (Add New, Project).
2. Framework preset: Other. No build command. Output directory: root.
3. Deploy. Both pages and the chooser are live at `/`, `/option-a-cpa/` and `/option-b-founders/`.

## Before these go live with real traffic

- **Wire the audit form.** `assets/audit-form.js` validates and shows a confirmation state, but posts nowhere. Replace the submit handler with a POST to the CRM or a Zapier/Make webhook.
- **Install tracking.** Add the Meta Pixel to both pages and fire `Lead` on audit submit (already called in `audit-form.js` if `fbq` exists). Send the same event server-side through the Conversions API.
- **Confirm proof numbers.** Brad Nelson's figures use the homepage version (16 calls in 60 days, $120k added annual revenue). The current ads also cite $250k pipeline and $120k in 60 days. Pick one and use it everywhere.
- **Write the guarantee terms.** Both pages promise 10 qualified sales calls in 90 days or free work until delivered. Define "qualified" and any conditions on a terms page before launch.
- **Host the photos.** Client images are hotlinked from founderbrands.io. Copy them into `assets/img/` for production.

## Structure

```
index.html                 chooser page
option-a-cpa/index.html    Option A, CPA StoryBrand page
option-b-founders/index.html  Option B, founder-led growth agency page
assets/audit-form.js       shared demo form handler
assets/fonts/              self-hosted woff2 (IBM Plex, Caveat, Anton, Space Grotesk, Inter; SIL OFL)
ads/                       Meta ad creatives (PNG) and their HTML sources
```
