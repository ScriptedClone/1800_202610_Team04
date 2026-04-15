import {
    onAuthReady
} from "./authentication.js"

// Imports Bootstrap styles and JavaScript so Bootstrap classes 
// and interactive components work across the app.
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'bootstrap';

// Imports root.css which is responsible for the application's 
// color palette and header-footer.css which is responsible
// for styling the header and footer.
import "../styles/root.css";
import "../styles/header-footer.css"



// -------------------------------------------------------------
// showName()
// -------------------------------------------------------------
// Returns the name of the user by extracting it from firebase.
//
// Usage:
//  profile.js
// -------------------------------------------------------------
export function showName() {
      const nameElement = document.getElementById("name-goes-here");

      onAuthReady((user) => {
          const name = user.displayName || user.email;

          if (nameElement) {
              nameElement.textContent = `${name}`;
          }
      });
}


// -------------------------------------------------------------
// userFlag()
// -------------------------------------------------------------
// Returns a string that represents a file path to country images
// depending on user's user region and games/matches.
//
// Usage:
//  thread.js
//  other-threads.js
// -------------------------------------------------------------
export function userFlag(userRegion, userGames){

    let flag;

    if (userRegion === "west") {

        switch (userGames) {
            case "CA-QA":
                flag = "/images/country_icons/canada.png"
                break;
            case "CA-SW":
                flag = "/images/country_icons/canada.png"
                break;
            case "NZ-BG":
                flag = "/images/country_icons/new-zealand.png"
                break;
            case "NZ-EG":
                flag = "/images/country_icons/new-zealand.png"
                break;
        }
    } else if (userRegion === "east") {

        switch (userGames) {
            case "CA-QA":
                flag = "/images/country_icons/qatar.png"
                break;
            case "CA-SW":
                flag = "/images/country_icons/switzerland.png"
                break;
            case "NZ-BG":
                flag = "/images/country_icons/belgium.png"
                break;
            case "NZ-EG":
                flag = "/images/country_icons/egypt.png"
                break;
        }
    }
    return flag;
}
