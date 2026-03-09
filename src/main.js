import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// If you have custom global styles, import them as well:
import "../styles/style.css";
import "../styles/root.css";

function sayHello() {}
// document.addEventListener('DOMContentLoaded', sayHello);

// run after the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const dtEl = document.getElementById("datetime");
  if (dtEl) {
    dtEl.textContent = new Date().toLocaleString();
  }
});
