/* ==========================================================================
   Sidharthan ♥ Suma Bala — Engagement Invitation
   ALL EDITABLE CONTENT LIVES IN THE CONFIG OBJECT BELOW.
   (Also update <title> / meta tags in index.html if you change names/date.)
   ========================================================================== */
const CONFIG = {
  groom: { full: "Sidharthan Ravi", short: "Sidharthan" },
  bride: { full: "Yelloj Suma Bala", short: "Suma Bala" },
  eventName: "Engagement",

  // Date as YYYY-MM-DD. Leave `time` empty ("") for an all-day event, or use "HH:MM" (24h).
  date: "2026-11-29",
  time: "",
  tzOffset: "+05:30",          // India Standard Time
  durationHours: 3,            // used only when `time` is set

  venue: {
    name: "Hotel Suprabhat",
    cityShort: "Hyderabad",
    city: "Hyderabad, Telangana",
    mapUrl: "https://share.google/9fU66l1tvJ9D7ou3N"
  },

  hero: {
    eyebrow: "Together with our families",
    tagline: "We're getting engaged"
  },

  story: {
    place: "Hyderabad Airport",
    airportSign: "Rajiv Gandhi International Airport",
    burgerSign: "BURGER KING",   // generic sign text — swap for any name you like
    captions: [
      "Hyderabad Airport. A busy day… and one very happy burger. 🍔",
      "Suma Bala is enjoying her burger. Sidharthan is on a sneaky mission…",
      "Gasp! He swiped a french fry — and grinned. 🍟",
      "…and love took flight! ✈️"
    ]
  },

  flight: { number: "Lov-2911", departure: "11:00 AM", from: "Single", to: "Engaged", seat: "Together Forever" },

  // Put your own audio file here (mp3/ogg). If the file is missing, a soft built-in
  // synthesized melody plays instead. Music is OFF by default.
  music: { src: "assets/audio/music.mp3", volume: 0.5 },

  // WhatsApp number for RSVPs, digits only with country code (e.g. "919876543210").
  // Leave "" to let the guest choose a contact in WhatsApp.
  whatsappNumber: "",

  // Wishes shown when nobody has left one yet on this device.
  sampleWishes: [
    { name: "Amma", wish: "May your love stay warm like fresh fries ❤️" },
    { name: "Friends", wish: "Best meet-cute ever! Congratulations!" },
    { name: "Family", wish: "God bless you both 🙏" }
  ]
};

