import { db } from "/src/firebaseConfig.js";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import {onAuthReady} from "./authentication.js"

// -------------------------------------------------------------
// regionSelect()
// -------------------------------------------------------------
// Sets the user's region depending on which country/flag they select
// on country-selection.html 
//
// Matches related to this country are also written to the user's games
// array in database/firestore.
function regionSelect() {

    const canadaBtn = document.getElementById('canada-btn');
    const newZealandBtn = document.getElementById('new-zealand-btn');
    const switzerlandBtn = document.getElementById('switzerland-btn');
    const egyptBtn = document.getElementById('egypt-btn');
    const belgiumBtn = document.getElementById('belgium-btn');
    const qatarBtn = document.getElementById('qatar-btn');
    const redirect = 'other-threads.html';

    onAuthReady((user) => {

        canadaBtn.addEventListener('click', async () => {
            await updateDoc(doc(db, "users", user.uid), {
                region: "west",
                games: arrayUnion("CA-QA", "CA-SW")
            });
            location.href = redirect;
        });

        newZealandBtn.addEventListener('click', async () => {
            await updateDoc(doc(db, "users", user.uid), {
                region: "west",
                games: arrayUnion("NZ-EG", "NZ-BG")
            });
            location.href = redirect;
        });

        switzerlandBtn.addEventListener('click', async () => {
            await updateDoc(doc(db, "users", user.uid), {
                region: "east",
                games: arrayUnion("CA-SW")
            });
            location.href = redirect;
        });

        egyptBtn.addEventListener('click', async () => {
            await updateDoc(doc(db, "users", user.uid), {
                region: "east",
                games: arrayUnion("NZ-EG")                
            });
            location.href = redirect;
        });

        belgiumBtn.addEventListener('click', async () => {
            await updateDoc(doc(db, "users", user.uid), {
                region: "east",
                games: arrayUnion("NZ-BG")               
            });
            location.href = redirect;
        });

        qatarBtn.addEventListener('click', async () => {
            await updateDoc(doc(db, "users", user.uid), {
                region: "east",
                games: arrayUnion("CA-QA")                
            });
            location.href = redirect;
        });

    });
}

regionSelect();