// The saved Product choice ("home" or "restaurant"), read and written in one place.
// The Product choice ticket (#154) builds on this: replace get/set there if storage moves.
// Storage can be blocked; then reads give null and writes are dropped, and the site still works.
(function () {
  var KEY = "focal-product";
  function get() {
    try { var v = localStorage.getItem(KEY); return v === "home" || v === "restaurant" ? v : null; } catch (e) { return null; }
  }
  function set(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }
  window.focalProduct = { get: get, set: set };

  // Guide pages: this script is the first child of the article, so it runs before the content paints.
  var doc = document.currentScript && document.currentScript.parentNode;
  if (!doc || !doc.classList.contains("doc") || doc.getAttribute("data-home") !== "on") return;
  doc.setAttribute("data-js", "");
  // Opening a Guide only reads the saved choice. A Guide tagged both follows it.
  if (doc.getAttribute("data-guide-product") === "both" && get() === "home") doc.setAttribute("data-product", "home");
  // Clicking "View for X instead" is a deliberate choice, so it saves.
  doc.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("[data-switch]");
    if (!a) return;
    var v = a.getAttribute("data-switch");
    set(v);
    if (a.hasAttribute("data-flip")) { e.preventDefault(); doc.setAttribute("data-product", v); }
  });
})();
