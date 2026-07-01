/* =========================================================
   Alexander Maoloni — portfolio · motion & interaction
   ========================================================= */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- NAV: shrink on scroll ---------- */
  var nav = document.getElementById("nav");
  var progress = document.getElementById("scroll-progress");

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (nav) nav.classList.toggle("nav--scrolled", y > 40);

    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      var p = h > 0 ? (y / h) * 100 : 0;
      progress.style.width = p + "%";
    }
  }

  /* ---------- MOBILE MENU ---------- */
  var burger = document.getElementById("burger");
  var links = document.querySelector(".nav__links");
  if (burger && links) {
    burger.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      nav.classList.toggle("nav--open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("is-open");
        nav.classList.remove("nav--open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- REVEAL ON SCROLL (with stagger) ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));

  // pre-compute a small stagger delay grouped by section
  revealEls.forEach(function (el) {
    var group = el.closest("section, header, footer") || document.body;
    if (!group.__i) group.__i = 0;
    var i = group.__i++;
    var delay = Math.min(i * 70, 480);
    el.style.transitionDelay = delay + "ms";
  });

  if (reduce || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- PARALLAX ---------- */
  var parEls = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));
  var ticking = false;

  function parallax() {
    var vh = window.innerHeight;
    parEls.forEach(function (el) {
      var r = el.getBoundingClientRect();
      var center = r.top + r.height / 2;
      var offset = (center - vh / 2) / vh;        // -1 .. 1
      var factor = parseFloat(el.getAttribute("data-parallax")) || 0.05;
      el.style.transform = "translate3d(0," + (-offset * factor * 100).toFixed(2) + "px,0)";
    });
    ticking = false;
  }

  /* ---------- rAF-throttled scroll loop ---------- */
  function tick() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        onScroll();
        if (!reduce && parEls.length) parallax();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener("scroll", tick, { passive: true });
  window.addEventListener("resize", tick, { passive: true });
  onScroll();
  if (!reduce) parallax();

  /* ---------- ACTIVE NAV LINK ---------- */
  var sections = ["work", "studio", "process", "contact"]
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  var navMap = {};
  document.querySelectorAll('.nav__links a').forEach(function (a) {
    var href = a.getAttribute("href") || "";
    if (href.charAt(0) === "#") navMap[href.replace("#", "")] = a; // only in-page anchors
  });

  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          Object.keys(navMap).forEach(function (k) { navMap[k].classList.remove("active"); });
          if (navMap[e.target.id]) navMap[e.target.id].classList.add("active");
        }
      });
    }, { threshold: 0.5 });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- THEME TOGGLE ---------- */
  var root = document.documentElement;
  var themeBtn = document.getElementById("theme-toggle");
  var metaTheme = document.querySelector('meta[name="theme-color"]');

  function curTheme() { return root.getAttribute("data-theme") || "dark"; }

  function paintChrome(t) {
    if (metaTheme) metaTheme.setAttribute("content", t === "light" ? "#F4EDDE" : "#1B1712");
    if (themeBtn) themeBtn.setAttribute("aria-label", t === "light" ? "Switch to dark theme" : "Switch to light theme");
  }

  function setTheme(t) {
    root.classList.add("theming");
    root.setAttribute("data-theme", t);
    try { localStorage.setItem("theme", t); } catch (e) {}
    paintChrome(t);
    window.setTimeout(function () { root.classList.remove("theming"); }, 620);
  }

  paintChrome(curTheme());
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      setTheme(curTheme() === "light" ? "dark" : "light");
    });
  }
})();
