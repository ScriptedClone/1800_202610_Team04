import { db } from "./firebaseConfig.js";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const auth = getAuth();
const matchId = "CA-QA"; // match ID

// Show match info
async function renderEventFields() {
  const snap = await getDocs(collection(db, "events"));

  snap.forEach((docSnap) => {
    const container = document.getElementById(docSnap.id);
    const data = docSnap.data();

    if (container) {
      container.innerHTML = `
        <p>${data.name}</p>
        <p>${data.date}</p>
        <p>${data.time}</p>
      `;
    }
  });
}

// Submit rating
async function rateMatch() {
  const rating = Number(document.getElementById("rating").value);
  const user = auth.currentUser;

  if (!user) return alert("Please login");

  const userRef = doc(db, "users", user.uid);

  await updateDoc(userRef, {
    [`rate.${matchId}`]: rating,
  });

  const stars = "⭐".repeat(rating);
  document.getElementById(matchId).innerText = "Your Rating: " + stars;
}

// OR attach listener here (recommended)
document.getElementById("rateBtn").addEventListener("click", rateMatch);

// Sign up user
export async function signupUser(name, email, password) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  const user = cred.user;

  await updateProfile(user, { displayName: name });

  await setDoc(doc(db, "users", user.uid), {
    name,
    email,
    region: "",
    games: [],
    rate: {},
  });

  return user;
}

// Show rating only after match time
async function checkMatchTime() {
  const snap = await getDocs(collection(db, "events"));

  snap.forEach((docSnap) => {
    if (docSnap.id === matchId) {
      const data = docSnap.data();
      const matchTime = new Date(`${data.date} ${data.time}`);

      if (new Date() > matchTime) {
        document.getElementById("rating-container").style.display = "block";
      }
    }
  });
}

renderEventFields();
checkMatchTime();
