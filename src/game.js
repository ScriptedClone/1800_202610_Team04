import { db } from "/src/firebaseConfig.js";
import { doc, collection, getDocs, updateDoc, arrayUnion } from "firebase/firestore";
import {onAuthReady} from "./authentication.js"

async function renderEventFields() {
    const snap = await getDocs(collection(db,"events"));

    snap.forEach(doc => { //doc here is not the import from firestore. It is a variable
                          //that contains each DocumentSnapshot inside the events collection.
        const container = document.getElementById(doc.id);
        const data = doc.data();

        container.innerHTML = `
        <p>${data.name}</p>
        <p>${data.date}</p>
        <p>${data.time}</p>
        `;
    });
}

function gameSelect() {

    const canadaQatar = document.getElementById('CA-QA-btn');
    const canadaSwitzerland = document.getElementById('CA-SW-btn');
    const newZealandEgypt = document.getElementById('NZ-EG-btn');
    const newZealandBelgium = document.getElementById('NZ-BG-btn');
    const redirect = 'thread.html'; // change this when someone is able to do
                                    // the next page

    onAuthReady((user) => {

        canadaQatar.addEventListener('click', async () => {
            await updateDoc(doc(db, "users", user.uid), { //This is the example use of doc import
                games: arrayUnion("CA-QA")                //From firestore
            });
            location.href = redirect;
        });
        
        canadaSwitzerland.addEventListener('click', async () => {
            await updateDoc(doc(db, "users", user.uid), {
                games: arrayUnion("CA-SW")
            });
            location.href = redirect;
        });

        newZealandEgypt.addEventListener('click', async () => {
            await updateDoc(doc(db, "users", user.uid), {
                games: arrayUnion("NZ-EG")
            });
            location.href = redirect;
        });

        newZealandBelgium.addEventListener('click', async () => {
            await updateDoc(doc(db, "users", user.uid), {
                games: arrayUnion("NZ-BG")
            });
            location.href = redirect;
        });
    })
}

renderEventFields();
gameSelect();