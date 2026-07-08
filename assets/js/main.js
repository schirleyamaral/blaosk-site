// ============================================================
// BLAOSK — main.js
// ============================================================

(function () {
  "use strict";

  let currentLang = localStorage.getItem("blaosk_lang") ||
    (navigator.language && navigator.language.toLowerCase().startsWith("pt") ? "pt" : "en");

  const html = document.documentElement;

  // ---------- LANGUAGE ----------
  function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem("blaosk_lang", lang);
    html.setAttribute("lang", lang === "pt" ? "pt-BR" : "en");
    html.setAttribute("data-lang", lang);

    document.querySelectorAll("[data-lang-btn]").forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-lang-btn") === lang);
    });

    // simple text nodes
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const val = resolveKey(I18N[lang], key);
      if (val != null) el.innerHTML = val;
    });

    renderPipeline(lang);
    renderGrid(lang);
    if (window.BlaoskGame) window.BlaoskGame.setLang(lang);
  }

  function resolveKey(obj, path) {
    return path.split(".").reduce((acc, k) => (acc && acc[k] != null ? acc[k] : null), obj);
  }

  document.querySelectorAll("[data-lang-btn]").forEach(btn => {
    btn.addEventListener("click", () => applyLang(btn.getAttribute("data-lang-btn")));
  });

  // ---------- PIPELINE ----------
  function renderPipeline(lang) {
    const ol = document.getElementById("pipeline");
    if (!ol) return;
    const steps = I18N[lang].process.steps;
    ol.innerHTML = steps.map((s, i) => `
      <li class="pipeline__step">
        <span class="pipeline__num">${String(i + 1).padStart(2, "0")}</span>
        <div class="pipeline__body">
          <h3>${s.title}</h3>
          <p>${s.body}</p>
        </div>
      </li>
    `).join("");
  }

  // ---------- WORK GRID ----------
  function renderGrid(lang) {
    const grid = document.getElementById("workGrid");
    if (!grid) return;
    grid.innerHTML = PROJECTS.map((p, i) => {
      const cover = p.cover || `https://img.youtube.com/vi/${p.videoId}/hqdefault.jpg`;
      const playIcon = p.videoId ? `<span class="tile__play">▶</span>` : "";
      return `
        <button class="tile tile--${p.size}" data-index="${i}" aria-label="${p.title[lang]}" style="background-image:url('${cover}')">
          <span class="tile__scrim"></span>
          <span class="tile__meta">
            <span class="tile__cat">${p.category[lang]}</span>
            <span class="tile__title">${p.title[lang]}</span>
          </span>
          ${playIcon}
        </button>
      `;
    }).join("");

    grid.querySelectorAll(".tile").forEach(btn => {
      btn.addEventListener("click", () => openLightbox(parseInt(btn.getAttribute("data-index"), 10)));
    });
  }

  // ---------- LIGHTBOX ----------
  const lightbox = document.getElementById("lightbox");
  const lightboxInner = document.getElementById("lightboxInner");
  const lightboxClose = document.getElementById("lightboxClose");

  function openLightbox(index) {
    const p = PROJECTS[index];
    const lang = currentLang;
    const videoBlock = p.videoId ? `
      <div class="lightbox__video">
        <iframe src="https://www.youtube.com/embed/${p.videoId}?rel=0" title="${p.title[lang]}"
          frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen loading="lazy"></iframe>
      </div>
      <a class="lightbox__yt-link" href="https://youtu.be/${p.videoId}" target="_blank" rel="noopener">${lang === "pt" ? "Assistir no YouTube" : "Watch on YouTube"} ↗</a>` : "";
    const imgBlock = p.full ? `
      <div class="lightbox__image">
        <img src="${p.full}" alt="${p.title[lang]}" loading="lazy">
      </div>` : "";

    lightboxInner.innerHTML = `
      <div class="lightbox__head">
        <span class="lightbox__cat">${p.category[lang]}</span>
        <h3>${p.title[lang]}</h3>
        <p>${p.blurb[lang]}</p>
      </div>
      <div class="lightbox__media">
        ${videoBlock}
        ${imgBlock}
      </div>
    `;
    lightbox.classList.add("is-open");
    document.body.classList.add("no-scroll");
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
    lightboxInner.innerHTML = "";
  }

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });

  // ---------- NAV SCROLL STATE ----------
  const nav = document.getElementById("nav");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 40);
  }, { passive: true });

  // ---------- MOBILE BURGER ----------
  const burger = document.getElementById("navBurger");
  const navLinks = document.getElementById("navLinks");
  burger.addEventListener("click", () => {
    navLinks.classList.toggle("is-open");
    burger.classList.toggle("is-open");
  });
  navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    burger.classList.remove("is-open");
  }));

  // ---------- HERO: lazy-loaded Ken Burns crossfade ----------
  const HERO_IMAGES = [
    { src: "assets/img/hero/hero-01-copan.jpg", bright: false },
    { src: "assets/img/hero/hero-02-tropicalvines.jpg", bright: true },
    { src: "assets/img/hero/hero-03-vernier.jpg", bright: false },
    { src: "assets/img/hero/hero-04-pearlring.jpg", bright: true },
    { src: "assets/img/hero/hero-05-vasco.jpg", bright: false },
    { src: "assets/img/hero/hero-06-oriaorange.jpg", bright: true },
    { src: "assets/img/hero/hero-07-schwartz.jpg", bright: false },
    { src: "assets/img/hero/hero-08-everlast.jpg", bright: false }
  ];

  (function heroCrossfade() {
    const bg = document.getElementById("heroBg");
    const ticksWrap = document.getElementById("heroTicks");
    if (!bg) return;

    const SLIDE_MS = 5200;
    let idx = 0;
    const slideEls = [];

    // build tick indicators
    HERO_IMAGES.forEach((_, i) => {
      const tick = document.createElement("span");
      tick.className = "hero__tick";
      ticksWrap.appendChild(tick);
    });
    const ticks = ticksWrap.querySelectorAll(".hero__tick");

    function makeSlide(i) {
      const el = document.createElement("div");
      el.className = "hero__slide" + (HERO_IMAGES[i].bright ? " hero__slide--bright" : "");
      el.style.backgroundImage = `url('${HERO_IMAGES[i].src}')`;
      bg.appendChild(el);
      return el;
    }

    // preload only current + next
    slideEls[0] = makeSlide(0);
    slideEls[1] = makeSlide(1);
    requestAnimationFrame(() => {
      slideEls[0].classList.add("is-active", "is-kenburns");
    });
    ticks[0].classList.add("is-active");

    function goTo(next) {
      const prevIdx = idx;
      idx = next;

      if (!slideEls[idx]) slideEls[idx] = makeSlide(idx);
      const upcoming = (idx + 1) % HERO_IMAGES.length;
      if (!slideEls[upcoming]) slideEls[upcoming] = makeSlide(upcoming);

      slideEls[idx].classList.add("is-active");
      void slideEls[idx].offsetWidth; // restart animation
      slideEls[idx].classList.add("is-kenburns");

      slideEls[prevIdx].classList.remove("is-active", "is-kenburns");

      ticks.forEach(t => t.classList.remove("is-active"));
      ticks[idx].classList.add("is-active");

      // free images that are no longer needed (keep only current + next in DOM background)
      Object.keys(slideEls).forEach(k => {
        const ki = parseInt(k, 10);
        if (ki !== idx && ki !== upcoming && slideEls[ki]) {
          slideEls[ki].style.backgroundImage = "";
        } else if (slideEls[ki] && !slideEls[ki].style.backgroundImage) {
          slideEls[ki].style.backgroundImage = `url('${HERO_IMAGES[ki].src}')`;
        }
      });
    }

    setInterval(() => {
      goTo((idx + 1) % HERO_IMAGES.length);
    }, SLIDE_MS);
  })();

  // ---------- FOOTER YEAR ----------
  document.getElementById("year").textContent = new Date().getFullYear();

  // ---------- GAME TRIGGER ----------
  const gameOverlay = document.getElementById("gameOverlay");
  const gameTrigger = document.getElementById("gameTrigger");
  const gameClose = document.getElementById("gameClose");

  gameTrigger.addEventListener("click", () => {
    gameOverlay.classList.add("is-open");
    document.body.classList.add("no-scroll");
    if (window.BlaoskGame) window.BlaoskGame.start(currentLang);
  });
  function closeGame() {
    gameOverlay.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
    if (window.BlaoskGame) window.BlaoskGame.stop();
  }
  gameClose.addEventListener("click", closeGame);
  gameOverlay.addEventListener("click", (e) => { if (e.target === gameOverlay) closeGame(); });

  // ---------- INIT ----------
  applyLang(currentLang);

})();
