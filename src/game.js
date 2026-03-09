import { db } from "/src/firebaseConfig.js";
import { doc, collection, getDocs, updateDoc, arrayUnion } from "firebase/firestore";
import { auth } from "/src/firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";

async function renderEventFields() {
    const snap = await getDocs(collection(db,"events"));

    snap.forEach(doc => {

        const container = document.getElementById(doc.id);
        const data = doc.data();

        container.innerHTML = `
        <p class="">${data.name}</p>
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
    const redirect = 'skeleton.html'; // change this when someone is able to do
                                      // the next page

    onAuthStateChanged(auth, (user) => {

        canadaQatar.addEventListener('click', async () => {
            await updateDoc(doc(db, "users", user.uid), {
                games: arrayUnion("CA-QA")
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