/* ==========================================================================
   PLAYBOOK — interactions
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  /* ---------------- custom cursor reticle ---------------- */
  const reticle = document.querySelector(".reticle");
  if (reticle && window.matchMedia("(hover:hover)").matches) {
    window.addEventListener("mousemove", (e) => {
      reticle.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
    document
      .querySelectorAll("a, button, .media-item, .stat, .carousel__tabs button")
      .forEach((el) => {
        el.addEventListener("mouseenter", () =>
          reticle.classList.add("is-active"),
        );
        el.addEventListener("mouseleave", () =>
          reticle.classList.remove("is-active"),
        );
      });
  }

  /* ---------------- nav: scroll state + mobile menu + active link ---------------- */
  const nav = document.getElementById("nav");
  const burger = document.getElementById("burger");
  const navLinks = document.getElementById("navLinks");

  window.addEventListener(
    "scroll",
    () => {
      nav.classList.toggle("is-scrolled", window.scrollY > 40);
    },
    { passive: true },
  );

  burger.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    burger.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", open);
  });
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      burger.classList.remove("is-open");
    }),
  );

  const sections = document.querySelectorAll("main > section[id]");
  const navAnchors = document.querySelectorAll("[data-nav]");
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navAnchors.forEach((a) =>
            a.classList.toggle(
              "is-active",
              a.getAttribute("href") === `#${entry.target.id}`,
            ),
          );
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );
  sections.forEach((s) => navObserver.observe(s));

  /* ---------------- generic scroll reveal ---------------- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 },
  );
  document
    .querySelectorAll("[data-reveal]")
    .forEach((el) => revealObserver.observe(el));

  /* ---------------- welcome: "LA SOLUCIÓN CREATIVA" clip reveal ---------------- */
  const welcomeSection = document.getElementById("welcome");
  const welcomeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          welcomeSection.classList.add("is-inview");
          welcomeObserver.unobserve(welcomeSection);
        }
      });
    },
    { threshold: 0.4 },
  );
  welcomeObserver.observe(welcomeSection);

  /* ---------------- datos duros: count-up numbers ---------------- */
  const statNumbers = document.querySelectorAll(".stat__number");
  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || "";
        const isDecimal = target % 1 !== 0;
        const duration = 1600;
        const start = performance.now();
        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = target * eased;
          el.textContent =
            (isDecimal ? value.toFixed(1) : Math.round(value)) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        countObserver.unobserve(el);
      });
    },
    { threshold: 0.5 },
  );
  statNumbers.forEach((el) => countObserver.observe(el));

  /* ---------------- SERVICIOS carousel ---------------- */
  const services = [
    {
      title: "IMK Estratégica",
      desc: "Influencer Marketing con cabeza fría: conectamos tu marca con los talentos correctos y medimos cada resultado.",
      img: "assets/services/imk-estrategica.jpg",
      items: [
        "Estrategia de influencer marketing",
        "Casting & curaduría de talento gamer",
        "Campañas cross-plataforma",
        "Reportes de performance",
      ],
    },
    {
      title: "Gamificación",
      desc: "Traemos la lógica de los videojuegos a tu marca: retos, niveles y recompensas que enganchan de verdad.",
      img: "assets/services/gamificacion.jpg",
      items: [
        "Dinámicas gamificadas a medida",
        "Mecánicas de retos y recompensas",
        "Apps y microexperiencias",
        "Integración con equipos y comunidades",
      ],
    },
    {
      title: "Gameplay",
      desc: "Producción de streams y contenido de gameplay que se siente auténtico dentro de las comunidades gamer.",
      img: "assets/services/gameplay.jpg",
      items: [
        "Producción de live streaming",
        "Gameplays con talento propio",
        "Contenido nativo por plataforma",
        "Cobertura de torneos",
      ],
    },
    {
      title: "Corporativo",
      desc: "Office Gaming Day: llevamos torneos y dinámicas gamer a tu empresa para integrar equipos de forma diferente.",
      img: "assets/services/corporativo.jpg",
      items: [
        "Torneos internos de e-sports",
        "Dinámicas de integración",
        "Setup y producción en sitio",
        "Premiación y contenido del evento",
      ],
    },
    {
      title: "Activaciones",
      desc: "Experiencias digitales y presenciales que convierten audiencias gamer en comunidad real de marca.",
      img: "assets/services/activaciones.jpg",
      items: [
        "Activaciones BTL en eventos",
        "Experiencias phygital",
        "Stands e instalaciones interactivas",
        "Activaciones 100% digitales",
      ],
    },
    {
      title: "Workshops y Conferencias",
      desc: "Formamos equipos y marcas con líderes de la industria gamer, con contenido pensado para capacitar e inspirar.",
      img: "assets/services/workshops.jpg",
      items: [
        "Conferencias con expertos",
        "Talleres a medida",
        "Capacitación de equipos de marketing",
        "Contenido de tendencias gamer",
      ],
    },
  ];
  // Sube tus fotos con esos nombres a /assets/services/ (o cambia las rutas de arriba).
  // Recomendado: fotos horizontales, mínimo 900x675px, mismo tono/color entre ellas para que el carrusel se vea parejo.

  const tabsEl = document.getElementById("carouselTabs");
  const trackEl = document.getElementById("carouselTrack");
  const progressBar = document.getElementById("carouselProgressBar");
  let currentSlide = 0;
  let carouselTimer;

  services.forEach((service, i) => {
    const tab = document.createElement("button");
    tab.textContent = service.title;
    tab.setAttribute("role", "tab");
    tab.addEventListener("click", () => goToSlide(i));
    tabsEl.appendChild(tab);

    const slide = document.createElement("article");
    slide.className = "service-slide";
    slide.innerHTML = `
      <div class="service-slide__visual">
        <img class="service-slide__img" src="${service.img}" alt="${service.title}" loading="lazy">
        <span class="service-slide__num">0${i + 1}</span>
        <span class="shape shape--hex service-slide__badge" aria-hidden="true"></span>
      </div>
      <div class="service-slide__body">
        <h3>${service.title}</h3>
        <p>${service.desc}</p>
        <ul class="service-slide__list">
          ${service.items.map((it) => `<li>${it}</li>`).join("")}
        </ul>
      </div>`;
    trackEl.appendChild(slide);
  });

  const tabButtons = tabsEl.querySelectorAll("button");
  const slideEls = trackEl.querySelectorAll(".service-slide");

  function goToSlide(i, userInitiated = true) {
    currentSlide = (i + services.length) % services.length;
    slideEls.forEach((s, idx) =>
      s.classList.toggle("is-active", idx === currentSlide),
    );
    tabButtons.forEach((t, idx) =>
      t.classList.toggle("is-active", idx === currentSlide),
    );
    progressBar.style.transform = `translateX(${currentSlide * 100}%)`;
    if (userInitiated) restartAutoplay();
  }

  function restartAutoplay() {
    clearInterval(carouselTimer);
    carouselTimer = setInterval(() => goToSlide(currentSlide + 1, false), 6000);
  }

  document
    .getElementById("prevBtn")
    .addEventListener("click", () => goToSlide(currentSlide - 1));
  document
    .getElementById("nextBtn")
    .addEventListener("click", () => goToSlide(currentSlide + 1));

  goToSlide(0, false);
  restartAutoplay();

  /* ---------------- MEDIA grid ---------------- */
  const mediaItems = [
    {
      tag: "Stream",
      title: "Little Ceasars — Stream",
      cat: "stream",
      shape: "wide",
      video: "recursos/videos/little.mp4",
      poster: "recursos/posters/litle.png",
    },
    {
      tag: "Vertical",
      title: "Reel de campaña — Liverpool",
      cat: "vertical",
      shape: "vertical",
      video: "recursos/videos/campañaMario.mp4",
      poster: "recursos/posters/mario.png",
    },
    {
      tag: "Gameplay",
      title: "Highlights de gameplay",
      cat: "gameplay",
      shape: "square",
      video: "assets/media/gameplay-1.mp4",
      poster: "assets/media/gameplay-1.jpg",
    },
    {
      tag: "Vertical",
      title: "Didi — Reels",
      cat: "vertical",
      shape: "vertical",
      video: "recursos/videos/campañaDidi.mp4",
      poster: "recursos/posters/didi.png",
    },
    {
      tag: "Stream",
      title: "Live co-branding con creador",
      cat: "stream",
      shape: "wide",
      video: "assets/media/stream-2.mp4",
      poster: "assets/media/stream-2.jpg",
    },
    {
      tag: "Gameplay",
      title: "Campaña activación in-game",
      cat: "gameplay",
      shape: "square",
      video: "assets/media/gameplay-2.mp4",
      poster: "assets/media/gameplay-2.jpg",
    },
    {
      tag: "Gameplay",
      title: "Producción de torneo interno",
      cat: "gameplay",
      shape: "square",
      video: "assets/media/gameplay-3.mp4",
      poster: "assets/media/gameplay-3.jpg",
    },
    {
      tag: "Vertical",
      title: "Serie de shorts — Creador",
      cat: "vertical",
      shape: "vertical",
      video: "assets/media/vertical-3.mp4",
      poster: "assets/media/vertical-3.jpg",
    },
  ];

  const mediaGrid = document.getElementById("mediaGrid");
  mediaItems.forEach((item) => {
    const el = document.createElement("article");
    el.className = "media-item";
    el.dataset.cat = item.cat;
    el.dataset.shape = item.shape;
    el.innerHTML = `
      <video class="media-item__video" src="${item.video}" poster="${item.poster}" muted loop playsinline preload="none"></video>
      <span class="media-item__play"></span>
      <div class="media-item__overlay">
        <p class="media-item__tag">${item.tag}</p>
        <p class="media-item__title">${item.title}</p>
      </div>`;
    mediaGrid.appendChild(el);
  });

  // reproducir/pausar dentro de la tarjeta; pausa cualquier otro video que esté sonando
  const allMediaVideos = mediaGrid.querySelectorAll(".media-item__video");
  mediaGrid.querySelectorAll(".media-item").forEach((item) => {
    const video = item.querySelector(".media-item__video");
    item.addEventListener("click", () => {
      const isPlaying = item.classList.contains("is-playing");
      allMediaVideos.forEach((v) => {
        v.pause();
        v.currentTime = 0;
      });
      mediaGrid
        .querySelectorAll(".media-item")
        .forEach((i) => i.classList.remove("is-playing"));
      if (!isPlaying) {
        item.classList.add("is-playing");
        video.muted = false;
        video.play().catch(() => {
          /* el navegador puede bloquear autoplay con audio hasta un gesto; ya hubo click, así que debería reproducir */
        });
      }
    });
  });

  const mediaFilters = document.querySelectorAll(".media__filter");
  mediaFilters.forEach((btn) => {
    btn.addEventListener("click", () => {
      mediaFilters.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const filter = btn.dataset.filter;
      mediaGrid.querySelectorAll(".media-item").forEach((item) => {
        const show = filter === "all" || item.dataset.cat === filter;
        item.classList.toggle("is-hidden", !show);
        if (!show && item.classList.contains("is-playing")) {
          item.classList.remove("is-playing");
          const v = item.querySelector(".media-item__video");
          v.pause();
          v.currentTime = 0;
        }
      });
    });
  });

  /* ---------------- CLIENTES marquee ---------------- */
  // Pon aquí el nombre del archivo de cada logo (carpeta assets/clients/) y el nombre de la marca para el "alt".
  const clientLogos = [
    { name: "Danone", src: "recursos/logos/danone.png" },
    { name: "Mercado Libre", src: "recursos/logos/mercadolibre.webp" },
    { name: "Levis", src: "recursos/logos/levis.png" },
    { name: "Telcel", src: "recursos/logos/relcel.png" },
    { name: "Riot Games", src: "recursos/logos/riot.webp" },
    { name: "Sico", src: "recursos/logos/sico.png" },
    { name: "Tec de Monterrey", src: "recursos/logos/tec.png" },
    { name: "Samsung", src: "recursos/logos/samsung.png" },
    { name: "Axe", src: "recursos/logos/axe.png" },
    { name: "Heineken", src: "recursos/logos/heineken.png" },
    { name: "Loreal", src: "recursos/logos/loreal.webp" },
    { name: "Rappi", src: "recursos/logos/rappi.webp" },
    { name: "Universal", src: "recursos/logos/universal.png" },
  ];
  const marqueeTrack = document.getElementById("marqueeTrack");
  const fullSet = [...clientLogos, ...clientLogos]; // duplicado para que el loop sea perfecto
  fullSet.forEach((client) => {
    const el = document.createElement("div");
    el.className = "client-logo";
    el.innerHTML = `<img src="${client.src}" alt="${client.name}" class="client-logo__img" loading="lazy">`;
    marqueeTrack.appendChild(el);
  });

  /* ---------------- DEMO modal ---------------- */
  const modal = document.getElementById("demoModal");
  const openTriggers = document.querySelectorAll("[data-open-demo]");
  const closeTriggers = document.querySelectorAll("[data-close-demo]");
  const demoForm = document.getElementById("demoForm");
  const demoSuccess = document.getElementById("demoSuccess");

  function openModal() {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  openTriggers.forEach((btn) => btn.addEventListener("click", openModal));
  closeTriggers.forEach((btn) => btn.addEventListener("click", closeModal));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  demoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // No hay backend conectado: esto simula la confirmación.
    // Sustituir por tu integración real (CRM, email, endpoint propio, etc).
    demoForm.hidden = true;
    demoSuccess.hidden = false;
  });

  /* ---------------- SERVICIOS: campo de puntos interactivo (huyen del mouse) ---------------- */
  function initDotsField() {
    const canvas = document.getElementById("dotsCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const section = canvas.closest("section");
    const canHover = window.matchMedia("(hover:hover)").matches;

    const SPACING = 24; // separación entre puntos (antes 30: más denso = menos vacío)
    const INNER_RADIUS = 46; // radio donde los puntos desaparecen del todo
    const OUTER_RADIUS = 170; // radio donde los puntos empiezan a huir
    const MAX_PUSH = 44; // qué tanto se empujan
    const EASE = 0.16; // suavidad del regreso elástico

    let dots = [],
      width = 0,
      height = 0,
      dpr = 1;
    let mouse = { x: -9999, y: -9999 };
    let rafId;

    function resize() {
      dpr = window.devicePixelRatio || 1;
      width = section.clientWidth;
      height = section.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGrid();
    }

    function buildGrid() {
      dots = [];
      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const bx = c * SPACING;
          const by = r * SPACING;
          dots.push({ bx, by, x: bx, y: by, o: 1 });
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (const d of dots) {
        const dx = d.bx - mouse.x;
        const dy = d.by - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let targetX = d.bx,
          targetY = d.by,
          targetO = 1;

        if (dist < OUTER_RADIUS) {
          const t = 1 - dist / OUTER_RADIUS;
          const angle = Math.atan2(dy, dx);
          const push = t * t * MAX_PUSH;
          targetX = d.bx + Math.cos(angle) * push;
          targetY = d.by + Math.sin(angle) * push;
        }
        if (dist < INNER_RADIUS) {
          targetO = dist / INNER_RADIUS; // hueco vacío justo bajo el cursor
        }

        d.x += (targetX - d.x) * EASE;
        d.y += (targetY - d.y) * EASE;
        d.o += (targetO - d.o) * EASE;

        if (d.o > 0.03) {
          ctx.globalAlpha = d.o * 0.3; // <- baja este número (0 a 1) para más/menos opacidad
          ctx.fillStyle = dist < OUTER_RADIUS ? "#63AE29" : "#ffffff";
          ctx.beginPath();
          ctx.arc(d.x, d.y, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(draw);
    }

    section.addEventListener("mousemove", (e) => {
      const rect = section.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    section.addEventListener("mouseleave", () => {
      mouse.x = -9999;
      mouse.y = -9999;
    });

    window.addEventListener("resize", resize);
    resize();

    if (canHover) {
      draw();
    } else {
      // en touch no hay mouse que perseguir: solo dibuja el grid una vez, sin animar
      draw();
      cancelAnimationFrame(rafId);
    }
  }
  initDotsField();

  /* ---------------- HERO: figuritas libres que huyen del mouse ---------------- */
  function initHeroShapes() {
    const hero = document.getElementById("home");
    const wrap = hero && hero.querySelector(".hero__shapes");
    if (!hero || !wrap) return;

    const canHover = window.matchMedia("(hover:hover)").matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // En touch o con "reducir movimiento" activado, se deja el flote suave de CSS tal cual.
    if (!canHover || reduceMotion) return;

    const PUSH_RADIUS = 170; // qué tan cerca debe estar el mouse para empujarlas
    const PUSH_FORCE = 0.85; // qué tan fuerte las empuja
    const MAX_SPEED = 0.6; // velocidad máxima de deambular
    const WANDER = 0.012; // qué tanto cambian de dirección solas
    const FRICTION = 0.985;

    let width = hero.clientWidth;
    let height = hero.clientHeight;
    let mouse = { x: -9999, y: -9999, active: false };
    let rafId;

    const particles = Array.from(wrap.querySelectorAll(".shape")).map((el) => {
      // se quita la animación CSS de flote y se toma el control por JS
      el.classList.remove("float-a", "float-b", "float-c");
      const rect = el.getBoundingClientRect();
      const heroRect = hero.getBoundingClientRect();
      el.style.top = "0";
      el.style.left = "0";
      el.style.right = "auto";
      el.style.bottom = "auto";
      return {
        el,
        w: rect.width,
        h: rect.height,
        x: rect.left - heroRect.left,
        y: rect.top - heroRect.top,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        rot: 0,
        vr: (Math.random() - 0.5) * 0.18,
      };
    });

    function resize() {
      width = hero.clientWidth;
      height = hero.clientHeight;
    }
    window.addEventListener("resize", resize);

    hero.addEventListener("mousemove", (e) => {
      const rect = hero.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    });
    hero.addEventListener("mouseleave", () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    });

    function tick() {
      particles.forEach((p) => {
        if (mouse.active) {
          const dx = p.x + p.w / 2 - mouse.x;
          const dy = p.y + p.h / 2 - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          if (dist < PUSH_RADIUS) {
            const force = (1 - dist / PUSH_RADIUS) * PUSH_FORCE;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // deambular sin rumbo fijo
        p.vx += (Math.random() - 0.5) * WANDER;
        p.vy += (Math.random() - 0.5) * WANDER;

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > MAX_SPEED) {
          p.vx = (p.vx / speed) * MAX_SPEED;
          p.vy = (p.vy / speed) * MAX_SPEED;
        }
        p.vx *= FRICTION;
        p.vy *= FRICTION;

        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;

        // rebota en los bordes del hero
        if (p.x < -p.w * 0.3) {
          p.x = -p.w * 0.3;
          p.vx = Math.abs(p.vx);
        }
        if (p.x > width - p.w * 0.7) {
          p.x = width - p.w * 0.7;
          p.vx = -Math.abs(p.vx);
        }
        if (p.y < -p.h * 0.3) {
          p.y = -p.h * 0.3;
          p.vy = Math.abs(p.vy);
        }
        if (p.y > height - p.h * 0.7) {
          p.y = height - p.h * 0.7;
          p.vy = -Math.abs(p.vy);
        }

        p.el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rot}deg)`;
      });
      rafId = requestAnimationFrame(tick);
    }
    tick();
  }
  initHeroShapes();
});
