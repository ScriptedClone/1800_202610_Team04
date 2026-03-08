import {
    onAuthReady
} from "./authentication.js"

function showName() {
      const nameElement = document.getElementById("name-goes-here");

      onAuthReady((user) => {
          const name = user.displayName || user.email;

          if (nameElement) {
              nameElement.textContent = `${name}`;
          }
      });
}

showName();