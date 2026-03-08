import { db } from "/src/firebaseConfig.js";
import { doc, updateDoc } from "firebase/firestore";
import { auth } from "/src/firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';


function regionSelect() {

    const westernHemisphere = document.getElementById('westernHemisphereBtn');
    const easternHemisphere = document.getElementById('easternHemisphereBtn');
    const redirectGameSelection = 'game-selection.html';

    onAuthStateChanged(auth, (user) => {

        westernHemisphere.addEventListener('click', async () => {
            await updateDoc(doc(db, "users", user.uid), {
                region: "west"
            });
            location.href = redirectGameSelection;
            console.log("Region selected");
        });

        easternHemisphere.addEventListener('click', async () => {
            await updateDoc(doc(db, "users", user.uid), {
                region: "east"
            });
            location.href = redirectGameSelection;
            console.log("Region selected");
        });

    });
}

regionSelect();