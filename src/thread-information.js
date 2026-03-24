import { getUserObject } from "./authentication.js";
import { db } from "./firebaseConfig.js";
import { doc, getDoc } from "firebase/firestore";

// Function to get flag based on user region and game
function userFlag(userRegion, userGame) {
  let flag;
  if (userRegion === "west") {
    switch (userGame) {
      case "CA-QA":
        flag = "./images/country_icons/canada.png";
        break;
      case "CA-SW":
        flag = "./images/country_icons/canada.png";
        break;
      case "NZ-BG":
        flag = "./images/country_icons/new-zealand.png";
        break;
      case "NZ-EG":
        flag = "./images/country_icons/new-zealand.png";
        break;
    }
  } else if (userRegion === "east") {
    switch (userGame) {
      case "CA-QA":
        flag = "./images/country_icons/qatar.png";
        break;
      case "CA-SW":
        flag = "./images/country_icons/switzerland.png";
        break;
      case "NZ-BG":
        flag = "./images/country_icons/belgium.png";
        break;
      case "NZ-EG":
        flag = "./images/country_icons/egypt.png";
        break;
    }
  }
  return flag;
}

// Function to get title based on game
function getGameTitle(userGame) {
  switch (userGame) {
    case "CA-QA":
      return "Canada vs Qatar";
    case "CA-SW":
      return "Canada vs Switzerland";
    case "NZ-BG":
      return "New Zealand vs Belgium";
    case "NZ-EG":
      return "New Zealand vs Egypt";
    default:
      return "Unknown Game";
  }
}
async function updateThreadInfo() {
  try {
    const user = await getUserObject(); //gets the current user
    if (!user) return; // Not logged in

    const userDoc = await getDoc(doc(db, "users", user.uid)); //read user doc by uid
    if (!userDoc.exists()) return;

    const userData = userDoc.data(); //get this data from user doc
    const userRegion = userData.region;
    const userGames = userData.games; // Array

    if (!userRegion || !userGames || userGames.length === 0) return; //first game

    // Assume first game for simplicity
    const currentGame = userGames[0];

    const flagSrc = userFlag(userRegion, currentGame);
    const titleText = getGameTitle(currentGame);

    // Update the DOM
    const flagImg = document.querySelector(".thread-name-region img");
    const titleDiv = document.querySelector(
      ".thread-name-region .fw-bold.fs-5",
    );

    if (flagImg) flagImg.src = flagSrc;
    if (titleDiv) titleDiv.textContent = titleText;
  } catch (error) {
    console.error("Error updating thread info:", error);
  }
}

updateThreadInfo();