(function () {
  "use strict";

  /* ---------- helpers ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const ease = t => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
  const seg = (p, a, b) => ease(clamp((p - a) / (b - a)));
  const rand = (a, b) => a + Math.random() * (b - a);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const NS = "http://www.w3.org/2000/svg";

  const eventDate = new Date(`${CONFIG.date}T${CONFIG.time || "00:00"}:00${CONFIG.tzOffset}`);
  const [Y, M, D] = CONFIG.date.split("-").map(Number);
  const calDate = new Date(Y, M - 1, D); // local date for calendar display only
  const fmt = (o) => calDate.toLocaleDateString("en-IN", o);
  const derived = {
    dateLong: `${D} ${calDate.toLocaleDateString("en-GB", { month: "long" })} ${Y}`,
    dateShort: `${D} ${calDate.toLocaleDateString("en-GB", { month: "short" })} ${Y}`,
    monthYear: `${calDate.toLocaleDateString("en-GB", { month: "long" }).toUpperCase()} ${Y}`,
    dayNum: String(D),
    weekday: calDate.toLocaleDateString("en-GB", { weekday: "long" })
  };

  function hydrate() {
    $$("[data-bind]").forEach(el => {
      const path = el.dataset.bind;
      let v = derived[path];
      if (v === undefined) v = path.split(".").reduce((o, k) => (o ? o[k] : undefined), CONFIG);
      if (v !== undefined) el.textContent = v;
    });
    $("#navBtn").href = CONFIG.venue.mapUrl;
    $("#shareBtn").href = "https://wa.me/?text=" + encodeURIComponent(shareText());
  }

  function shareText() {
    return `💛 You're invited! 💛\n${CONFIG.groom.full} & ${CONFIG.bride.full}\n${CONFIG.eventName} · ${derived.dateLong}\n📍 ${CONFIG.venue.name}, ${CONFIG.venue.city}\n🗺️ ${CONFIG.venue.mapUrl}\n\nOpen the invitation: ${location.href.split("#")[0]}`;
  }

  /* ---------- SVG builders ---------- */
  function jasmineArc(cx, cy, r, a0, a1, n, size) {
    let s = "";
    for (let i = 0; i < n; i++) {
      const a = ((a0 + ((a1 - a0) * i) / (n - 1)) * Math.PI) / 180;
      const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
      s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${size}" fill="#fffdf5" stroke="#e9dfc4" stroke-width=".6"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1" fill="#f3d36b"/>`;
    }
    return s;
  }

  const face = (kind) => `
    <g class="face">
      <g class="eyes">
        <ellipse cx="85" cy="90" rx="7.6" ry="9.6" fill="#2a1210"/><circle cx="82.6" cy="86.4" r="3.1" fill="#fff"/><circle cx="87.4" cy="93" r="1.5" fill="#fff" opacity=".85"/>
        <ellipse cx="115" cy="90" rx="7.6" ry="9.6" fill="#2a1210"/><circle cx="112.6" cy="86.4" r="3.1" fill="#fff"/><circle cx="117.4" cy="93" r="1.5" fill="#fff" opacity=".85"/>
      </g>
      <g class="lash" stroke="#2a1210" stroke-width="2" stroke-linecap="round" fill="none">
        ${kind === "bride" ? '<path d="M76 84q-3-2-4-5M124 84q3-2 4-5"/>' : ""}
      </g>
      <path class="brow" d="M76 74q8-6 17-1M107 73q9-5 17 1" stroke="${kind === "bride" ? "#2a1210" : "#1d0d09"}" stroke-width="${kind === "bride" ? 2.4 : 3.4}" stroke-linecap="round" fill="none"/>
      <path d="M98 99q2 2.500 4 0" stroke="#b86a45" stroke-width="1.8" stroke-linecap="round" fill="none"/>
      <ellipse class="blush" cx="72" cy="101" rx="9" ry="5.500" fill="#ff5f78"/><ellipse class="blush" cx="128" cy="101" rx="9" ry="5.500" fill="#ff5f78"/>
      <path class="m-smile" d="M90 107q10 9 20 0" stroke="#9e2b1c" stroke-width="2.800" stroke-linecap="round" fill="none"/>
      <path class="m-grin" d="M89 105q11 17 22 0Z" fill="#7a1a1a" stroke="#7a1a1a" stroke-width="2" stroke-linejoin="round"/><path class="m-grin" d="M94 113q6 4 12 0 -3-3-6-3t-6 3Z" fill="#ff7b8a"/>
      <ellipse class="m-shock" cx="100" cy="111" rx="5" ry="7" fill="#7a1a1a"/>
    </g>`;

  function characterSVG(kind) {
    const bride = kind === "bride";
    const label = bride ? CONFIG.bride.full : CONFIG.groom.full;
    const desc = bride
      ? "in a maroon Kanjeevaram silk saree with gold zari, jasmine flowers and temple jewellery"
      : "in a cream veshti and kurta with a gold-bordered angavastram";
    let body;
    if (bride) {
      body = `
        <path class="braid" d="M126 96C160 128 156 200 140 258 136 270 120 268 122 256 128 206 128 150 108 118Z" fill="url(#gHair)"/>
        <g><circle cx="146" cy="160" r="4" fill="#fffdf5"/><circle cx="148" cy="176" r="4" fill="#fffdf5"/><circle cx="147" cy="192" r="4" fill="#fffdf5"/><circle cx="144" cy="208" r="4" fill="#fffdf5"/><circle cx="140" cy="224" r="4" fill="#fffdf5"/><circle cx="136" cy="240" r="4" fill="#fffdf5"/></g>
        <path d="M62 160C46 222 34 290 32 324 32 331 38 334 46 334H154C162 334 168 331 168 324 166 290 154 222 138 160Z" fill="url(#gSaree)"/>
        <path d="M70 176C66 230 60 280 56 330M86 176C84 230 82 282 82 332M100 176V334M114 176C116 230 118 282 118 332M130 176C134 230 140 280 144 330" stroke="#3d0716" stroke-opacity=".28" stroke-width="2" fill="none"/>
        <g fill="url(#gGold)"><circle cx="58" cy="250" r="3"/><circle cx="92" cy="268" r="3"/><circle cx="126" cy="252" r="3"/><circle cx="76" cy="290" r="3"/><circle cx="110" cy="294" r="3"/><circle cx="142" cy="286" r="3"/><circle cx="50" cy="212" r="3"/><circle cx="148" cy="214" r="3"/></g>
        <path d="M34 308H166L168 324C168 331 162 334 154 334H46C38 334 32 331 32 324Z" fill="url(#gGold)"/>
        <path d="M34 316H166" stroke="#0f7a58" stroke-width="5"/>
        <path d="M68 130C64 150 64 172 70 188H130C136 172 136 150 132 130Z" fill="url(#gEmerald)"/>
        <path d="M74 126 96 132 152 214C154 244 146 266 138 274L116 264C124 242 122 222 108 198Z" fill="url(#gSaree)" stroke="url(#gGold)" stroke-width="4" stroke-linejoin="round"/>
        <rect x="91" y="116" width="18" height="22" rx="8" fill="url(#gSkin)"/>
        <g class="arm arm-l"><path d="M70 136C58 150 52 176 52 202" stroke="url(#gEmerald)" stroke-width="15" stroke-linecap="round" fill="none"/><path d="M53 190 52 206" stroke="url(#gSkin)" stroke-width="12" stroke-linecap="round"/><circle cx="52" cy="210" r="8" fill="url(#gSkin)"/><path d="M45 196h14M45 201h14" stroke="url(#gGold)" stroke-width="3"/></g>
        <g class="arm arm-r"><path d="M130 136C142 150 148 176 148 202" stroke="url(#gEmerald)" stroke-width="15" stroke-linecap="round" fill="none"/><path d="M147 190 148 206" stroke="url(#gSkin)" stroke-width="12" stroke-linecap="round"/><circle cx="148" cy="210" r="8" fill="url(#gSkin)"/><path d="M141 196h14M141 201h14" stroke="url(#gGold)" stroke-width="3"/></g>
        <path d="M78 134Q100 172 122 134" stroke="url(#gGold)" stroke-width="4" fill="none" stroke-linecap="round"/>
        <path d="M82 142Q100 184 118 142" stroke="url(#gGold)" stroke-width="3" fill="none" stroke-linecap="round"/>
        <g><circle cx="100" cy="162" r="4.500" fill="#d3253f" stroke="url(#gGold)" stroke-width="1.500"/><circle cx="89" cy="150" r="2.800" fill="#1ea37a"/><circle cx="111" cy="150" r="2.800" fill="#1ea37a"/></g>
        <ellipse cx="100" cy="82" rx="46" ry="44" fill="url(#gHair)"/>
        <g><path d="M57 92q-6 2-4 9t8 4" fill="url(#gSkin)"/><path d="M143 92q6 2 4 9t-8 4" fill="url(#gSkin)"/></g>
        <circle cx="100" cy="86" r="42" fill="url(#gSkin)"/>
        <path d="M58 84C54 48 80 38 100 38S146 48 142 84C134 64 118 56 100 56S66 64 58 84Z" fill="url(#gHair)"/>
        <path d="M80 44Q70 54 60 72" stroke="#fff" stroke-opacity=".28" stroke-width="4" stroke-linecap="round" fill="none"/>
        <g>${jasmineArc(100, 86, 45, 196, 344, 9, 4.6)}</g>
        <path d="M100 56V64" stroke="url(#gGold)" stroke-width="2"/><circle cx="100" cy="68" r="3.600" fill="#d3253f" stroke="url(#gGold)" stroke-width="1.300"/>
        <g fill="url(#gGold)"><circle cx="57" cy="105" r="3.600"/><path d="M53 108h8l-1 8h-6Z"/><circle cx="143" cy="105" r="3.600"/><path d="M139 108h8l-1 8h-6Z"/></g>
        ${face("bride")}
        <ellipse cx="68" cy="122" rx="5" ry="3" fill="#fff" opacity="0"/>`;
    } else {
      body = `
        <path d="M70 212C60 250 54 290 52 322H148C146 290 140 250 130 212Z" fill="url(#gKurta)"/>
        <path d="M80 220C78 260 76 300 74 322M96 226V322M112 224C114 262 118 300 120 322M126 220C130 260 134 300 136 322" stroke="#b79a5a" stroke-opacity=".35" stroke-width="2" fill="none"/>
        <path d="M52 304H148L149 324H51Z" fill="url(#gGold)"/><path d="M52 311H148" stroke="#8c1a33" stroke-width="3.500"/>
        <path d="M56 130C50 170 52 206 58 232H142C148 206 150 170 144 130Z" fill="url(#gKurta)"/>
        <path d="M100 122V176" stroke="#c9ad6a" stroke-width="2" stroke-linecap="round"/><circle cx="100" cy="146" r="2.200" fill="url(#gGold)"/><circle cx="100" cy="160" r="2.200" fill="url(#gGold)"/>
        <path d="M60 232H140" stroke="url(#gGold)" stroke-width="5"/>
        <g class="feet"><ellipse cx="78" cy="330" rx="16" ry="6" fill="#7a4a2a"/><ellipse cx="122" cy="330" rx="16" ry="6" fill="#7a4a2a"/></g>
        <rect x="91" y="116" width="18" height="22" rx="8" fill="url(#gSkin)"/>
        <g class="arm arm-l"><path d="M64 138C52 152 48 178 48 204" stroke="url(#gKurta)" stroke-width="17" stroke-linecap="round" fill="none"/><path d="M48 196V212" stroke="url(#gSkin)" stroke-width="12" stroke-linecap="round"/><circle cx="48" cy="214" r="8.500" fill="url(#gSkin)"/></g>
        <g class="arm arm-r"><path d="M136 138C148 152 152 178 152 204" stroke="url(#gKurta)" stroke-width="17" stroke-linecap="round" fill="none"/><path d="M152 196V212" stroke="url(#gSkin)" stroke-width="12" stroke-linecap="round"/><circle cx="152" cy="214" r="8.500" fill="url(#gSkin)"/></g>
        <path d="M60 128 82 124 148 232 142 252 122 246Z" fill="#fffaf0" stroke="url(#gGold)" stroke-width="3" stroke-linejoin="round"/>
        <path d="M66 130 84 128 142 232" stroke="#8c1a33" stroke-width="3" fill="none"/>
        <path d="M122 246 142 252 150 286 128 280Z" fill="#fffaf0" stroke="url(#gGold)" stroke-width="3" stroke-linejoin="round"/>
        <g stroke="url(#gGold)" stroke-width="2"><path d="M132 258l12 4M130 266l14 4M129 274l14 4"/></g>
        <ellipse cx="100" cy="80" rx="45" ry="42" fill="url(#gHair)"/>
        <path d="M58 94q-6 2-4 9t8 4" fill="url(#gSkin)"/><path d="M142 94q6 2 4 9t-8 4" fill="url(#gSkin)"/>
        <circle cx="100" cy="86" r="42" fill="url(#gSkin)"/>
        <path d="M56 84C50 44 78 32 104 34S152 48 144 84C142 66 134 56 116 52 100 58 78 56 68 62 60 70 58 78 56 84Z" fill="url(#gHair)"/>
        <path d="M84 40C74 44 64 54 60 68" stroke="#fff" stroke-opacity=".25" stroke-width="4" stroke-linecap="round" fill="none"/>
        <rect x="96" y="62" width="8" height="2.800" rx="1.400" fill="#e8e0d0"/><circle cx="100" cy="72" r="2.600" fill="#c9213f"/>
        ${face("groom")}
        <path d="M91 101q9-3 18 0" stroke="#1d0d09" stroke-width="2.600" stroke-linecap="round" fill="none" opacity=".85"/>`;
    }
    return `<svg class="char ${kind}" viewBox="0 0 200 340" role="img" aria-label="Illustration of ${label} ${desc}">
      <ellipse class="shadow" cx="100" cy="334" rx="64" ry="7" fill="rgba(60,10,20,.3)"/>
      <g class="body">${body}</g></svg>`;
  }

  function mountCharacters() {
    $$("[data-char]").forEach(el => {
      el.innerHTML = characterSVG(el.dataset.char);
      el.classList.add("char-box");
      setMood(el.firstElementChild, el.dataset.mood || "smile");
    });
  }
  function setMood(svg, mood) {
    svg.classList.remove("mood-smile", "mood-grin", "mood-shock");
    svg.classList.add("mood-" + mood);
  }

  function diyaSVG() {
    return `<svg viewBox="0 0 70 70" aria-hidden="true">
      <circle class="glow" cx="35" cy="26" r="30" fill="url(#gGlow)"/>
      <path class="flame" d="M35 6C45 18 46 30 35 33 24 30 25 18 35 6Z" fill="#ffb02e"/>
      <path class="flame inner" d="M35 16C40 23 40 29 35 31 30 29 30 23 35 16Z" fill="#fff4b8"/>
      <rect x="33.600" y="30" width="2.800" height="6" rx="1.400" fill="#4a2a12"/>
      <path d="M6 38C8 58 62 58 64 38Z" fill="url(#gBrass)"/>
      <ellipse cx="35" cy="38" rx="29" ry="6" fill="#b57c1c"/><ellipse cx="35" cy="37" rx="24" ry="3.800" fill="#5b3510"/>
      <path d="M16 46C24 54 38 55 46 52" stroke="#fff" stroke-opacity=".5" stroke-width="2.500" stroke-linecap="round" fill="none"/>
      <path d="M26 56H44L47 66H23Z" fill="url(#gBrass)"/></svg>`;
  }

  function garlandSVG(kind) {
    const W = 400, H = 84;
    let out = "";
    const color = i => {
      if (kind === "jasmine") return i % 5 === 0 ? "#fff7d6" : "#fffdf5";
      if (kind === "mixed") return i % 3 === 0 ? "#fffdf5" : i % 3 === 1 ? "url(#gMari)" : "#f6b21e";
      return i % 2 ? "url(#gMari)" : "#f6b21e";
    };
    let k = 0;
    for (let s = 0; s < 2; s++) {
      for (let i = 0; i <= 20; i++) {
        const u = i / 20, x = s * 200 + u * 200, y = 6 + 38 * 4 * u * (1 - u);
        out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="7.200" fill="${color(k)}" stroke="rgba(120,50,0,.25)" stroke-width=".8"/><circle cx="${(x - 1.5).toFixed(1)}" cy="${(y - 1.8).toFixed(1)}" r="2" fill="#fff" opacity=".4"/>`;
        k++;
      }
    }
    [0.5, 0.25, 0.75].forEach((p, idx) => {
      const x = p * W, y0 = idx === 0 ? 8 : 6 + 38 * 4 * ((p * 2) % 1) * (1 - ((p * 2) % 1));
      const len = idx === 0 ? 5 : 3;
      for (let j = 1; j <= len; j++) out += `<circle cx="${x}" cy="${(y0 + j * 11).toFixed(1)}" r="6.400" fill="${color(k++)}" stroke="rgba(120,50,0,.25)" stroke-width=".8"/>`;
      out += `<path d="M${x} ${(y0 + (len + 1) * 11 - 4).toFixed(1)}l-4 9 4 3 4-3z" fill="url(#gGold)"/>`;
    });
    return `<svg viewBox="0 0 ${W} ${H + 20}" preserveAspectRatio="xMidYMin slice" aria-hidden="true"><g class="swing">${out}</g></svg>`;
  }

  function mountDecor() {
    $$("[data-diya]").forEach(el => { el.innerHTML = diyaSVG(); el.classList.add("diya", "lit"); });
    const gCount = Math.max(1, Math.ceil(innerWidth / 460));
    $$("[data-garland]").forEach(el => { el.innerHTML = garlandSVG(el.dataset.garland).repeat(gCount); });
    $$("[data-sparkles]").forEach(el => {
      const n = +el.dataset.sparkles;
      for (let i = 0; i < n; i++) {
        const s = document.createElement("i");
        s.style.cssText = `left:${rand(0, 100).toFixed(1)}%;top:${rand(0, 100).toFixed(1)}%;--s:${rand(0.5, 1.3).toFixed(2)};animation-delay:${rand(0, 4).toFixed(2)}s;animation-duration:${rand(2.4, 5).toFixed(2)}s`;
        el.appendChild(s);
      }
    });
    // falling petals (hero + story)
    const mkRain = (host, n) => {
      if (!host || reduce) return;
      for (let i = 0; i < n; i++) {
        const p = document.createElement("i");
        p.className = "petal fall " + ["", "o", "y", "w"][i % 4];
        p.style.cssText = `left:${rand(-5, 100).toFixed(1)}%;--drift:${rand(-60, 80).toFixed(0)}px;--rot:${rand(180, 560).toFixed(0)}deg;--sz:${rand(0.7, 1.4).toFixed(2)};animation-duration:${rand(7, 14).toFixed(1)}s;animation-delay:${(-rand(0, 14)).toFixed(1)}s`;
        host.appendChild(p);
      }
    };
    mkRain($("#petalRain"), 20);
    mkRain($("#storyPetals"), 10);

    // kolam-style hearts for the footer loop
    const fh = $("#footHearts");
    for (let i = 0; i < 9; i++) {
      const h = document.createElement("i");
      h.textContent = "♥";
      h.style.cssText = `left:${rand(8, 92).toFixed(0)}%;animation-delay:${(-rand(0, 8)).toFixed(1)}s;animation-duration:${rand(5, 9).toFixed(1)}s;font-size:${rand(12, 24).toFixed(0)}px`;
      fh.appendChild(h);
    }

    // barcode
    const bc = $("#barcode");
    let x = 4, seed = 2911;
    while (x < 156) {
      seed = (seed * 9301 + 49297) % 233280;
      const w = 1 + (seed % 4);
      if ((seed >> 3) % 3) bc.insertAdjacentHTML("beforeend", `<rect x="${x}" y="2" width="${w}" height="42" fill="#3b0d17"/>`);
      x += w + 1.6;
    }
  }

  /* ---------- parallax + scroll engine ---------- */
  const view = { w: innerWidth, h: innerHeight };
  const shiftTarget = { x: 0, y: 0 }, shiftNow = { x: 0, y: 0 };
  const inputs = { dragX: 0, tiltX: 0, tiltY: 0, hoverX: 0, hoverY: 0 };
  let ticking = false;

  const scenes = [];
  function setupScenes() {
    $$("[data-scene]").forEach(sec => registerScene(sec, false));
    const pin = $(".story-pin");
    registerScene($("#story"), true);
    function registerScene(sec, pinned) {
      const layers = $$(".layer", sec).map(l => {
        const inner = document.createElement("div");
        inner.className = "shift";
        while (l.firstChild) inner.appendChild(l.firstChild);
        l.appendChild(inner);
        const b = parseFloat(l.dataset.blur || 0);
        if (b) inner.style.filter = `blur(${b}px)`;
        return { el: l, shift: inner, d: parseFloat(l.dataset.depth || 1), pan: l.hasAttribute("data-pan") };
      });
      scenes.push({ sec, layers, pinned, visible: false, p: 0 });
    }
  }

  const io = "IntersectionObserver" in window ? new IntersectionObserver(es => {
    es.forEach(e => { const s = scenes.find(s => s.sec === e.target); if (s) { s.visible = e.isIntersecting; if (e.isIntersecting) requestTick(); } });
  }, { rootMargin: "20% 0px" }) : null;

  function requestTick() { if (!ticking) { ticking = true; requestAnimationFrame(tick); } }

  const story = {};
  function setupStory() {
    story.sec = $("#story"); story.track = $(".story-track", story.sec);
    story.stage = $("#storyStage"); story.suma = $("#sumaWrap"); story.sid = $("#sidWrap");
    story.fry = $("#fry"); story.bang = $("#bang"); story.plane = $("#storyPlane");
    story.sumaSvg = $("#sumaChar").firstElementChild; story.sidSvg = $("#sidChar").firstElementChild;
    story.cap = $("#caption"); story.card = $("#captionCard"); story.bar = $("#storyBar");
    story.over = $(".sunset-over"); story.burger = $("#burger");
    story.capIdx = -1; story.sumaMood = ""; story.sidMood = "";
    story.height = story.track.offsetHeight;
  }

  function updateStory(p) {
    const W = story.stage.clientWidth, H = story.stage.clientHeight;
    // Suma walks in, Sidharthan sneaks in
    const eS = seg(p, 0.03, 0.2), eD = seg(p, 0.26, 0.5);
    const walkS = eS > 0 && eS < 1, walkD = eD > 0 && eD < 1;
    const bobS = walkS ? Math.abs(Math.sin(p * 120)) * -7 : 0, bobD = walkD ? Math.abs(Math.sin(p * 120)) * -7 : 0;
    story.suma.style.transform = `translate3d(${(-(1 - eS) * 260).toFixed(1)}%,${bobS.toFixed(1)}px,0)`;
    story.sid.style.transform = `translate3d(${((1 - eD) * 260).toFixed(1)}%,${bobD.toFixed(1)}px,0)`;
    story.suma.style.opacity = eS > 0 ? 1 : 0;
    story.sid.style.opacity = eD > 0 ? 1 : 0;
    // the stolen fry: from tray -> Sidharthan's hand -> his mouth
    const sw = seg(p, 0.55, 0.68), mouth = seg(p, 0.68, 0.78);
    const fx = sw * W * 0.1, fy = -sw * H * 0.14 - Math.sin(sw * Math.PI) * 24 - mouth * H * 0.24;
    const reach = p > 0.5 && p < 0.72;
    if (reach !== story.reach) { story.sidSvg.classList.toggle("reaching", reach); story.reach = reach; }
    const fvis = p > 0.55 && p < 0.79 ? 1 : 0;
    story.fry.style.opacity = fvis;
    story.fry.style.transform = `translate3d(${fx.toFixed(1)}px,${fy.toFixed(1)}px,0) rotate(${(sw * 40 - mouth * 30).toFixed(1)}deg) scale(${(1 - mouth * 0.4).toFixed(2)})`;
    // gasp and grin
    const gasp = p > 0.6 && p < 0.8;
    const sm = gasp ? "shock" : p >= 0.8 ? "grin" : "smile";
    if (sm !== story.sumaMood) { setMood(story.sumaSvg, sm); story.sumaMood = sm; }
    const dm = p > 0.62 ? "grin" : "smile";
    if (dm !== story.sidMood) { setMood(story.sidSvg, dm); story.sidMood = dm; }
    story.bang.style.opacity = gasp ? 1 : 0;
    story.bang.style.transform = `translate3d(0,${gasp ? 0 : 10}px,0) scale(${gasp ? 1 : 0.4})`;
    story.burger.classList.toggle("eat", p > 0.18 && p < 0.6);
    // sunset
    story.over.style.opacity = seg(p, 0.5, 1).toFixed(3);
    // airplane takes off
    const pl = clamp((p - 0.74) / 0.26), pe = pl * pl * (3 - 2 * pl);
    const vis = p > 0.7 ? 1 : 0;
    const x = lerp(-10, 110, pe) , y = -Math.pow(pl, 2.2) * 62;
    story.plane.style.opacity = vis ? (1 - seg(p, 0.96, 1)).toFixed(2) : 0;
    story.plane.style.transform = `translate3d(${(x / 100 * view.w).toFixed(1)}px,${(y / 100 * view.h).toFixed(1)}px,0) rotate(${(-Math.pow(pl, 1.4) * 24).toFixed(1)}deg) scale(${lerp(1.1, 0.7, pl).toFixed(2)})`;
    // captions
    const idx = p < 0.25 ? 0 : p < 0.55 ? 1 : p < 0.76 ? 2 : 3;
    if (idx !== story.capIdx) {
      story.capIdx = idx;
      story.card.classList.remove("show");
      setTimeout(() => { story.cap.textContent = CONFIG.story.captions[idx] || ""; story.card.classList.add("show"); }, reduce ? 0 : 160);
    }
    story.bar.style.transform = `scaleX(${p.toFixed(3)})`;
  }

  let sPrev = -1;
  function tick() {
    ticking = false;
    view.w = innerWidth; view.h = innerHeight;
    const K = 150;
    let needMore = false;

    scenes.forEach(s => {
      if (!s.visible) return;
      const r = s.sec.getBoundingClientRect();
      let p;
      if (s.pinned) {
        const total = r.height - view.h;
        p = clamp(-r.top / total);
        if (Math.abs(p - sPrev) > 0.0004) { updateStory(p); sPrev = p; }
      } else {
        p = clamp((view.h - r.top) / (view.h + r.height));
      }
      s.p = p;
      if (reduce) return;
      s.layers.forEach(l => {
        if (s.pinned && !l.pan) return;
        const dy = s.pinned ? 0 : (p - 0.5) * (1 - l.d) * K;
        const dx = s.pinned ? (0.5 - p) * (l.d - 0.7) * 70 : 0;
        const sc = 1 + (l.d - 0.7) * (p - 0.5) * 0.06;
        l.el.style.transform = `translate3d(${dx.toFixed(1)}px,${dy.toFixed(1)}px,0) scale(${sc.toFixed(4)})`;
      });
    });

    // pointer / touch / tilt shift (smoothed)
    shiftTarget.x = clamp(inputs.dragX + inputs.tiltX + inputs.hoverX, -1, 1);
    shiftTarget.y = clamp(inputs.tiltY + inputs.hoverY, -1, 1);
    shiftNow.x = lerp(shiftNow.x, shiftTarget.x, 0.12);
    shiftNow.y = lerp(shiftNow.y, shiftTarget.y, 0.12);
    const moving = Math.abs(shiftNow.x - shiftTarget.x) > 0.002 || Math.abs(shiftNow.y - shiftTarget.y) > 0.002;
    if (!reduce) {
      scenes.forEach(s => {
        if (!s.visible) return;
        s.layers.forEach(l => {
          const k = l.d - 0.55;
          l.shift.style.transform = `translate3d(${(shiftNow.x * k * -26).toFixed(1)}px,${(shiftNow.y * k * -14).toFixed(1)}px,0)`;
        });
      });
    }
    if (moving) needMore = true;
    if (needMore) requestTick();
  }

  function setupInputs() {
    addEventListener("scroll", requestTick, { passive: true });
    addEventListener("resize", () => { story.height = story.track.offsetHeight; sPrev = -1; requestTick(); });
    if (reduce) return;
    let startX = null;
    addEventListener("pointerdown", e => { if (e.pointerType === "touch" || e.pointerType === "pen") startX = e.clientX; }, { passive: true });
    addEventListener("pointermove", e => {
      if (e.pointerType === "mouse") {
        inputs.hoverX = (e.clientX / view.w - 0.5) * 1.2; inputs.hoverY = (e.clientY / view.h - 0.5) * 1.2; requestTick();
      } else if (startX !== null) {
        inputs.dragX = clamp((e.clientX - startX) / (view.w * 0.4), -1, 1); requestTick();
      }
    }, { passive: true });
    const end = () => { startX = null; inputs.dragX = 0; requestTick(); };
    addEventListener("pointerup", end, { passive: true });
    addEventListener("pointercancel", end, { passive: true });
  }

  /* ---------- reveal on scroll ---------- */
  function setupReveal() {
    const els = $$(".reveal");
    if (!("IntersectionObserver" in window) || reduce) { els.forEach(e => e.classList.add("in")); flipCalendar(); return; }
    const o = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); o.unobserve(e.target); if (e.target.id === "calendar") flipCalendar(); }
    }), { threshold: 0.18 });
    els.forEach((e, i) => { e.style.transitionDelay = `${(i % 4) * 70}ms`; o.observe(e); });
  }

  /* ---------- calendar + countdown ---------- */
  function buildCalendar() {
    const grid = $("#calGrid");
    const first = new Date(Y, M - 1, 1).getDay();
    const days = new Date(Y, M, 0).getDate();
    let h = ["S", "M", "T", "W", "T", "F", "S"].map(d => `<b>${d}</b>`).join("");
    for (let i = 0; i < first; i++) h += "<span></span>";
    for (let d = 1; d <= days; d++) h += d === D ? `<span class="hit"><em>${d}</em></span>` : `<span>${d}</span>`;
    grid.innerHTML = h;
  }
  function flipCalendar() { setTimeout(() => $("#calendar").classList.add("flipped"), 450); }

  function countdown() {
    const ids = ["cdD", "cdH", "cdM", "cdS"].map(i => $("#" + i));
    const last = ["", "", "", ""];
    const pad = n => String(n).padStart(2, "0");
    function upd() {
      let t = Math.floor((eventDate - Date.now()) / 1000);
      if (t <= 0) {
        $("#countdown").hidden = true; const d = $("#cdDone"); d.hidden = false;
        d.textContent = "The celebration is here! 🎉"; return;
      }
      const v = [Math.floor(t / 86400), Math.floor((t % 86400) / 3600), Math.floor((t % 3600) / 60), t % 60].map(pad);
      v.forEach((x, i) => {
        if (x !== last[i]) {
          ids[i].textContent = x; last[i] = x;
          if (!reduce && i === 3) { ids[i].classList.remove("tick"); void ids[i].offsetWidth; ids[i].classList.add("tick"); }
        }
      });
    }
    upd(); setInterval(upd, 1000);
  }

  /* ---------- venue: flight path, ics ---------- */
  function setupFlight() {
    const path = $("#flightPath"), plane = $("#flightPlane"), host = $(".flight");
    const len = path.getTotalLength();
    function upd() {
      const r = host.getBoundingClientRect();
      let p = clamp((view.h * 0.85 - r.top) / (view.h * 0.6 + r.height * 0.2));
      if (reduce) p = 1;
      const e = ease(p);
      const a = path.getPointAtLength(e * len), b = path.getPointAtLength(Math.min(len, e * len + 2));
      const ang = Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
      plane.style.transform = `translate(${a.x}px,${a.y}px) rotate(${ang}deg)`;
      host.classList.toggle("arrived", p > 0.97);
    }
    addEventListener("scroll", () => requestAnimationFrame(upd), { passive: true });
    upd();
  }

  function icsEscape(s) { return String(s).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n"); }
  function downloadICS() {
    const stamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const utc = d => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    let start, end;
    if (CONFIG.time) {
      const e = new Date(eventDate.getTime() + CONFIG.durationHours * 3600000);
      start = `DTSTART:${utc(eventDate)}`; end = `DTEND:${utc(e)}`;
    } else {
      const next = new Date(Date.UTC(Y, M - 1, D + 1)); const nd = next.toISOString().slice(0, 10).replace(/-/g, "");
      start = `DTSTART;VALUE=DATE:${CONFIG.date.replace(/-/g, "")}`; end = `DTEND;VALUE=DATE:${nd}`;
    }
    const lines = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Engagement Invitation//EN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH",
      "BEGIN:VEVENT", `UID:engagement-${CONFIG.date}@invitation`, `DTSTAMP:${stamp}`, start, end,
      `SUMMARY:${icsEscape(`${CONFIG.groom.short} & ${CONFIG.bride.short} — ${CONFIG.eventName}`)}`,
      `LOCATION:${icsEscape(`${CONFIG.venue.name}, ${CONFIG.venue.city}`)}`,
      `DESCRIPTION:${icsEscape(`Join us to celebrate the engagement of ${CONFIG.groom.full} and ${CONFIG.bride.full}.\nMap: ${CONFIG.venue.mapUrl}`)}`,
      `URL:${CONFIG.venue.mapUrl}`,
      "BEGIN:VALARM", "TRIGGER:-P1D", "ACTION:DISPLAY", "DESCRIPTION:Engagement tomorrow!", "END:VALARM",
      "END:VEVENT", "END:VCALENDAR"
    ];
    const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "engagement-invitation.ics"; document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 1500);
    toast("📅 Calendar file ready — open it to save the date!");
  }

  /* ---------- FX: petals, hearts, toast ---------- */
  const fx = $("#fx");
  let live = 0;
  function burst(x, y, n = 16) {
    if (reduce) n = Math.min(n, 6);
    for (let i = 0; i < n && live < 90; i++) {
      const p = document.createElement("i");
      p.className = "petal " + ["", "o", "y", "w", "r"][i % 5];
      p.style.left = x + "px"; p.style.top = y + "px"; p.style.setProperty("--sz", rand(0.8, 1.5).toFixed(2));
      fx.appendChild(p); live++;
      const a = rand(0, Math.PI * 2), d = rand(40, 130), dx = Math.cos(a) * d, dy = Math.sin(a) * d - 40;
      const a2 = p.animate([
        { transform: "translate3d(0,0,0) rotate(0) scale(.3)", opacity: 1 },
        { transform: `translate3d(${dx}px,${dy}px,0) rotate(${rand(90, 300)}deg) scale(1)`, opacity: 1, offset: 0.4 },
        { transform: `translate3d(${dx * 1.3}px,${dy + rand(140, 260)}px,0) rotate(${rand(300, 700)}deg) scale(.9)`, opacity: 0 }
      ], { duration: rand(1100, 1900), easing: "cubic-bezier(.2,.7,.3,1)" });
      a2.onfinish = () => { p.remove(); live--; };
    }
  }
  function heartPop(x, y, ch = "♥") {
    const h = document.createElement("i");
    h.className = "heart-pop"; h.textContent = ch; h.style.left = x + "px"; h.style.top = y + "px";
    fx.appendChild(h);
    h.animate([
      { transform: "translate3d(-50%,0,0) scale(.2)", opacity: 0 },
      { transform: "translate3d(-50%,-24px,0) scale(1.3)", opacity: 1, offset: 0.35 },
      { transform: "translate3d(-50%,-80px,0) scale(1)", opacity: 0 }
    ], { duration: 1100, easing: "ease-out" }).onfinish = () => h.remove();
  }
  let toastT;
  function toast(msg) {
    const t = $("#toast"); t.textContent = msg; t.classList.add("on");
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("on"), 3200);
  }

  /* ---------- interactions ---------- */
  function setupInteractions() {
    // tap anywhere -> marigold petals
    let lastB = 0;
    document.addEventListener("click", e => {
      if (e.target.closest("a,button,input,textarea,select,label,[data-react],.ctl")) return;
      const now = performance.now(); if (now - lastB < 90) return; lastB = now;
      burst(e.clientX, e.clientY, 14);
    }, { passive: true });

    // tap the couple -> blush / wave / heart
    $$("[data-react]").forEach(host => {
      host.addEventListener("click", e => {
        const svg = e.target.closest(".char"); if (!svg) return;
        const n = (+svg.dataset.n || 0); svg.dataset.n = n + 1;
        const r = svg.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height * 0.25;
        const kind = n % 3;
        if (kind === 0) { svg.classList.add("do-blush"); setTimeout(() => svg.classList.remove("do-blush"), 2200); heartPop(cx, cy, "💗"); }
        else if (kind === 1) { svg.classList.add("do-wave"); setTimeout(() => svg.classList.remove("do-wave"), 2400); }
        else { burst(cx, cy, 8); heartPop(cx - 14, cy, "♥"); heartPop(cx + 16, cy - 10, "💖"); }
      });
    });

    // diyas
    const row = $("#diyaRow"); let lit = 0;
    for (let i = 1; i <= 5; i++) {
      const b = document.createElement("button");
      b.type = "button"; b.className = "diya"; b.setAttribute("aria-pressed", "false"); b.setAttribute("aria-label", `Light diya ${i}`);
      b.innerHTML = diyaSVG(); row.appendChild(b);
      b.addEventListener("click", () => {
        const on = b.classList.toggle("lit"); b.setAttribute("aria-pressed", on);
        lit += on ? 1 : -1; $("#diyaMsg").textContent = `${lit} of 5 diyas lit`;
        $("#moments").classList.toggle("all-lit", lit === 5);
        if (lit === 5 && on) { const r = row.getBoundingClientRect(); burst(r.left + r.width / 2, r.top, 22); toast("🪔 All diyas lit — blessings glow bright!"); }
      });
    }

    // stolen fry easter egg
    let stolen = 0;
    $("#friesBtn").addEventListener("click", () => {
      const btn = $("#friesBtn").getBoundingClientRect();
      const groom = $("#momentsCouple .groom").getBoundingClientRect();
      const bride = $("#momentsCouple .bride");
      const f = document.createElement("i"); f.className = "stolen-fry";
      f.style.left = btn.left + btn.width / 2 + "px"; f.style.top = btn.top + 10 + "px"; fx.appendChild(f);
      const dx = groom.left + groom.width * 0.5 - (btn.left + btn.width / 2), dy = groom.top + groom.height * 0.35 - (btn.top + 10);
      f.animate([
        { transform: "translate3d(0,0,0) rotate(0)", opacity: 1 },
        { transform: `translate3d(${dx * 0.5}px,${dy * 0.5 - 60}px,0) rotate(200deg)`, opacity: 1, offset: 0.55 },
        { transform: `translate3d(${dx}px,${dy}px,0) rotate(360deg) scale(.5)`, opacity: 0 }
      ], { duration: 900, easing: "ease-in-out" }).onfinish = () => {
        f.remove(); stolen++;
        const gs = $("#momentsCouple .groom"), bs = bride;
        setMood(gs, "grin"); setMood(bs, "shock");
        setTimeout(() => { setMood(gs, "smile"); setMood(bs, "smile"); }, 1800);
        heartPop(groom.left + groom.width / 2, groom.top + 30, "🍟");
        toast(stolen >= 5 ? "Suma Bala: “That's ENOUGH fries, Sidharthan!” 😤🍟" : `Sidharthan stole a fry… again! 🍟 (×${stolen})`);
      };
    });

    // burger bite easter egg
    let bites = 0;
    $("#burgerBtn").addEventListener("click", () => {
      const btn = $("#burgerBtn").getBoundingClientRect();
      const groomEl = $("#momentsCouple .groom"), brideEl = $("#momentsCouple .bride");
      const bride = brideEl.getBoundingClientRect();
      const b = document.createElement("i"); b.className = "stolen-burger";
      b.innerHTML = '<svg viewBox="0 0 100 80" width="40" height="32" aria-hidden="true"><use href="#sym-burger"/></svg>';
      b.style.left = btn.left + btn.width / 2 + "px"; b.style.top = btn.top + 10 + "px"; fx.appendChild(b);
      const dx = bride.left + bride.width * 0.5 - (btn.left + btn.width / 2), dy = bride.top + bride.height * 0.3 - (btn.top + 10);
      b.animate([
        { transform: "translate3d(0,0,0) rotate(0)", opacity: 1 },
        { transform: `translate3d(${dx * 0.5}px,${dy * 0.5 - 60}px,0) rotate(-20deg)`, opacity: 1, offset: 0.55 },
        { transform: `translate3d(${dx}px,${dy}px,0) rotate(-10deg) scale(.6)`, opacity: 0 }
      ], { duration: 900, easing: "ease-in-out" }).onfinish = () => {
        b.remove(); bites++;
        setMood(brideEl, "grin"); setMood(groomEl, "shock");
        setTimeout(() => { setMood(brideEl, "smile"); setMood(groomEl, "smile"); }, 1800);
        heartPop(bride.left + bride.width / 2, bride.top + 30, "🍔");
        toast(bites >= 5 ? "Sidharthan: “Save me one bite, Suma Bala!” 😅🍔" : `Suma Bala took a big bite! 🍔 (×${bites})`);
      };
    });

    // wishes
    const KEY = "invite_wishes_v1";
    const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } };
    const save = a => { try { localStorage.setItem(KEY, JSON.stringify(a.slice(-30))); } catch (e) { /* storage unavailable */ } };
    const field = $("#wishField");
    function addBubble(w, isNew) {
      const b = document.createElement("div");
      b.className = "bubble" + (isNew ? " new" : "");
      const s = document.createElement("strong"); s.textContent = w.name;
      const t = document.createElement("span"); t.textContent = w.wish;
      b.append(s, t);
      b.style.cssText = `animation-duration:${rand(4, 7).toFixed(1)}s;animation-delay:${(-rand(0, 5)).toFixed(1)}s`;
      field.prepend(b);
      while (field.children.length > 10) field.lastElementChild.remove();
    }
    let wishes = load();
    (wishes.length ? wishes : CONFIG.sampleWishes).slice(-8).forEach(w => addBubble(w));
    $("#wishForm").addEventListener("submit", e => {
      e.preventDefault();
      const name = $("#wishName").value.trim(), wish = $("#wishText").value.trim();
      if (!name || !wish) return;
      const w = { name, wish }; wishes.push(w); save(wishes); addBubble(w, true);
      $("#wishText").value = "";
      const r = field.getBoundingClientRect(); burst(r.left + r.width / 2, r.top + 40, 14);
      toast("💌 Your wish is floating! (saved on this device)");
    });

    // RSVP
    $("#rsvpForm").addEventListener("submit", e => {
      e.preventDefault();
      const name = $("#rName").value.trim();
      const err = $("#rErr");
      if (!name) { err.hidden = false; $("#rName").focus(); return; }
      err.hidden = true;
      const msg = $("#rMsg").value.trim();
      const text = `🙏 Namaste! This is ${name}.\nI'd love to join the ${CONFIG.eventName} of ${CONFIG.groom.short} & ${CONFIG.bride.short} on ${derived.dateLong} at ${CONFIG.venue.name}, ${CONFIG.venue.cityShort}.\n👥 Guests: ${$("#rGuests").value}${msg ? `\n💬 ${msg}` : ""}`;
      const url = `https://wa.me/${CONFIG.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
      const r = $("#rBtn").getBoundingClientRect(); burst(r.left + r.width / 2, r.top + r.height / 2, 26);
      toast("🎉 Opening WhatsApp…");
      setTimeout(() => { const w = window.open(url, "_blank", "noopener"); if (!w) location.href = url; }, reduce ? 0 : 450);
    });

    // venue buttons
    $("#stub").addEventListener("click", () => {
      const p = $("#pass"); p.classList.toggle("torn");
      if (p.classList.contains("torn")) toast("🎫 Torn! Keep your stub — see you at the gate.");
    });

    // footer
    $("#toTop").addEventListener("click", e => {
      const b = e.currentTarget; b.classList.add("fly");
      scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      setTimeout(() => b.classList.remove("fly"), 1400);
    });
  }

  /* ---------- music (file first, synth fallback) ---------- */
  function setupMusic() {
    const btn = $("#musicBtn");
    let on = false, el = null, ctx = null, master = null, timer = null, usingSynth = false, nextT = 0, step = 0, drone = null;
    const SCALE = [0, 2, 4, 7, 9, 12, 14, 16, 19, 21]; // Mohanam-flavoured pentatonic
    const SEQ = [4, 5, 4, 3, 2, 3, 1, 2, 0, 1, 2, 3, 4, 3, 2, 1, 4, 6, 5, 4, 3, 4, 2, 0];
    const f = i => 196 * Math.pow(2, SCALE[i] / 12);

    function note(t) {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = "triangle"; o.frequency.value = f(SEQ[step % SEQ.length]);
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.5, t + 0.03); g.gain.exponentialRampToValueAtTime(0.001, t + 1.1);
      o.connect(g); g.connect(master); o.start(t); o.stop(t + 1.2); step++;
    }
    function pump() { while (nextT < ctx.currentTime + 0.6) { note(nextT); nextT += 0.46; } }
    function startSynth() {
      usingSynth = true;
      const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
      ctx = ctx || new AC();
      if (!master) { master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination); }
      ctx.resume();
      master.gain.cancelScheduledValues(ctx.currentTime); master.gain.linearRampToValueAtTime(0.16 * (CONFIG.music.volume / 0.5), ctx.currentTime + 1.2);
      if (!drone) {
        drone = ctx.createOscillator(); const dg = ctx.createGain(); drone.type = "sine"; drone.frequency.value = 98; dg.gain.value = 0.35;
        drone.connect(dg); dg.connect(master); drone.start();
      }
      nextT = ctx.currentTime + 0.1; clearInterval(timer); timer = setInterval(pump, 200); pump();
    }
    function stopSynth() {
      if (!ctx) return;
      master.gain.cancelScheduledValues(ctx.currentTime); master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
      clearInterval(timer); setTimeout(() => { if (!on) ctx.suspend(); }, 600);
    }
    function start() {
      if (usingSynth) return startSynth();
      if (!el) {
        el = new Audio(); el.loop = true; el.volume = CONFIG.music.volume; el.preload = "none";
        el.addEventListener("error", () => { if (on) startSynth(); });
        el.src = CONFIG.music.src;
      }
      const pr = el.play();
      if (pr && pr.catch) pr.catch(() => { if (on) startSynth(); });
    }
    function stop() { if (el) el.pause(); stopSynth(); }
    function render() {
      btn.classList.toggle("on", on); btn.setAttribute("aria-pressed", on);
      btn.setAttribute("aria-label", on ? "Turn music off" : "Turn music on");
    }
    btn.addEventListener("click", () => { on = !on; render(); on ? start() : stop(); });
    document.addEventListener("visibilitychange", () => {
      if (!on) return;
      if (document.hidden) { if (el) el.pause(); if (ctx) ctx.suspend(); } else if (usingSynth) { ctx.resume(); } else { start(); }
    });
  }

  /* ---------- device tilt ---------- */
  function setupTilt() {
    const btn = $("#tiltBtn");
    if (reduce || !("DeviceOrientationEvent" in window) || !coarse) return;   // scroll-only fallback
    btn.hidden = false;
    let active = false, got = false;
    const handler = e => {
      if (e.gamma == null) return; got = true;
      inputs.tiltX = clamp(e.gamma / 28, -1, 1);
      inputs.tiltY = clamp(((e.beta || 45) - 45) / 35, -1, 1); requestTick();
    };
    async function enable() {
      try {
        if (typeof DeviceOrientationEvent.requestPermission === "function") {        // iOS 13+: must be inside a tap
          const r = await DeviceOrientationEvent.requestPermission();
          if (r !== "granted") { toast("Tilt permission was declined — using touch & scroll instead."); return; }
        }
        addEventListener("deviceorientation", handler); active = true; render();
        setTimeout(() => { if (!got && active) { toast("Tilt isn't available on this device — using touch & scroll."); disable(); } }, 2500);
      } catch (err) { toast("Tilt isn't available here — using touch & scroll."); }
    }
    function disable() { removeEventListener("deviceorientation", handler); active = false; inputs.tiltX = inputs.tiltY = 0; render(); requestTick(); }
    function render() { btn.classList.toggle("on", active); btn.setAttribute("aria-pressed", active); btn.setAttribute("aria-label", active ? "Disable device tilt effect" : "Enable device tilt effect"); }
    btn.addEventListener("click", () => (active ? disable() : enable()));
  }

  /* ---------- loader ---------- */
  function setupLoader() {
    let finished = false;
    const done = () => {
      if (finished) return; finished = true;
      const l = $("#loader");
      document.body.classList.remove("is-loading"); document.body.classList.add("is-ready"); l.classList.add("hide"); setTimeout(() => l.remove(), 900);
    };
    const min = new Promise(r => setTimeout(r, reduce ? 100 : 1100));
    const ld = new Promise(r => (document.readyState === "complete" ? r() : addEventListener("load", r)));
    Promise.all([min, ld]).then(done);
    setTimeout(done, 4500);
  }

  /* ---------- boot ---------- */
  hydrate();
  mountCharacters();
  mountDecor();
  buildCalendar();
  setupScenes();
  scenes.forEach(s => io ? io.observe(s.sec) : (s.visible = true));
  setupStory();
  setupInputs();
  setupReveal();
  countdown();
  setupFlight();
  setupInteractions();
  setupMusic();
  setupTilt();
  setupLoader();
  requestTick();
})();
