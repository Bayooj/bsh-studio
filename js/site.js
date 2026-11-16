/* ============================================================================
   BSH — SITE ENGINE
   ----------------------------------------------------------------------------
   You should not need to edit this file for normal changes.
   Content lives in data.js. Looks live in css/style.css.
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------ */
  /*  Small helpers                                                     */
  /* ------------------------------------------------------------------ */
  const $  = (sel, root) => (root || document).querySelector(sel);
  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls)  n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };

  /* ------------------------------------------------------------------ */
  /*  ROLLING TEXT                                                      */
  /*  Turns "WORKS" into five stacked letter-pairs that roll on hover.  */
  /*  Each letter is delayed slightly more than the one before it,      */
  /*  which is what makes the word read left to right.                  */
  /* ------------------------------------------------------------------ */
  function rolling(text) {
    const wrap = el("span", "roll");
    [...text].forEach((ch, i) => {
      if (ch === " ") {
        wrap.appendChild(el("span", "roll__char roll__char--space"));
        return;
      }
      const c = el("span", "roll__char");
      const a = el("span", null, ch);
      const b = el("span", null, ch);
      // stagger: 22ms per letter
      const d = (i * 22) + "ms";
      a.style.transitionDelay = d;
      b.style.transitionDelay = d;
      c.append(a, b);
      wrap.appendChild(c);
    });
    return wrap;
  }

  /* ------------------------------------------------------------------ */
  /*  LIVE CLOCK                                                        */
  /* ------------------------------------------------------------------ */
  function startClock(node) {
    if (!node) return;
    const tz = SITE.identity.timezone;
    const tick = () => {
      let t;
      try {
        t = new Intl.DateTimeFormat("en-US", {
          hour: "2-digit", minute: "2-digit", hour12: true, timeZone: tz
        }).format(new Date());
      } catch (e) {
        // an unknown timezone should never take the page down
        t = new Intl.DateTimeFormat("en-US", {
          hour: "2-digit", minute: "2-digit", hour12: true
        }).format(new Date());
      }
      node.textContent = t;
    };
    tick();
    setInterval(tick, 10000);
  }

  /* ------------------------------------------------------------------ */
  /*  NAVIGATION                                                        */
  /*  Links are split evenly either side of the logo, so adding a fifth */
  /*  or sixth section rebalances the row automatically.                */
  /* ------------------------------------------------------------------ */
  function buildNav() {
    const host = $("#nav");
    if (!host) return;

    const links = SITE.nav;
    const half  = Math.ceil(links.length / 2);
    const here  = location.pathname.split("/").pop() || "index.html";

    const makeLink = (item, opts) => {
      const a = el("a", "nav__item" + (opts.end ? " nav__item--end" : ""));
      a.href = item.href;
      if (item.href === here) a.setAttribute("aria-current", "page");

      const label = el("span", "nav__label");
      label.appendChild(rolling(item.label));
      a.appendChild(label);

      if (opts.meta) {
        const m = el("span", "nav__meta", opts.meta === "clock" ? "" : SITE.identity.year);
        if (opts.meta === "clock") { m.id = "clock"; }
        a.appendChild(m);
      }
      return a;
    };

    // left side ----------------------------------------------------------
    links.slice(0, half).forEach((item, i) => {
      host.appendChild(makeLink(item, { meta: i === 0 ? "clock" : null }));
    });

    // logo ---------------------------------------------------------------
    const logo = el("a", "nav__logo");
    logo.href = "index.html";
    logo.setAttribute("aria-label", SITE.identity.fullName + " — home");
    if (SITE.identity.logoImage) {
      const img = el("img");
      img.src = SITE.identity.logoImage;
      img.alt = SITE.identity.fullName;
      logo.appendChild(img);
    } else {
      logo.textContent = SITE.identity.name;
    }
    host.appendChild(logo);

    // right side ---------------------------------------------------------
    const right = links.slice(half);
    right.forEach((item, i) => {
      const isLast = i === right.length - 1;
      host.appendChild(makeLink(item, { end: isLast, meta: isLast ? "year" : null }));
    });

    startClock($("#clock"));

    // phone layout keeps clock + year pinned to the bottom corners
    const mob = el("div", "nav-meta-mobile");
    const mClock = el("span", null, "");
    mClock.id = "clock-mobile";
    mob.append(mClock, el("span", null, SITE.identity.year));
    document.body.appendChild(mob);
    startClock(mClock);
  }

  /* ------------------------------------------------------------------ */
  /*  HOME — background video                                           */
  /* ------------------------------------------------------------------ */
  function buildBackground() {
    const host = $("#bg");
    if (!host) return;

    const bg = SITE.background;
    document.documentElement.style.setProperty("--veil", bg.dim);

    const v = el("video");
    v.src = bg.video;
    v.poster = bg.poster || "";
    v.autoplay = true;
    v.loop = true;
    v.muted = true;            // required for autoplay in every browser
    v.playsInline = true;
    v.setAttribute("playsinline", "");
    v.setAttribute("muted", "");
    v.preload = "auto";

    host.appendChild(v);
    host.appendChild(el("div", "bg__veil"));

    // If a browser still refuses to autoplay, fall back to the poster
    // rather than showing a black rectangle.
    v.play().catch(() => {
      if (bg.poster) {
        const img = el("img");
        img.src = bg.poster;
        img.alt = "";
        host.insertBefore(img, v);
        v.style.display = "none";
      }
    });

    // Optional sound toggle
    const btn = $("#sound");
    if (btn) {
      btn.addEventListener("click", () => {
        v.muted = !v.muted;
        btn.textContent = v.muted ? "SOUND ON" : "SOUND OFF";
        if (!v.muted) v.play().catch(() => {});
      });
    }
  }

  /* ------------------------------------------------------------------ */
  /*  WORKS                                                             */
  /* ------------------------------------------------------------------ */
  function buildWorks() {
    const strip = $("#strip");
    if (!strip) return;

    // drag state — declared up here because the panel click handlers read it
    let down = false, startX = 0, startLeft = 0, dragMoved = false;

    SITE.works.forEach((w, i) => {
      const panel = el("article", "panel");
      const frame = el("div", "panel__frame");

      const media = el("div", "panel__media");
      const img = el("img");
      img.src = w.poster;
      img.alt = w.title;
      img.loading = i < 4 ? "eager" : "lazy";
      media.appendChild(img);

      // A preview video is optional. Until one exists the still stands in.
      if (w.video) {
        const v = el("video");
        v.src = w.video;
        v.muted = true;
        v.loop = true;
        v.playsInline = true;
        v.setAttribute("playsinline", "");
        v.preload = "none";
        media.appendChild(v);

        panel.addEventListener("mouseenter", () => {
          panel.classList.add("is-playing");
          v.play().catch(() => {});
        });
        panel.addEventListener("mouseleave", () => {
          panel.classList.remove("is-playing");
          v.pause();
        });

        frame.appendChild(el("span", "panel__cue", "▶ PLAY"));
      } else {
        frame.appendChild(el("span", "panel__placeholder", "STILL"));
      }

      frame.appendChild(media);
      panel.appendChild(frame);

      const cap = el("div", "panel__caption");
      cap.append(el("span", "t", w.title), el("span", "y", w.year));
      panel.appendChild(cap);

      // click → lightbox (video if there is one, otherwise the still),
      // unless an external link is set, which wins.
      panel.addEventListener("click", () => {
        if (dragMoved) return;             // ignore clicks that were drags
        if (w.link) { window.open(w.link, "_blank", "noopener"); return; }
        openLightbox(w);
      });

      strip.appendChild(panel);
    });

    /* --- wheel: turn vertical scrolling into sideways movement --------
       Listening on the window rather than the strip, so the wheel still
       works when the pointer happens to be over the floating nav. */
    window.addEventListener("wheel", (e) => {
      if (document.querySelector("#lightbox.is-open")) return;   // let the player scroll
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (!delta) return;
      e.preventDefault();
      strip.scrollLeft += delta;
    }, { passive: false });

    /* --- click and drag ---------------------------------------------- */
    strip.addEventListener("pointerdown", (e) => {
      down = true; dragMoved = false;
      startX = e.clientX;
      startLeft = strip.scrollLeft;
      strip.classList.add("is-dragging");
    });
    window.addEventListener("pointermove", (e) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) dragMoved = true;
      strip.scrollLeft = startLeft - dx;
    });
    window.addEventListener("pointerup", () => {
      down = false;
      strip.classList.remove("is-dragging");
      // let the click handler see the flag, then clear it
      setTimeout(() => { dragMoved = false; }, 0);
    });

    /* --- arrow keys --------------------------------------------------- */
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") strip.scrollLeft += 260;
      if (e.key === "ArrowLeft")  strip.scrollLeft -= 260;
    });
  }

  /* ------------------------------------------------------------------ */
  /*  LIGHTBOX                                                          */
  /* ------------------------------------------------------------------ */
  function openLightbox(w) {
    const box = $("#lightbox");
    if (!box) return;
    const stage = $("#lightbox-stage", box);
    stage.innerHTML = "";

    if (w.video) {
      const v = el("video");
      v.src = w.video;
      v.controls = true;
      v.autoplay = true;
      v.playsInline = true;
      v.setAttribute("playsinline", "");
      stage.appendChild(v);
    } else {
      const img = el("img");
      img.src = w.poster;
      img.alt = w.title;
      stage.appendChild(img);
    }

    $("#lightbox-title", box).textContent =
      [w.title, w.client].filter(Boolean).join(" — ");
    $("#lightbox-meta", box).textContent =
      [w.role, w.year].filter(Boolean).join(" / ");

    box.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    const box = $("#lightbox");
    if (!box) return;
    box.classList.remove("is-open");
    $("#lightbox-stage", box).innerHTML = "";
    document.body.style.overflow = "";
  }

  function wireLightbox() {
    const box = $("#lightbox");
    if (!box) return;
    $("#lightbox-close", box).addEventListener("click", closeLightbox);
    box.addEventListener("click", (e) => { if (e.target === box) closeLightbox(); });
    window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });
  }

  /* ------------------------------------------------------------------ */
  /*  RATES                                                             */
  /* ------------------------------------------------------------------ */
  function buildRates() {
    const host = $("#rates");
    if (!host) return;
    const r = SITE.rates;

    const intro = $("#rates-intro");
    if (intro) intro.innerHTML = r.intro.join("<br>");

    r.packages.forEach((p) => {
      const card = el("div", "rate");
      card.append(
        el("div", "rate__name",  p.name),
        el("div", "rate__price", p.price),
        el("div", "rate__meta",  p.meta)
      );
      const ul = el("ul", "rate__items");
      p.items.forEach((it) => ul.appendChild(el("li", null, it)));
      card.appendChild(ul);
      host.appendChild(card);
    });

    const notes = $("#rates-notes");
    if (notes) notes.innerHTML = r.notes.join("<br>");
  }

  /* ------------------------------------------------------------------ */
  /*  INFO                                                              */
  /* ------------------------------------------------------------------ */
  function buildInfo() {
    const host = $("#info");
    if (!host) return;
    const d = SITE.info;

    $("#info-bio").innerHTML = d.bio.join("<br>");
    $("#info-services-heading").textContent = d.servicesHeading;
    $("#info-services").textContent = d.services.join(" | ") + " |";

    const strip = $("#info-strip");
    d.strip.forEach((src) => {
      const img = el("img");
      img.src = src;
      img.alt = "";
      img.loading = "lazy";
      strip.appendChild(img);
    });

    $("#info-clients-heading").textContent = d.clientsHeading;
    const groups = $("#info-clients");
    d.clientGroups.forEach((g) => {
      const box = el("div", "group");
      box.appendChild(el("h3", null, g.name));
      box.appendChild(el("p", null, g.list.join(" | ") + " |"));
      groups.appendChild(box);
    });

    $("#info-footer").innerHTML = d.footer.join("<br>");
  }

  /* ------------------------------------------------------------------ */
  /*  CONTACT                                                           */
  /* ------------------------------------------------------------------ */
  function buildContact() {
    const host = $("#contact-links");
    if (!host) return;
    const c = SITE.contact;

    c.links.forEach((l) => {
      const a = el("a");
      a.href = l.href;
      if (!l.href.startsWith("mailto:")) {
        a.target = "_blank";
        a.rel = "noopener";
      }
      a.appendChild(rolling(l.label));
      host.appendChild(a);
    });

    const p = $("#contact-portrait");
    if (p && c.portrait) {
      const img = el("img");
      img.src = c.portrait;
      img.alt = "";
      p.appendChild(img);
    }

    const foot = $("#contact-foot");
    if (foot) {
      foot.innerHTML =
        '<span>' + (c.location || "") + '</span><span>' + (c.availability || "") + '</span>';
    }
  }

  /* ------------------------------------------------------------------ */
  /*  SIMPLE BINDINGS                                                   */
  /*  Any element with data-bind="identity.tagline" gets that value     */
  /*  from data.js. Handy for one-off bits of copy.                     */
  /* ------------------------------------------------------------------ */
  function applyBindings() {
    document.querySelectorAll("[data-bind]").forEach((n) => {
      const val = n.getAttribute("data-bind")
        .split(".")
        .reduce((o, k) => (o == null ? o : o[k]), SITE);
      if (val != null) n.textContent = val;
    });
  }

  /* ------------------------------------------------------------------ */
  /*  BOOT                                                              */
  /* ------------------------------------------------------------------ */
  function boot() {
    document.title = SITE.identity.fullName + " — " + SITE.identity.tagline;
    applyBindings();
    buildNav();
    buildBackground();
    buildWorks();
    wireLightbox();
    buildRates();
    buildInfo();
    buildContact();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
