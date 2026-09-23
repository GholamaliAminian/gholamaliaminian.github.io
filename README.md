# Personal website — Gholamali Aminian

A single-page academic site built from my CV. Plain HTML, CSS and a little JavaScript —
no build step, no dependencies.

**Live:** https://gholamaliaminian.github.io/

## Files

| File | What it holds |
| --- | --- |
| `index.html` | All page content — bio, news, experience, research, publications, talks, teaching, awards |
| `style.css` | Design tokens at the top (`:root`), then layout. Light and dark palettes both defined there |
| `script.js` | Theme toggle, publication filter, nav highlighting |
| `assets/Aminian_CV.pdf` | The downloadable CV |
| `assets/photo.jpg` | Portrait in the header (also the link-preview image) |
| `assets/favicon.svg` | Tab icon |
| `.nojekyll` | Tells GitHub Pages to serve the files as-is |

## Previewing locally

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>. (Opening `index.html` directly also works.)

## Adding a publication

The full list is grouped by year. Copy an existing `<li>` into the right
`<div class="pub-year">` block in `#pub-list` (add a new block at the top for a new year).
The `data-type` attribute drives the filter buttons — use `preprint`, `conference`,
`journal` or `workshop`. Wrap your own name in `<span class="me">…</span>` so it is bolded,
and list links in `<p class="links">`.

```html
<li data-type="conference">
  <p class="title">Paper Title</p>
  <p class="authors"><span class="me">Gholamali Aminian</span>, Co Author</p>
  <p class="venue"><b>NeurIPS</b> · 2026</p>
  <p class="links"><a href="https://…">Paper</a><a href="https://arxiv.org/abs/…">arXiv</a></p>
</li>
```

To feature a paper at the top, add a matching `<article class="pub-card">` in the
**Selected publications** section and put `<span class="star" title="Selected publication">★</span>`
at the start of its title in the full list.

Also worth updating when things change: the **News** list, and the citation / h-index
numbers in the `.highlights` strip under the header (copied from Google Scholar).

## Publishing changes

```sh
git add -A
git commit -m "Update publications"
git push
```

GitHub Pages redeploys within about a minute.

## Updating the CV PDF

Replace `assets/Aminian_CV.pdf` with the new file, keeping the same name, then commit and push.
