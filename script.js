/* ==========================================================================
   PLAYBOOK — interactions
   ========================================================================== */
document.documentElement.classList.replace("no-js", "js");

document.addEventListener("DOMContentLoaded", () => {
  /* ---------------- custom cursor reticle ---------------- */
  const reticle = document.querySelector(".reticle");
  if (reticle && window.matchMedia("(hover:hover)").matches) {
    window.addEventListener("mousemove", (e) => {
      reticle.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
    document
      .querySelectorAll("a, button, .media-item, .stat, .hex-card")
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

  /* ---------------- SERVICIOS: datos de cada servicio ---------------- */
  const services = [
    {
      title: "IMK + ESTRATEGIA 360",
      img: "recursos/fotos/gaming.HEIC",
      items: [
        "Estrategia de influencer marketing",
        "Campañas",
        "Contenido",
        "Talento",
      ],
      video: "recursos/videos/imk.mp4",
    },
    {
      title: "ACTIVACIONES Y EXPERIENCIAS",

      img: "assets/services/gamificacion.jpg",
      items: [
        "Eventos",
        "Lanzamientos",
        "experiencias presenciales, digitales e híbridas.",
      ],
      video: "recursos/videos/activaciones.mp4",
    },
    {
      title: " GAMING & ESPORTS",
      img: "recursos/servicios/gameDev.png",
      items: ["Videojuegos", "Torneos", "Mundos digitales", "Comunidades"],
      video: "recursos/videos/hero.mp4",
    },
    {
      title: " EXPERIENCIAS CORPORATIVAS",
      img: "assets/services/corporativo.jpg",
      items: [
        "Team buildings",
        "Procesos de integración",
        "Office Gaming Days.",
      ],
      video: "recursos/videos/corporativo.mp4",
    },
    {
      title: "FORMACIÓN Y CONOCIMIENTO",
      img: "assets/services/activaciones.jpg",
      items: ["Capacitaciones", "Mentorías", "Workshops", "Game Jams"],
      video: "recursos/videos/formacion.mp4",
    },
    {
      title: "DESARROLLO TECNOLÓGICO",
      img: "assets/services/workshops.jpg",
      items: [
        "Videojuegos",
        "Plataformas",
        "Simuladores",
        "Experiencias de realidad virtual",
        "Soluciones desarrolladas a la medida",
      ],
      video: "recursos/videos/tecnologico.mp4",
    },
  ];
  // Sube tus fotos con esos nombres a /assets/services/ (o cambia las rutas de arriba).
  // Recomendado: fotos horizontales, mínimo 900x675px, mismo tono/color entre ellas para que el pop-up se vea parejo.
  // Si quieres video de fondo en el pop-up de un servicio en vez de foto, agrégale la propiedad
  // "video: 'ruta/a/tu/video.mp4'" a ese objeto — la imagen (img) se sigue usando como poster mientras carga.
  // Ejemplo:
  // { title: "Gameplay", desc: "...", img: "assets/services/gameplay.jpg", video: "recursos/videos/gameplay-loop.mp4", items: [...] }

  const gridEl = document.getElementById("servicesGrid");
  const serviceModal = document.getElementById("serviceModal");
  const serviceModalMedia = document.getElementById("serviceModalMedia");
  const serviceModalNum = document.getElementById("serviceModalNum");
  const serviceModalTitle = document.getElementById("serviceModalTitle");
  const serviceModalDesc = document.getElementById("serviceModalDesc");
  const serviceModalList = document.getElementById("serviceModalList");

  services.forEach((service, i) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "hex-card";
    card.setAttribute("aria-haspopup", "dialog");
    card.setAttribute("aria-label", `Ver detalle de ${service.title}`);
    // si el servicio tiene foto, se ve de fondo en el hexágono (blureada / efecto vidrio)
    // para que la sección destaque incluso antes de hacer click
    const bgHTML = service.img
      ? `<span class="hex-card__bg" style="background-image:url('${service.img}')" aria-hidden="true"></span>
         <span class="hex-card__glass" aria-hidden="true"></span>`
      : "";
    card.innerHTML = `
      ${bgHTML}
      <span class="hex-card__num" aria-hidden="true">0${i + 1}</span>
      <span class="hex-card__name">${service.title}</span>`;
    card.addEventListener("click", () => openServiceModal(i));
    gridEl.appendChild(card);
  });

  function openServiceModal(i) {
    const service = services[i];
    serviceModalNum.textContent = `0${i + 1}`;
    serviceModalTitle.textContent = service.title;
    serviceModalDesc.textContent = service.desc;
    serviceModalList.innerHTML = service.items
      .map((it) => `<li>${it}</li>`)
      .join("");

    if (service.video) {
      // video de fondo: usa la imagen como poster mientras carga
      serviceModalMedia.innerHTML = `
        <video src="${service.video}" ${service.img ? `poster="${service.img}"` : ""}
          autoplay muted loop playsinline></video>`;
      // algunos navegadores (Safari/iOS sobre todo) no confían en el atributo
      // "muted" cuando el <video> se inserta por innerHTML, y bloquean el autoplay
      // en silencio. Forzamos la propiedad + el play() por JS como respaldo.
      const vid = serviceModalMedia.querySelector("video");
      if (vid) {
        vid.muted = true;
        vid.play().catch(() => {
          // si el navegador aun así lo bloquea, no truena nada: se queda en el poster
        });
      }
    } else if (service.img) {
      serviceModalMedia.innerHTML = `
        <img src="${service.img}" alt="${service.title}" loading="lazy">`;
    } else {
      // sin foto ni video para este servicio: se muestra un fondo de marca en vez de una imagen rota
      serviceModalMedia.innerHTML = `
        <div class="service-modal__media-fallback">
          <span class="shape shape--outline-hex" aria-hidden="true"></span>
        </div>`;
    }

    serviceModal.classList.add("is-open");
    serviceModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeServiceModal() {
    const video = serviceModalMedia.querySelector("video");
    if (video) video.pause();
    serviceModal.classList.remove("is-open");
    serviceModal.setAttribute("aria-hidden", "true");
    if (!modal.classList.contains("is-open")) {
      document.body.style.overflow = "";
    }
  }
  serviceModal
    .querySelectorAll("[data-close-service]")
    .forEach((btn) => btn.addEventListener("click", closeServiceModal));

  // scroll-reveal for the hex grid: cards fade/rise in with a stagger set in CSS
  const servicesGridObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gridEl.classList.add("is-inview");
          servicesGridObserver.unobserve(gridEl);
        }
      });
    },
    { threshold: 0.15 },
  );
  servicesGridObserver.observe(gridEl);

  /* ---------------- MEDIA grid ---------------- */
  const mediaItems = [
    {
      tag: "Stream",
      title: "Little Ceasars — Stream",
      description:
        "Una transmisión en vivo diseñada para convertir la audiencia en participación.",
      cat: "stream",
      shape: "wide",
      video: "recursos/videos/little.mp4",
      poster: "recursos/posters/litle.png",
    },
    {
      tag: "Vertical",
      title: "Reel de campaña — Liverpool",
      description:
        "Contenido vertical pensado para detener el scroll y llevar la campaña directo a la comunidad.",
      cat: "vertical",
      shape: "vertical",
      video: "recursos/videos/campañaMario.mp4",
      poster: "recursos/posters/mario.png",
    },
    {
      tag: "Gameplay",
      title: "Highlights de gameplay",
      description:
        "Los mejores momentos de juego editados para compartir la emoción en segundos.",
      cat: "gameplay",
      shape: "square",
      video: "assets/media/gameplay-1.mp4",
      poster: "assets/media/gameplay-1.jpg",
    },
    {
      tag: "Vertical",
      title: "Didi — Reels",
      description:
        "Una activación ágil y nativa para conectar una marca con nuevas audiencias.",
      cat: "vertical",
      shape: "vertical",
      video: "recursos/videos/campañaDidi.mp4",
      poster: "recursos/posters/didi.png",
    },
    {
      tag: "Stream",
      title: "Live co-branding con creador",
      description:
        "Creador, marca y comunidad compartiendo una experiencia en tiempo real.",
      cat: "stream",
      shape: "wide",
      video: "assets/media/stream-2.mp4",
      poster: "assets/media/stream-2.jpg",
    },
    {
      tag: "Gameplay",
      title: "Campaña activación in-game",
      description:
        "Una experiencia jugable que convierte la atención en interacción medible.",
      cat: "gameplay",
      shape: "square",
      video: "assets/media/gameplay-2.mp4",
      poster: "assets/media/gameplay-2.jpg",
    },
    {
      tag: "Gameplay",
      title: "Producción de torneo interno",
      description:
        "Competencia, comunidad y espectáculo en un formato hecho para jugarse y verse.",
      cat: "gameplay",
      shape: "square",
      video: "assets/media/gameplay-3.mp4",
      poster: "assets/media/gameplay-3.jpg",
    },
    {
      tag: "Vertical",
      title: "Serie de shorts — Creador",
      description:
        "Una serie de piezas cortas con ritmo, personalidad y lenguaje de comunidad.",
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
        <div class="media-item__profile">
          <span class="media-item__profile-mark">P</span>
          <span>PLAYBOOK</span>
        </div>
        <p class="media-item__tag">${item.tag}</p>
        <p class="media-item__title">${item.title}</p>
        <p class="media-item__description">${item.description}</p>
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
  const mediaSection = document.getElementById("media");
  const mediaNavigate = document.getElementById("mediaNavigate");
  const mediaReelsExit = document.getElementById("mediaReelsExit");
  mediaNavigate.addEventListener("click", () => {
    document.querySelector('.media__filter[data-filter="all"]').click();
  });
  mediaFilters.forEach((btn) => {
    btn.addEventListener("click", () => {
      mediaFilters.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const filter = btn.dataset.filter;
      mediaSection.classList.add("media--reels");
      mediaReelsExit.hidden = false;
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

  mediaReelsExit.addEventListener("click", () => {
    mediaSection.classList.remove("media--reels");
    mediaReelsExit.hidden = true;
    allMediaVideos.forEach((video) => {
      video.pause();
      video.currentTime = 0;
    });
    mediaGrid
      .querySelectorAll(".media-item")
      .forEach((item) => item.classList.remove("is-playing"));
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

  /* ---------------- ECOSISTEMA: pop-ups PLAY OUT / PLAY IN ---------------- */
  const ecosystemModal = document.getElementById("ecosistemaModal");
  const ecosystemModalKicker = document.getElementById("ecosistemaModalKicker");
  const ecosystemModalTitle = document.getElementById("ecosistemaModalTitle");
  const ecosystemModalText = document.getElementById("ecosistemaModalText");
  const ecosystemModalList = document.getElementById("ecosistemaModalList");
  const ecosystemDirections = {
    out: {
      title: "Gamificación para conectar marcas y audiencias.",
      text: "Convertimos la participación en una experiencia. Aplicamos mecánicas de juego para motivar acciones, facilitar el aprendizaje y generar conexiones más profundas entre personas, marcas y organizaciones, con una intención clara: lograr que las personas quieran participar y que cada interacción pueda medirse.",
      items: [
        "Retos y concursos.",
        "Experiencias jugables.",
        "Sistemas de puntos y recompensas.",
        "Rankings y competencias.",
        "Dinámicas con creadores.",
        "Activaciones digitales y presenciales.",
        "Videojuegos de marca.",
      ],
    },
    in: {
      title: "Gamificación para fortalecer personas y equipos.",
      text: "Convertimos la participación en una experiencia. Aplicamos mecánicas de juego para motivar acciones, facilitar el aprendizaje y generar conexiones más profundas entre personas, marcas y organizaciones, con una intención clara: lograr que las personas quieran participar y que cada interacción pueda medirse.",
      items: [
        "Capacitación interactiva.",
        "Retos colaborativos.",
        "Simuladores.",
        "Desarrollo de habilidades.",
        "Team buildings.",
        "Procesos de integración.",
        "Evaluación y métricas de aprendizaje.",
      ],
    },
  };

  function openEcosystemModal(direction) {
    const content = ecosystemDirections[direction];
    ecosystemModalKicker.textContent =
      direction === "out" ? "PLAY OUT" : "PLAY IN";
    ecosystemModalTitle.textContent = content.title;
    ecosystemModalText.textContent = content.text;
    ecosystemModalList.innerHTML = content.items
      .map((item) => `<li>${item}</li>`)
      .join("");
    ecosystemModal.classList.add("is-open");
    ecosystemModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeEcosystemModal() {
    ecosystemModal.classList.remove("is-open");
    ecosystemModal.setAttribute("aria-hidden", "true");
    if (
      !modal.classList.contains("is-open") &&
      !serviceModal.classList.contains("is-open")
    ) {
      document.body.style.overflow = "";
    }
  }

  document.querySelectorAll("[data-ecosistema]").forEach((button) => {
    button.addEventListener("click", () =>
      openEcosystemModal(button.dataset.ecosistema),
    );
  });
  ecosystemModal
    .querySelectorAll("[data-close-ecosistema]")
    .forEach((button) => {
      button.addEventListener("click", closeEcosystemModal);
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
    if (!serviceModal.classList.contains("is-open")) {
      document.body.style.overflow = "";
    }
  }
  openTriggers.forEach((btn) => btn.addEventListener("click", openModal));
  closeTriggers.forEach((btn) => btn.addEventListener("click", closeModal));
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (modal.classList.contains("is-open")) closeModal();
    if (serviceModal.classList.contains("is-open")) closeServiceModal();
    if (ecosystemModal.classList.contains("is-open")) closeEcosystemModal();
  });

  demoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(demoForm);
    const message = [
      "Hola Playbook, quiero agendar un Demo.",
      `Nombre: ${formData.get("nombre")}`,
      `Empresa: ${formData.get("empresa")}`,
      `Correo: ${formData.get("correo")}`,
    ].join("\n");
    const whatsappUrl = `https://wa.me/52554718487?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
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
