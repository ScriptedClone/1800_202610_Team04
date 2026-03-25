
/*
User collection
- Region 
- Matches array []
- Matches array []

Events collection
- Event document

Event document
- name
 */

import { db } from "/src/firebaseConfig.js";
import { } from "firebase/firestore";

function threadSelect(){

}

function initOtherThreadsUI(){
    
    //gets current user object from firebase
    const user = await getUserObject();

    //Extracts current user's name as well as their selected region and game 
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const userData = userDoc.data();
    const userName = userData.name;
    const userRegion = userData.region;  //ex: west
    const userGames = userData.games[0]; //ex: CA-QA 

    //gets a referece to document inside the events collection 
    //depending on what game the user selected.
    const eventDocRef = doc(db, "events", userGames);


    
}