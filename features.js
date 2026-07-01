/* =========================================================
   Shared components — pure vanilla JS, no external libraries.
   Loaded on every page. Everything is element-gated & safe.
     · cookie banner (home only, localStorage)
     · carousel (autoplay + manual, arrows + dots)
     · lightbox (figure images + carousel images)
     · contact form validation
   ========================================================= */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- COOKIE BANNER ---------------- */
  var banner = document.getElementById("cookie-banner");
  if (banner) {
    var accepted = false;
    try { accepted = !!localStorage.getItem("cookieAccepted"); } catch (e) {}
    if (!accepted) banner.classList.add("is-visible");
    var acceptBtn = document.getElementById("accept-cookies");
    if (acceptBtn) {
      acceptBtn.addEventListener("click", function () {
        try { localStorage.setItem("cookieAccepted", "true"); } catch (e) {}
        banner.classList.remove("is-visible");
      });
    }
  }

  /* ---------------- CAROUSEL ---------------- */
  Array.prototype.slice.call(document.querySelectorAll("[data-carousel]")).forEach(function (car) {
    var track = car.querySelector(".carousel__track");
    var slides = Array.prototype.slice.call(car.querySelectorAll(".carousel__slide"));
    if (!track || slides.length < 2) return;

    var i = 0, timer = null;
    var prev = car.querySelector(".carousel__btn--prev");
    var next = car.querySelector(".carousel__btn--next");
    var dotsWrap = car.querySelector(".carousel__dots");
    var dots = [];

    if (dotsWrap) {
      slides.forEach(function (_, k) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "carousel__dot";
        b.setAttribute("aria-label", "Go to slide " + (k + 1));
        b.addEventListener("click", function () { go(k); restart(); });
        dotsWrap.appendChild(b);
        dots.push(b);
      });
    }

    function render() {
      track.style.transform = "translateX(" + (-i * 100) + "%)";
      dots.forEach(function (d, k) { d.classList.toggle("is-active", k === i); });
      slides.forEach(function (s, k) { s.setAttribute("aria-hidden", k === i ? "false" : "true"); });
    }
    function go(k) { i = (k + slides.length) % slides.length; render(); }
    if (next) next.addEventListener("click", function () { go(i + 1); restart(); });
    if (prev) prev.addEventListener("click", function () { go(i - 1); restart(); });

    function start() { if (!reduce) timer = window.setInterval(function () { go(i + 1); }, 5000); }
    function restart() { window.clearInterval(timer); start(); }
    car.addEventListener("mouseenter", function () { window.clearInterval(timer); });
    car.addEventListener("mouseleave", restart);

    render();
    start();
  });

  /* ---------------- LIGHTBOX ---------------- */
  var triggers = Array.prototype.slice.call(document.querySelectorAll("[data-lightbox] img, img[data-lightbox]"));
  if (triggers.length) {
    var lb = document.createElement("div");
    lb.className = "lightbox";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.setAttribute("aria-hidden", "true");
    lb.innerHTML =
      '<button class="lightbox__close" type="button" aria-label="Close image">&times;</button>' +
      '<img class="lightbox__img" alt="">';
    document.body.appendChild(lb);
    var lbImg = lb.querySelector(".lightbox__img");
    var lbClose = lb.querySelector(".lightbox__close");

    function openLB(src, alt) {
      lbImg.setAttribute("src", src);
      lbImg.setAttribute("alt", alt || "");
      lb.classList.add("is-open");
      lb.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
    function closeLB() {
      lb.classList.remove("is-open");
      lb.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
    triggers.forEach(function (img) {
      img.style.cursor = "zoom-in";
      img.addEventListener("click", function () { openLB(img.currentSrc || img.src, img.alt); });
    });
    lbClose.addEventListener("click", closeLB);
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLB(); });
    window.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLB(); });
  }

  /* ---------------- CONTACT FORM VALIDATION ---------------- */
  Array.prototype.slice.call(document.querySelectorAll("[data-contact-form]")).forEach(function (form) {
    var success = form.querySelector(".form__success");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      form.reset();
      if (success) {
        success.hidden = false;
        success.setAttribute("role", "status");
        window.setTimeout(function () { success.hidden = true; }, 6000);
      }
    });
  });
})();
