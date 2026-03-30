import { getUserObject } from "./authentication.js";
import { db } from "./firebaseConfig.js";
import { doc, getDoc } from "firebase/firestore";

<<<<<<< HEAD
/**
 * Game data lookup table.
 * Each key is a game code, with title and flag paths for each region.
 */
const GAME_DATA = {
  "CA-QA": {
    title: "Canada vs Qatar",
    west: "./images/country_icons/canada.png",
    east: "./images/country_icons/qatar.png",
  },
  "CA-SW": {
    title: "Canada vs Switzerland",
    west: "./images/country_icons/canada.png",
    east: "./images/country_icons/switzerland.png",
  },
  "NZ-BG": {
    title: "New Zealand vs Belgium",
    west: "./images/country_icons/new-zealand.png",
    east: "./images/country_icons/belgium.png",
  },
  "NZ-EG": {
    title: "New Zealand vs Egypt",
    west: "./images/country_icons/new-zealand.png",
    east: "./images/country_icons/egypt.png",
  },
};

/**
 * Returns the flag image path for a given region and game.
 * @param {string} userRegion - "west" or "east"
 * @param {string} userGame - game code e.g. "CA-QA"
 * @returns {string|null} flag image path or null if not found
 */
function userFlag(userRegion, userGame) {
  return GAME_DATA[userGame]?.[userRegion] ?? null;
}

/**
 * Returns the display title for a given game code.
 * @param {string} userGame - game code e.g. "CA-QA"
 * @returns {string} game title or "Unknown Game"
 */
function getGameTitle(userGame) {
  return GAME_DATA[userGame]?.title ?? "Unknown Game";
}

/**
 * Updates the DOM with the flag and title for a given game.
 * @param {string} flagSrc - path to the flag image
 * @param {string} titleText - game title to display
 */
function updateDOM(flagSrc, titleText) {
  const flagImg = document.querySelector(".thread-name-region img");
  const titleDiv = document.querySelector(".thread-name-region .fw-bold.fs-5");

  if (flagImg) flagImg.src = flagSrc ?? "./images/country_icons/default.png";
  if (titleDiv) titleDiv.textContent = titleText;
}

/**
 * Fetches the current user's data from Firestore and
 * updates the thread info section in the DOM.
 */
async function updateThreadInfo() {
  try {
    const user = await getUserObject();
    if (!user) return;

    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (!userDoc.exists()) return;

    const userData = userDoc.data();
    const userRegion = userData.region;
    const userGames = userData.games;

    if (!userRegion || !userGames || userGames.length === 0) return;

    for (const game of userGames) {
      const flagSrc = userFlag(userRegion, game);
      const titleText = getGameTitle(game);
      updateDOM(flagSrc, titleText);
    }
=======
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
>>>>>>> d3985f37b649c4e3cc82e87a1ca6bdf71f3022ef
  } catch (error) {
    console.error("Error updating thread info:", error);
  }
}

<<<<<<< HEAD
updateThreadInfo();
=======
updateThreadInfo();
>>>>>>> d3985f37b649c4e3cc82e87a1ca6bdf71f3022ef
