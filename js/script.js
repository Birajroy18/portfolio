document.addEventListener("DOMContentLoaded", () => {
  // prevent browser auto-restoring scroll which can skip animations
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";


  const navLinks = document.querySelectorAll(".nav-link");

  // helper: remove all active classes
  function clearActive() {
    navLinks.forEach(l => l.classList.remove("active"));
  }

  // set active based on location.hash (or default #home)
  function setActiveFromHash() {
    const hash = location.hash || "#home";
    clearActive();
    const target = document.querySelector(`a.nav-link[href="${hash}"]`);
    if (target) target.classList.add("active");
  }

  // click behavior: smooth scroll (browser already does it with css scroll-behavior)
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      // let browser handle the hash navigation; update active immediately
      clearActive();
      link.classList.add("active");
    });
  });

  // run once on load
  setActiveFromHash();

  /* -------------------------
     IntersectionObserver to update active link on scroll
     ------------------------- */
  const sections = document.querySelectorAll("section[id], main[id], .projects-section[id]");
  if (sections && sections.length) {
    const obsOptions = {
      root: null,
      rootMargin: "0px 0px -40% 0px", // trigger when section is mostly in view
      threshold: 0
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = `#${entry.target.id}`;
          clearActive();
          const link = document.querySelector(`a.nav-link[href="${id}"]`);
          if (link) link.classList.add("active");
        }
      });
    }, obsOptions);

    sections.forEach(sec => {
      if (sec.id) observer.observe(sec);
    });
  }

  /* -------------------------
     Cursor animation
     ------------------------- */
  (function cursor() {
    const cursorEl = document.querySelector("#cursor");
    if (!cursorEl) return;

    // small offset constants (tweak if needed)
    const xOffset = cursorEl.offsetWidth / 5;
    const yMultiplier = 7.6;

    document.body.addEventListener("mousemove", (ev) => {
      gsap.to(cursorEl, {
        x: ev.clientX + xOffset,
        y: ev.clientY - (yMultiplier * cursorEl.offsetHeight),
        duration: 0.45,
        ease: "power3.out"
      });
    });
  })();


  /* -------------------------
     Page entrance animation (GSAP)
     ------------------------- */
  function page1Animation() {
    const tl = gsap.timeline();

    // nav elements (left brand + list items)
    tl.from("nav .left, nav li", {
      y: -40,
      opacity: 0,
      delay: 0.35,
      duration: 0.7,
      stagger: 0.15
    });

    // left section texts and items
    tl.from(".leftsection h1", { opacity: 0, duration: 0.45, y: 20 }, "-=0.2");
    tl.from(".leftsection h2", { opacity: 0, duration: 0.45, y: 20 }, "-=0.15");
    tl.from(".leftsection p", { opacity: 0, x: -200, duration: 0.6, stagger: 0.2 }, "-=0.1");
    tl.from(".buttons a", { opacity: 0, duration: 0.35, stagger: 0.12 }, "-=0.2");

    // right image
    tl.from(".rightsection img", { opacity: 0, duration: 0.35, y:-200 }, "-=0.45");
  }

  // run animation after a short timeout to ensure layout is stable (helps replay on reload)
  setTimeout(page1Animation, 80);

  // Hand button to show text2
  const handBtn = document.querySelector(".hand-btn");
  const text2 = document.querySelector(".text2");

  if (handBtn && text2) {
    handBtn.addEventListener("click", () => {
      // Set opacity to 1 on click (show only)
      text2.style.opacity = "1";
    });
  }

});
