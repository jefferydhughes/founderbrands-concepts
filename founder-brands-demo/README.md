# FounderBrands landing page concepts

Single-CTA landing pages for FounderBrands, built as a sample of work. Static HTML, no build step.

| Path | Audience or pillar | Framework | Single CTA |
|---|---|---|---|
| `/` | B2B founders (paid traffic) | The founder-led growth agency, brash voice (was Option B) | Free profile audit |
| `/option-a-cpa/` | CPAs and fractional CFOs | StoryBrand (SB7) | Free advisory profile audit |
| `/proof/` | Pillar: Pipeline proof | 17-step direct response (Suby / King Kong) | Guarantee qualification check |
| `/build/` | Pillar: The build | 17-step direct response | Content-hours calculator, time-back plan |
| `/founder/` | Pillar: The founder | 17-step direct response | The Story Bank (lead magnet) |
| `/hot-takes/` | Pillar: Hot takes | 17-step direct response | Roast my profile |
| `/lifestyle/` | Pillar: Lifestyle | 17-step direct response | Freedom Score quiz, Freedom Plan |

Each pillar page is the destination for that content pillar's posts. The strategy, the post-to-page mapping and the items to confirm before launch are in `docs/FounderBrands - Pillar Sales Pages.docx`. `/option-b-founders/` redirects to `/`.

## Preview locally

Run `python3 -m http.server` in this folder and open http://localhost:8000 (the pillar pages use root-relative folders, so open them through a server rather than as files). Fonts are self-hosted in `assets/fonts/` with a jsDelivr fallback. Client photos load from founderbrands.io.

## Deploy to Vercel

1. Import this repo in Vercel (Add New, Project).
2. Framework preset: Other. No build command. Output directory: root.
3. Deploy. Pages are live at `/`, `/option-a-cpa/` and the five pillar paths.

## Before these go live with real traffic

- **Wire the forms.** `assets/audit-form.js` (home, CPA page) and `assets/pillar.js` (pillar pages, see `submitLead()`) validate and show a confirmation state, but post nowhere. Replace with a POST to the CRM or a Zapier/Make webhook. Each pillar form sends an `offer` value so leads can be tagged by pillar.
- **Install tracking.** Add the Meta Pixel to both pages and fire `Lead` on audit submit (already called in `audit-form.js` if `fbq` exists). Send the same event server-side through the Conversions API.
- **Confirm proof numbers.** Brad Nelson's figures use the homepage version (16 calls in 60 days, $120k added annual revenue). The current ads also cite $250k pipeline and $120k in 60 days. Pick one and use it everywhere.
- **Write the guarantee terms.** Both pages promise 10 qualified sales calls in 90 days or free work until delivered. Define "qualified" and any conditions on a terms page before launch.
- **Fulfil the new offers.** Decide who produces the Story Bank, the profile roast video, the time-back plan and the Freedom Plan, and hold the one-business-day promise.
- **Host the photos.** Client images are hotlinked from founderbrands.io. Copy them into `assets/img/` for production.

## Structure

```
index.html                 home: founder-led growth agency page (was Option B)
option-a-cpa/index.html    Option A, CPA StoryBrand page
proof/ build/ founder/ hot-takes/ lifestyle/   pillar sales pages
assets/audit-form.js       demo form handler (home, CPA page)
assets/pillar.css          shared styles for the pillar pages
assets/pillar.js           pillar forms, calculator and quiz
assets/fonts/              self-hosted woff2 (IBM Plex, Caveat, Anton, Space Grotesk, Inter; SIL OFL)
ads/                       Meta ad creatives (PNG) and their HTML sources
```
