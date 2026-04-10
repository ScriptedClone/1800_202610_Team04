import { db } from "/src/firebaseConfig.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getUserObject, logoutUser } from "./authentication.js";

// grab buttons from page
const threadButtons = document.querySelectorAll(".thread-btn");
const logoutButton = document.querySelector("#logout-btn");
const profileGreeting = document.querySelector("#profile-greeting");

// country config
const COUNTRY_CONFIG = {
  canada: {
    resolveRegion: () => "west",
    resolveGames: () => ["CA-QA", "CA-SW"],
  },
  "new-zealand": {
    resolveRegion: () => "west",
    resolveGames: () => ["NZ-EG", "NZ-BG"],
  },
  switzerland: {
    resolveRegion: () => "east",
    resolveGames: () => ["CA-SW"],
  },
  egypt: {
    resolveRegion: () => "east",
    resolveGames: () => ["NZ-EG"],
  },
  belgium: {
    resolveRegion: () => "east",
    resolveGames: () => ["NZ-BG"],
  },
  qatar: {
    resolveRegion: () => "east",
    resolveGames: () => ["CA-QA"],
  },
};

let currentUser = null;
let currentRegion = "west";
let selectedGames = [];
let selectedCountry = null;

// takes a country and current region then figures out the final region and game
const resolveCountrySelection = (country, region) => {
  const config = COUNTRY_CONFIG[country];
  if (!config) return null;

  const nextRegion = config.resolveRegion(region);
  const games = config.resolveGames(nextRegion);
  return { region: nextRegion, games };
};

const areGamesEqual = (firstGames, secondGames) => {
  if (!Array.isArray(firstGames) || !Array.isArray(secondGames)) return false;
  if (firstGames.length !== secondGames.length) return false;

  const normalizedFirst = [...firstGames].sort();
  const normalizedSecond = [...secondGames].sort();

  return normalizedFirst.every((game, index) => game === normalizedSecond[index]);
};

// restores the country based on the same region + games logic as country-selection.js
const getCountryFromSelection = (region, games) => {
  if (!Array.isArray(games) || games.length === 0) return null;

  return (
    Object.keys(COUNTRY_CONFIG).find((country) => {
      const selection = resolveCountrySelection(country, region);
      return (
        selection &&
        selection.region === region &&
        areGamesEqual(selection.games, games)
      );
    }) || null
  );
};

// saves the users selection to firestore
const saveCountrySelection = async (uid, country, region) => {
  const selection = resolveCountrySelection(country, region);
  if (!selection) return null;

  await updateDoc(doc(db, "users", uid), {
    region: selection.region,
    games: selection.games,
  });

  return selection;
};

// update button visuals
const setButtonState = (button, isSelected) => {
  button.classList.toggle("is-selected", isSelected);
  button.setAttribute("aria-pressed", String(isSelected));
};

// highlight selected country
const applySelectionState = () => {
  threadButtons.forEach((button) => {
    const country = button.dataset.thread;
    const isSelected = country === selectedCountry;
    setButtonState(button, isSelected);
  });
};

// runs when a user clicks a button
const selectCountry = async (country) => {
  if (!country || !currentUser) return;

  // save old values as a fail safe
  const previousRegion = currentRegion;
  const previousGames = [...selectedGames];
  const previousCountry = selectedCountry;

  const nextSelection = resolveCountrySelection(country, currentRegion);
  if (!nextSelection) return;

  currentRegion = nextSelection.region;
  selectedGames = [...nextSelection.games];
  selectedCountry = country;
  applySelectionState();

  try {
    // fire to firestore
    const persisted = await saveCountrySelection(currentUser.uid, country, previousRegion);
    if (!persisted) throw new Error("Could not resolve country selection");
    currentRegion = persisted.region;
    selectedGames = [...persisted.games];
    selectedCountry = country;
    applySelectionState();
  } catch (error) {
    // error handling
    currentRegion = previousRegion;
    selectedGames = previousGames;
    selectedCountry = previousCountry;
    applySelectionState();
    console.error("Failed to update games array:", error);
    alert("Could not update your roles. Please try again.");
  }
};

// greetubg
const initializeSelections = async () => {
  currentUser = await getUserObject();
  if (!currentUser) return;

  // greeting fallback
  const greetingName =
    currentUser.displayName ||
    currentUser.email?.split("@")[0] ||
    "User";
  if (profileGreeting) {
    profileGreeting.textContent = `${greetingName}`;
  }

  const userDoc = await getDoc(doc(db, "users", currentUser.uid));
  if (userDoc.exists()) {
    // reading saved profile data and making sure it has safe defaults
    const data = userDoc.data();
    currentRegion =
      data.region === "east" || data.region === "west" ? data.region : "west";
    selectedGames = Array.isArray(data.games) ? data.games : [];
    selectedCountry = getCountryFromSelection(currentRegion, selectedGames);
  }

  applySelectionState();
};

// click listeners
threadButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectCountry(button.dataset.thread);
  });
});

// logout
if (logoutButton) {
  logoutButton.addEventListener("click", async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Failed to log out:", error);
      alert("Could not log out. Please try again.");
    }
  });
}

initializeSelections();
