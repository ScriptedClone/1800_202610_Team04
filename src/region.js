import { db } from "/src/firebaseConfig.js";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import {onAuthReady} from "./authentication.js"

function regionSelect() {

    const canadaBtn = document.getElementById('canada-btn');
    const newZealandBtn = document.getElementById('new-zealand-btn');
    const switzerlandBtn = document.getElementById('switzerland-btn');
    const egyptBtn = document.getElementById('egypt-btn');
    const belgiumBtn = document.getElementById('belgium-btn');
    const qatar = document.getElementById('qatar-btn');
    const redirect = 'other-threads.html';

    onAuthReady((user) => {

        canadaBtn.addEventListener('click', async () => {
            await updateDoc(doc(db, "users", user.uid), {
                region: "west",
                games: arrayUnion("CA-QA", "CA-SW")
            });
            location.href = redirect;
            console.log("Region selected");
        });

        newZealandBtn.addEventListener('click', async () => {
            await updateDoc(doc(db, "users", user.uid), {
                region: "west",
                games: arrayUnion("NZ-EG", "NZ-BG")
            });
            location.href = redirectGameSelection;
            console.log("Region selected");
        });

        switzerlandBtn.addEventListener('click', async () => {
            await updateDoc(doc(db, "users", user.uid), {
                region: "west"
            });
            location.href = redirect;
            console.log("Region selected");
        });

        egyptBtn.addEventListener('click', async () => {
            await updateDoc(doc(db, "users", user.uid), {
                region: "east"
            });
            location.href = redirectGameSelection;
            console.log("Region selected");
        });

        belgiumBtn.addEventListener('click', async () => {
            await updateDoc(doc(db, "users", user.uid), {
                region: "west"
            });
            location.href = redirect;
            console.log("Region selected");
        });

        qatarBtn.addEventListener('click', async () => {
            await updateDoc(doc(db, "users", user.uid), {
                region: "east"
            });
            location.href = redirectGameSelection;
            console.log("Region selected");
        });

    });
}

regionSelect();