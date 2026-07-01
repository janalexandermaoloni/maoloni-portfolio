/* Applies the theme before first paint (external = no inline script).
   Default is LIGHT; dark only if the user explicitly chose it. */
(function () {
  try {
    var t = localStorage.getItem("theme");
    document.documentElement.setAttribute("data-theme", t === "dark" ? "dark" : "light");
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "light");
  }
})();
