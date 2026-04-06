import { db } from "/src/firebaseConfig.js";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { getUserObject } from "./authentication.js";

const threadButtons = document.querySelectorAll(".thread-btn");
const selectedThreads = document.querySelector("#selected-threads");

const threadCodeByFlag = {
  canada: "CA-QA",
  qatar: "CA-QA",
  switzerland: "CA-SW",
  "new-zealand": "NZ-BG",
  belgium: "NZ-BG",
  egypt: "NZ-EG",
};

const threadLabelByCode = {
  "CA-QA": "Canada vs Qatar",
  "CA-SW": "Canada vs Switzerland",
  "NZ-BG": "New Zealand vs Belgium",
  "NZ-EG": "New Zealand vs Egypt",
};

let currentUser = null;
let selectedCodes = new Set();

const getCodeForButton = (button) => threadCodeByFlag[button.dataset.thread];

const getButtonsForCode = (code) =>
  Array.from(threadButtons).filter((button) => getCodeForButton(button) === code);

const setButtonState = (button, isSelected) => {
  button.classList.toggle("is-selected", isSelected);
  button.setAttribute("aria-pressed", String(isSelected));

  const status = button.querySelector(".thread-status");
  if (status) {
    status.textContent = isSelected ? "Subscribed" : "Subscribe";
  }
};

const applyCodeState = (code, isSelected) => {
  getButtonsForCode(code).forEach((button) => setButtonState(button, isSelected));
};

const updateSelectedList = () => {
  selectedThreads.innerHTML = "";

  if (selectedCodes.size === 0) {
    const empty = document.createElement("span");
    empty.className = "empty-roles";
    empty.textContent = "No roles selected";
    selectedThreads.appendChild(empty);
    return;
  }

  Array.from(selectedCodes).forEach((code) => {
    const representative = getButtonsForCode(code)[0];
    const image = representative?.querySelector("img")?.getAttribute("src");
    const label = threadLabelByCode[code] || code;

    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "selected-chip";
    chip.dataset.threadCode = code;
    chip.innerHTML = `
      <img src="${image}" alt="" />
      <span>${label}</span>
      <span aria-hidden="true">×</span>
    `;

    chip.addEventListener("click", () => {
      toggleCode(code);
    });

    selectedThreads.appendChild(chip);
  });
};

const persistCode = async (code, isSelected) => {
  if (!currentUser) return;
  const userRef = doc(db, "users", currentUser.uid);
  await updateDoc(userRef, {
    games: isSelected ? arrayUnion(code) : arrayRemove(code),
  });
};

const toggleCode = async (code) => {
  const isSelected = !selectedCodes.has(code);
  if (isSelected) {
    selectedCodes.add(code);
  } else {
    selectedCodes.delete(code);
  }

  applyCodeState(code, isSelected);
  updateSelectedList();

  try {
    await persistCode(code, isSelected);
  } catch (error) {
    if (isSelected) {
      selectedCodes.delete(code);
    } else {
      selectedCodes.add(code);
    }
    applyCodeState(code, !isSelected);
    updateSelectedList();
    console.error("Failed to update games array:", error);
    alert("Could not update your roles. Please try again.");
  }
};

const initializeSelections = async () => {
  currentUser = await getUserObject();
  if (!currentUser) return;

  const userDoc = await getDoc(doc(db, "users", currentUser.uid));
  if (userDoc.exists()) {
    const games = userDoc.data().games || [];
    selectedCodes = new Set(games);
    games.forEach((code) => applyCodeState(code, true));
  }

  updateSelectedList();
};

threadButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const code = getCodeForButton(button);
    if (!code) return;
    toggleCode(code);
  });
});

initializeSelections();
