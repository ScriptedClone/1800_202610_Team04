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
function addChat(senderClass, text, rating) {
  const box = document.querySelector(".chatbox-custom-bg");
  const row = document.createElement("div");
  row.className = `d-flex ${senderClass} gap-3 align-items-center`;

  const img = document.createElement("img");
  img.src = "./images/account.png";
  img.className = "chat-icon";

  const p = document.createElement("p");
  p.className = "chat-bubble";
  p.textContent = text;

  if (rating != null) {
    const span = document.createElement("span");
    span.className = "chat-rating";
    span.textContent = rating; // e.g. "4/5" or "★★★☆☆"
    p.appendChild(span);
  }

  row.appendChild(img);
  row.appendChild(p);
  box.appendChild(row);
  box.scrollTop = box.scrollHeight; // keep scrolled to bottom
}

document.addEventListener("DOMContentLoaded", () => {
  const msg = document.getElementById("messageInput");
  const rate = document.getElementById("ratingInput");

  // existing code for buttons, etc. …

  msg.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && msg.value.trim() !== "") {
      addChat("justify-content-start", msg.value.trim(), rate.value + "/5");
      msg.value = "";
    }
  });
});
