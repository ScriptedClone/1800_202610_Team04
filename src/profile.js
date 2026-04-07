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
    resolveRegion: (region) =>
      region === "east" || region === "west" ? region : "west",
    resolveGame: (region) => (region === "east" ? "CA-QA" : "CA-SW"),
  },
  "new-zealand": {
    resolveRegion: () => "west",
    resolveGame: () => "NZ-BG",
  },
  switzerland: {
    resolveRegion: () => "east",
    resolveGame: () => "CA-SW",
  },
  egypt: {
    resolveRegion: () => "east",
    resolveGame: () => "NZ-EG",
  },
  belgium: {
    resolveRegion: () => "east",
    resolveGame: () => "NZ-BG",
  },
  qatar: {
    resolveRegion: () => "east",
    resolveGame: () => "CA-QA",
  },
};

let currentUser = null;
let currentRegion = "west";
let selectedCode = null;

// takes a country and current region then figures out the final region and game
const resolveCountrySelection = (country, region) => {
  const config = COUNTRY_CONFIG[country];
  if (!config) return null;

  const nextRegion = config.resolveRegion(region);
  const gameCode = config.resolveGame(nextRegion);
  return { region: nextRegion, gameCode };
};

// saves the users selection to firestore
const saveCountrySelection = async (uid, country, region) => {
  const selection = resolveCountrySelection(country, region);
  if (!selection) return null;

  await updateDoc(doc(db, "users", uid), {
    region: selection.region,
    games: [selection.gameCode],
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
    const selection = resolveCountrySelection(country, currentRegion);
    const isSelected = !!selection && selection.gameCode === selectedCode;
    setButtonState(button, isSelected);
  });
};

// runs when a user clicks a button
const selectCountry = async (country) => {
  if (!country || !currentUser) return;

  // save old values as a fail safe
  const previousRegion = currentRegion;
  const previousCode = selectedCode;

  const nextSelection = resolveCountrySelection(country, currentRegion);
  if (!nextSelection) return;

  currentRegion = nextSelection.region;
  selectedCode = nextSelection.gameCode;
  applySelectionState();

  try {
    // fire to firestore
    const persisted = await saveCountrySelection(currentUser.uid, country, previousRegion);
    if (!persisted) throw new Error("Could not resolve country selection");
    currentRegion = persisted.region;
    selectedCode = persisted.gameCode;
    applySelectionState();
  } catch (error) {
    // error handling
    currentRegion = previousRegion;
    selectedCode = previousCode;
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
    profileGreeting.textContent = `Hello ${greetingName}`;
  }

  const userDoc = await getDoc(doc(db, "users", currentUser.uid));
  if (userDoc.exists()) {
    // reading saved profile data and making sure it has safe defaults
    const data = userDoc.data();
    currentRegion =
      data.region === "east" || data.region === "west" ? data.region : "west";
    const games = Array.isArray(data.games) ? data.games : [];
    selectedCode = games[0] || null;
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