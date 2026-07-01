/* =========================================================
   Shared header behaviour for the multi-page site
   (theme toggle · mobile hamburger · sticky shrink · reveal)
   Loaded on every page EXCEPT index.html (which uses script.js).
   ========================================================= */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var root = document.documentElement;
  var nav = document.getElementById("nav");
  var progress = document.getElementById("scroll-progress");

  /* ---- sticky shrink + scroll progress ---- */
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (nav) nav.classList.toggle("nav--scrolled", y > 40);
    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- mobile hamburger ---- */
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

  /* ---- light / dark theme toggle ---- */
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
  if (themeBtn) themeBtn.addEventListener("click", function () {
    setTheme(curTheme() === "light" ? "dark" : "light");
  });

  /* ---- reveal on scroll ---- */
  var els = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
  els.forEach(function (el) {
    var g = el.closest("section, header, footer, main") || document.body;
    if (!g.__i) g.__i = 0;
    el.style.transitionDelay = Math.min(g.__i++ * 60, 420) + "ms";
  });
  if (reduce || !("IntersectionObserver" in window)) {
    els.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }
})();
