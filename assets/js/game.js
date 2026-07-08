// ============================================================
// BLAOSK_ARCADE — "The Evolution" — jump to absorb the tools
// that carried the studio from lens to CGI to AI alchemy.
// ============================================================

(function () {
  "use strict";

  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  const scoreEl = document.getElementById("gameScore");
  const bestEl = document.getElementById("gameBest");
  const hintEl = document.getElementById("gameHint");
  const phaseEl = document.getElementById("gamePhase");
  const panelEl = document.getElementById("gamePanel");

  const W = canvas.width, H = canvas.height;
  const GROUND_Y = H - 80;
  const CHAR_X = 120;
  const ICON_SIZE = 54;
  const GRAVITY = 0.85;
  const JUMP_FORCE = -16.5;

  // ---------- ICON PHASES (mirrors the real career arc) ----------
  const PHASES = [
    {
      key: "p1",
      icons: ["Blender", "Rhinoceros", "Keyshot", "IClone8", "Character-Creator", "SubstancePainter"],
      bg: "#0a0a0c", ui: "#c9a24a", char: "#151318", ground: "#232228"
    },
    {
      key: "p2",
      icons: ["Photoshop", "AE", "Premiere", "HyperFramers"],
      bg: "#f2f1ed", ui: "#151318", char: "#2c2a28", ground: "#dedad2"
    },
    {
      key: "p3",
      icons: ["AIStudio", "Claude", "Higgsfield", "Firefly", "ComfyUI"],
      bg: "#0a0a0c", ui: "#c9a24a", char: "#151318", ground: "#232228"
    }
  ];
  const ALL_ICON_NAMES = [...new Set(PHASES.flatMap(p => p.icons))];

  // ---------- PRELOAD ICON IMAGES (bundled, no user action needed) ----------
  const images = {};
  let loaded = 0;
  let ready = false;
  ALL_ICON_NAMES.forEach(name => {
    const img = new Image();
    img.onload = () => { loaded++; if (loaded >= ALL_ICON_NAMES.length) ready = true; };
    img.onerror = () => { loaded++; if (loaded >= ALL_ICON_NAMES.length) ready = true; };
    img.src = `assets/icons/${name}.png`;
    images[name] = img;
  });

  let lang = "en";

  // ---------- STATE ----------
  let score = 0, misses = 0;
  const MAX_MISSES = 3;
  let best = parseInt(localStorage.getItem("blaosk_mastery") || "0", 10);
  let speed = 8.6, t = 0, legPhase = 0, phaseIdx = 0;
  let playing = false, started = false, gameOver = false;
  let items = [], particles = [], toasts = [];
  let charY = 0, vY = 0, isJumping = false;
  let roadMarkers = [];
  let rafId = null;

  for (let i = 0; i < 16; i++) roadMarkers.push({ x: i * 70, w: Math.random() * 26 + 10 });

  function reset() {
    score = 0; misses = 0; speed = 8.6; phaseIdx = 0; t = 0;
    items = []; particles = []; toasts = [];
    charY = 0; vY = 0; isJumping = false;
    started = true; playing = true; gameOver = false;
    applyPhaseChrome();
  }

  function applyPhaseChrome() {
    const p = PHASES[phaseIdx];
    if (panelEl) panelEl.style.background = p.bg === "#0a0a0c" ? "" : p.bg;
    if (phaseEl) {
      phaseEl.style.color = p.ui;
      phaseEl.style.borderColor = p.ui;
      phaseEl.textContent = phaseLabel(phaseIdx);
    }
  }

  function phaseLabel(idx) {
    const L = I18N[lang].game.phases;
    return `${lang === "pt" ? "FASE" : "PHASE"} ${idx + 1}: ${L[idx]}`;
  }

  function setLang(l) {
    lang = l;
    updateHint();
    if (phaseEl) phaseEl.textContent = phaseLabel(phaseIdx);
  }

  function updateHint() {
    if (!hintEl) return;
    if (!started) hintEl.textContent = I18N[lang].game.start;
    else if (gameOver) hintEl.textContent = I18N[lang].game.over;
    else hintEl.textContent = I18N[lang].game.hint;
  }

  function spawn() {
    const pool = PHASES[phaseIdx].icons;
    const name = pool[Math.floor(Math.random() * pool.length)];
    const heights = [GROUND_Y - 130, GROUND_Y - 205, GROUND_Y - 95];
    const y = heights[Math.floor(Math.random() * heights.length)];
    items.push({ x: W + 80, y, name, collected: false, missed: false });
  }

  function triggerJump() {
    if (!started) { reset(); updateHint(); return; }
    if (gameOver) { reset(); updateHint(); return; }
    if (!isJumping) { vY = JUMP_FORCE; isJumping = true; }
  }

  function update() {
    if (!playing) return;
    t++; legPhase += 0.4; speed += 0.0014;

    // phase transitions
    if (score >= 6 && phaseIdx === 0) { phaseIdx = 1; speed += 1.6; applyPhaseChrome(); }
    if (score >= 10 && phaseIdx === 1) { phaseIdx = 2; speed += 1.8; applyPhaseChrome(); }

    vY += GRAVITY; charY += vY;
    if (charY > 0) { charY = 0; vY = 0; isJumping = false; }

    roadMarkers.forEach(m => { m.x -= speed; if (m.x < -40) m.x = W + 40; });

    const spawnRate = Math.max(42, 92 - score * 3);
    if (t % Math.floor(spawnRate) === 0) spawn();

    items.forEach(item => {
      item.x -= speed;
      if (!item.collected && !item.missed) {
        const dx = Math.abs(item.x - CHAR_X);
        const dy = Math.abs(item.y - (GROUND_Y + charY - 60));
        if (dx < 58 && dy < 68) {
          item.collected = true; score++;
          for (let i = 0; i < 18; i++) {
            particles.push({ x: item.x, y: item.y, vx: (Math.random() - 0.5) * 14, vy: (Math.random() - 0.5) * 14, life: 1, s: Math.random() * 5 + 2 });
          }
          toasts.push({ text: `${I18N[lang].game.absorbed} ${item.name.replace("-", " ")}`, x: CHAR_X, y: item.y - 20, life: 40 });
        }
        if (item.x < -70) {
          item.missed = true; misses++;
          if (misses >= MAX_MISSES) {
            gameOver = true; playing = true;
            if (score > best) { best = score; localStorage.setItem("blaosk_mastery", String(best)); }
            updateHint();
          }
        }
      }
    });

    particles.forEach(p => { p.x += p.vx; p.y += p.vy; p.life -= 0.035; });
    toasts.forEach(tt => { tt.y -= 1.4; tt.life--; });
    items = items.filter(i => i.x > -150);
    particles = particles.filter(p => p.life > 0);
    toasts = toasts.filter(tt => tt.life > 0);

    scoreEl.textContent = score;
    bestEl.textContent = Math.max(best, score);
  }

  function drawGround() {
    const p = PHASES[phaseIdx];
    ctx.fillStyle = p.ground;
    ctx.fillRect(0, GROUND_Y, W, H - GROUND_Y);
    ctx.strokeStyle = p.ui;
    ctx.globalAlpha = 0.5;
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, GROUND_Y); ctx.lineTo(W, GROUND_Y); ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle = p.bg === "#0a0a0c" ? "#2c2a28" : "#c9c4b8";
    roadMarkers.forEach(m => ctx.fillRect(m.x, GROUND_Y + 16, m.w, 3));
  }

  function drawChar() {
    const p = PHASES[phaseIdx];
    ctx.save();
    ctx.translate(CHAR_X, GROUND_Y + charY);

    const hairFlick = isJumping ? -4 : Math.sin(t * 0.3) * 5;
    ctx.fillStyle = "#0c0a08";
    ctx.fillRect(-22 + hairFlick, -128, 24, 90);

    ctx.fillStyle = p.char;
    ctx.fillRect(-14, -88, 28, 62);

    ctx.fillStyle = "#e9c98a";
    ctx.fillRect(-9, -122, 26, 38);

    ctx.fillStyle = p.ui;
    ctx.shadowBlur = 8; ctx.shadowColor = p.ui;
    ctx.fillRect(7, -113, 5, 5);
    ctx.fillRect(18, -113, 5, 5);
    ctx.shadowBlur = 0;

    ctx.fillStyle = "#e9c98a";
    if (isJumping) { ctx.fillRect(9, -140, 11, 38); ctx.fillRect(-14, -100, 11, 30); }
    else { ctx.fillRect(13, -82, 11, 34); ctx.fillRect(-13, -82, 11, 34); }

    ctx.restore();
  }

  function drawIcons() {
    items.forEach(item => {
      if (item.collected) return;
      const img = images[item.name];
      ctx.save();
      ctx.translate(item.x, item.y);
      ctx.globalAlpha = item.missed ? 0.18 : 1;
      if (img && img.complete && img.naturalWidth) {
        const r = Math.min(ICON_SIZE / img.naturalWidth, ICON_SIZE / img.naturalHeight);
        const w = img.naturalWidth * r, h = img.naturalHeight * r;
        ctx.shadowBlur = 16; ctx.shadowColor = "rgba(201,162,74,0.45)";
        ctx.drawImage(img, -w / 2, -h / 2, w, h);
      } else {
        ctx.fillStyle = "#c9a24a";
        ctx.beginPath(); ctx.arc(0, 0, 20, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
    });
    ctx.globalAlpha = 1;
  }

  function drawParticles() {
    particles.forEach(p => {
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = "#c9a24a";
      ctx.fillRect(p.x, p.y, p.s, p.s);
    });
    ctx.globalAlpha = 1;
  }

  function drawToasts() {
    const p = PHASES[phaseIdx];
    ctx.font = "700 13px 'JetBrains Mono', monospace";
    ctx.textAlign = "left";
    toasts.forEach(tt => {
      ctx.globalAlpha = Math.max(0, tt.life / 40);
      ctx.fillStyle = p.ui;
      ctx.fillText(tt.text, tt.x + 24, tt.y);
    });
    ctx.globalAlpha = 1;
  }

  function drawOverlay() {
    if (started && !gameOver) return;
    ctx.fillStyle = "rgba(5,5,6,0.93)";
    ctx.fillRect(0, 0, W, H);
    ctx.textAlign = "center";
    ctx.fillStyle = "#c9a24a";
    ctx.font = "700 26px 'JetBrains Mono', monospace";
    ctx.fillText(gameOver ? I18N[lang].game.overTitle : I18N[lang].game.introTitle, W / 2, H / 2 - 26);
    ctx.font = "13px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#f2f1ed";
    ctx.fillText(
      gameOver ? `${I18N[lang].game.overBody} ${score}` : I18N[lang].game.introBody,
      W / 2, H / 2 + 8
    );
    ctx.fillStyle = "#c9a24a";
    ctx.font = "700 12px 'JetBrains Mono', monospace";
    ctx.fillText(I18N[lang].game.pressStart, W / 2, H / 2 + 74);
  }

  function drawLoading() {
    ctx.fillStyle = "#0a0a0c";
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#c9a24a";
    ctx.textAlign = "center";
    ctx.font = "700 14px 'JetBrains Mono', monospace";
    ctx.fillText(`LOADING… ${loaded}/${ALL_ICON_NAMES.length}`, W / 2, H / 2);
  }

  function draw() {
    if (!ready) { drawLoading(); return; }
    const p = PHASES[phaseIdx];
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = p.bg;
    ctx.fillRect(0, 0, W, H);
    drawGround();
    drawIcons();
    drawChar();
    drawParticles();
    drawToasts();
    drawOverlay();
  }

  function loop() {
    update();
    draw();
    rafId = requestAnimationFrame(loop);
  }

  function start(l) {
    lang = l || lang;
    score = 0; misses = 0; speed = 8.6; phaseIdx = 0; t = 0;
    items = []; particles = []; toasts = [];
    charY = 0; vY = 0; isJumping = false;
    started = false; playing = true; gameOver = false;
    applyPhaseChrome();
    updateHint();
    bestEl.textContent = best;
    if (rafId) cancelAnimationFrame(rafId);
    loop();
  }

  function stop() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
    if (panelEl) panelEl.style.background = "";
  }

  canvas.addEventListener("mousedown", triggerJump);
  canvas.addEventListener("touchstart", (e) => { e.preventDefault(); triggerJump(); }, { passive: false });
  document.addEventListener("keydown", (e) => {
    if ((e.code === "Space" || e.code === "ArrowUp") && document.getElementById("gameOverlay").classList.contains("is-open")) {
      e.preventDefault();
      triggerJump();
    }
  });

  window.BlaoskGame = { start, stop, setLang };
})();
