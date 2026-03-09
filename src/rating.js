import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import "./firebaseConfig.js";

const db = getFirestore();
const auth = getAuth();

async function rateMatch() {
  const rating = document.getElementById("rating").value;
  const user = auth.currentUser;

  if (!user) {
    alert("You must be logged in to rate the match.");
    return;
  }

  try {
    await addDoc(collection(db, "matchRatings"), {
      userId: user.uid,
      matchId: "canada_vs_croatia",
      rating: rating,
      timestamp: new Date(),
    });

    alert("Rating submitted!");
  } catch (error) {
    console.error("Error saving rating:", error);
  }
}
