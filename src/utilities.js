import {
    onAuthReady
} from "./authentication.js"

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../styles/root.css";
import "../styles/header-footer.css"
import 'bootstrap';

export function showName() {
      const nameElement = document.getElementById("name-goes-here");

      onAuthReady((user) => {
          const name = user.displayName || user.email;

          if (nameElement) {
              nameElement.textContent = `${name}`;
          }
      });
}

export function userFlag(userRegion, userGames){

    let flag;

    if (userRegion === "west") {

        switch (userGames) {
            case "CA-QA":
                flag = "./images/country_icons/canada.png"
                break;g
            case "CA-SW":
                flag = "./images/country_icons/canada.png"
                break;
            case "NZ-BG":
                flag = "./images/country_icons/new-zealand.png"
                break;
            case "NZ-EG":
                flag = "./images/country_icons/new-zealand.png"
                break;
        }
    } else if (userRegion === "east") {

        switch (userGames) {
            case "CA-QA":
                flag = "./images/country_icons/qatar.png"
                break;
            case "CA-SW":
                flag = "./images/country_icons/switzerland.png"
                break;
            case "NZ-BG":
                flag = "./images/country_icons/belgium.png"
                break;
            case "NZ-EG":
                flag = "./images/country_icons/egypt.png"
                break;
        }
    }
    return flag;
}