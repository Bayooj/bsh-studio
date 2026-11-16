# BSH — portfolio site

A minimal, video-first portfolio. Plain HTML, CSS and JavaScript — no build step,
no framework, no npm install. Edit a file, refresh the browser, done.

```
bsh-studio/
├── index.html        home — the looping film and the five links
├── works.html        the portfolio strip
├── rates.html        pricing
├── info.html         bio, services, clients
├── contact.html      links
├── js/
│   ├── data.js       ← ALL YOUR CONTENT LIVES HERE
│   └── site.js       the engine (you rarely touch this)
├── css/style.css     every colour, size and spacing value
├── fonts/            Poppins, self-hosted
└── media/
    ├── bg/           the home-page film and the contact image
    └── works/        one still per piece of work
```

**The one rule:** 90% of what you'll ever want to change is in `js/data.js`.

---

## Seeing it on your own machine

Opening `index.html` by double-clicking will *mostly* work, but browsers block
some things on `file://` URLs. Run a tiny local server instead:

```bash
cd bsh-studio
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Ctrl-C to stop.

---

## 1. Adding a piece of work

Open `js/data.js`, find the `works:` list, and copy one of the blocks.
**New work goes at the top** — the list renders left to right in the order written.

```js
works: [
  {
    title:  "LAGOS, 6AM",              // shows under the panel
    client: "Self-initiated",          // shows in the full-size view
    year:   "2026",                    // shows under the panel, right side
    role:   "Director / Editor",       // shows in the full-size view
    poster: "media/works/lagos.jpg",   // the still — REQUIRED
    video:  null,                      // see below
    link:   null                       // see below
  },
  ...
```

### Stills and videos — how the placeholder system works

`poster` is the only required field, and it's the heart of the thing you asked for.

| What you have | What to write | What visitors get |
|---|---|---|
| Just a still, video not cut yet | `poster: "…jpg"`, `video: null` | The still sits in the panel with a small **STILL** badge. Clicking opens it large. |
| Still *and* video | `poster: "…jpg"`, `video: "…mp4"` | The still loads first, then the video fades in and plays silently when hovered. The badge becomes **▶ PLAY**. Clicking opens the full video with sound and controls. |
| It lives on Vimeo/YouTube | `poster: "…jpg"`, `link: "https://…"` | Clicking the panel opens that link in a new tab. |

So the workflow is: **drop a still in now, add the `video:` line whenever the
edit is finished.** Nothing else changes, and the badge updates itself.

### Preparing the files

Stills — portrait crops look best, since the panels are tall:

```bash
# a vertical crop at a sensible size
ffmpeg -i frame.png -vf "scale=620:-1" -q:v 3 media/works/lagos.jpg
```

Videos — keep hover previews short, small and silent. 6–10 seconds is plenty:

```bash
ffmpeg -i master.mov -t 8 -an -vf "scale=720:-2" \
  -c:v libx264 -crf 30 -preset slow -movflags +faststart \
  media/works/lagos.mp4
```

Aim for **under 3 MB** per preview. GitHub Pages serves everything in the repo,
and a heavy page is a page people leave. For full films, host on Vimeo or
YouTube and use `link:` instead.

---

## 2. Changing the background film

In `js/data.js`:

```js
background: {
  video:  "media/bg/reel.mp4",
  poster: "media/bg/reel.jpg",   // shown while the video loads
  dim:    0.25                   // 0 = untouched, 0.6 = heavily darkened
}
```

Raise `dim` if your reel is bright and the five links are getting lost in it.

Export a web-friendly loop like this:

```bash
ffmpeg -i reel.mov -t 12 -an -vf "scale=1600:-2" \
  -c:v libx264 -crf 28 -preset slow -pix_fmt yuv420p -movflags +faststart \
  media/bg/reel.mp4

# grab a frame for the poster
ffmpeg -i media/bg/reel.mp4 -ss 4 -vframes 1 -q:v 3 media/bg/reel.jpg
```

Keep it under ~15 MB. It autoplays muted, which is what every browser requires —
the **SOUND ON** button in the corner lets people turn audio on themselves.

---

## 3. Swapping BSH for your logo

Right now the centre of the nav is the text `BSH`. When your logo file is ready:

```js
identity: {
  name: "BSH",
  logoImage: "media/bsh-logo.svg",   // was null
  ...
}
```

Drop the file in `media/`. SVG is ideal; a transparent PNG at around 200px wide
works too. It renders at 18px tall — change that in `css/style.css` under
`.nav__logo img`.

To remove the logo entirely, set `logoImage: null` and `name: ""`.

---

## 4. Editing your rates

All in `js/data.js` under `rates:`. Each package is one block:

```js
{
  name:  "FULL DAY",
  price: "FROM $850",
  meta:  "UP TO 9 HOURS",
  items: [
    "Solo shooter or small crew",
    "Edited cut delivered in 10 days"
  ]
}
```

Add a block, remove a block — the row re-spaces itself. Four reads well on a
laptop; five or six still work and simply wrap.

The placeholder prices are written `FROM $———` so you can't accidentally publish
a number you didn't choose. Those are the first thing to change.

> A note worth making: putting real numbers up filters out the enquiries that
> were never going to convert, but it also sets a ceiling in some clients' heads.
> `FROM` pricing, which is how it's written here, is the usual compromise.

---

## 5. Your contact details

```js
contact: {
  portrait: "media/bg/contact-still.jpg",   // or null for type only
  links: [
    { label: "INSTAGRAM", href: "https://instagram.com/yourhandle" },
    { label: "MAIL",      href: "mailto:you@example.com"           },
    { label: "YOUTUBE",   href: "https://youtube.com/@yourhandle"  },
    { label: "LINKEDIN",  href: "https://linkedin.com/in/you"      }
  ],
  location: "METRO VANCOUVER, BC",
  availability: "AVAILABLE FOR COMMISSIONS"
}
```

Add or remove links freely — they re-space down the page. Four is the sweet spot;
beyond six it gets crowded.

To use a photo of yourself instead of the smoke plate: a **cut-out PNG with a
transparent background** looks best, since the page behind it is white.

---

## 6. Adding a whole new section

This is the one that needs two steps instead of one. Say you want **ARCHIVE**.

**Step 1 — copy a page.** `rates.html` is the simplest starting point:

```bash
cp rates.html archive.html
```

Open it and change the `<title>`, and give the main element a new id if you're
going to render something custom into it.

**Step 2 — add it to the nav** in `js/data.js`:

```js
nav: [
  { label: "WORKS",   href: "works.html"   },
  { label: "RATES",   href: "rates.html"   },
  { label: "ARCHIVE", href: "archive.html" },   // ← new
  { label: "INFO",    href: "info.html"    },
  { label: "CONTACT", href: "contact.html" }
]
```

That's it. The nav splits itself evenly either side of the logo, so with five
links you get two on the left and three on the right, and the clock and year stay
on the outermost items. It balances itself at any number.

**Where the nav sits.** Each page's `<body>` carries one of two classes:

- `nav-center` — the row floats in the middle of the screen. This is the KARGO
  move, and it's right for pages that are mostly picture: `index`, `works`,
  `contact`.
- `nav-bottom` — the same row pinned to the foot. Right for pages with a lot of
  reading, where a centred row would land on top of the words: `rates`, `info`.

Pick whichever suits your new page and put it on the `<body>` tag.

---

## 7. Restyling

Everything tunable is at the top of `css/style.css`:

```css
:root{
  --font: "Poppins", …;
  --nav-size: 16px;      /* the five main links */
  --meta-size: 10px;     /* clock, year, captions */
  --nav-weight: 200;     /* 100 is thinner, 400 heavier */
  --black: #000000;
  --white: #ffffff;
  --grey:  #cccccc;
  --gutter: 12px;        /* distance from the screen edge */
  --roll-speed: .42s;    /* the letter-roll on hover */
}
```

### About the typeface

The reference site uses **Mozaic GEO**, which is licensed and can't be
redistributed. This site uses **Poppins**, which is free and — measured against
the original — matches its word widths to within one or two pixels at nav size.
Side by side they are very hard to tell apart.

If you ever license Mozaic GEO, drop the `.woff2` files into `fonts/`, rewrite the
`@font-face` blocks at the top of `css/style.css`, and change `--font`.

### Making the type thinner or heavier

`--nav-weight: 200` is the current setting. Try `100` for hairline, `300` for a
bit more presence. Weights 100–500 and 700 are all bundled.

---

## 8. Publishing changes

```bash
git add .
git commit -m "Add Lagos, 6am"
git push
```

GitHub Pages redeploys in under a minute. If you don't see the change, hard-refresh
(**Cmd-Shift-R**) — browsers cache video and CSS aggressively.

---

## Things worth knowing

- **Videos must be muted to autoplay.** Every browser enforces this. The home
  page handles it, and falls back to the poster image if autoplay is refused.
- **Don't commit camera masters.** A 4 GB ProRes file in a git repo is painful to
  undo. Export web versions into `media/`, keep masters elsewhere.
- **The clock is real.** It reads `identity.timezone` — currently
  `America/Vancouver`. Any IANA timezone name works.
- **Keyboard works too.** Arrow keys scroll the works strip, Escape closes the
  full-size view.
