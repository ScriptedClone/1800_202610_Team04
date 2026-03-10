import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Modal } from "bootstrap";
import { doc, setDoc } from "firebase/firestore";

// If you have custom global styles, import them as well:
import "../styles/style.css";
import "../styles/root.css";
import "../styles/thread.css";
import { db } from "./firebaseConfig.js";

async function initAuthRouting() {
  const path = window.location.pathname;
  const isLoginPage = path.endsWith("login.html");
  const isProtectedPage = path.endsWith("thread.html");

  if (!isLoginPage && !isProtectedPage) {
    return;
  }

  try {
    const { onAuthReady } = await import("./authentication.js");
    onAuthReady((user) => {
      if (isLoginPage && user) {
        window.location.href = "thread.html";
      }

      if (isProtectedPage && !user) {
        window.location.href = "login.html";
      }
    });
  } catch (error) {
    console.error("Firebase auth initialization failed.", error);
  }
}

function initThreadRating(user) {
  const modalElement = document.getElementById("threadScorePopup");
  const submitButton = document.getElementById("saveThreadScore");
  const feedbackElement = document.getElementById("threadScoreMsg");
  const ratingButtons = Array.from(document.querySelectorAll(".score-btn"));

  if (!modalElement || !submitButton || ratingButtons.length === 0 || !user) {
    return;
  }

  let selectedRating = null;
  const ratingModal = new Modal(modalElement);

  const selectRating = (rating) => {
    selectedRating = rating;
    submitButton.disabled = false;
    feedbackElement.textContent = "";

    ratingButtons.forEach((button) => {
      button.classList.toggle("is-selected", Number(button.dataset.score) === rating);
      button.setAttribute("aria-checked", String(Number(button.dataset.score) === rating));
    });
  };

  ratingButtons.forEach((button) => {
    button.setAttribute("aria-checked", "false");
    button.addEventListener("click", () => {
      selectRating(Number(button.dataset.score));
    });
  });

  submitButton.addEventListener("click", async () => {
    if (!selectedRating) {
      return;
    }

    submitButton.disabled = true;
    feedbackElement.textContent = "Saving rating...";

    try {
      await setDoc(
        doc(db, "Feedback", user.uid),
        {
          rate: selectedRating,
        },
        { merge: true }
      );

      feedbackElement.textContent = "Rating saved.";
      window.setTimeout(() => ratingModal.hide(), 500);
    } catch (error) {
      console.error("Failed to save thread rating.", error);
      feedbackElement.textContent = "Could not save rating. Please try again.";
      submitButton.disabled = false;
    }
  });

  ratingModal.show();
}

document.addEventListener("DOMContentLoaded", async () => {
  await initAuthRouting();

  if (window.location.pathname.endsWith("thread.html")) {
    try {
      const { onAuthReady } = await import("./authentication.js");
      onAuthReady((user) => {
        if (user) {
          initThreadRating(user);
        }
      });
    } catch (error) {
      console.error("Thread rating initialization failed.", error);
    }
  }
});
