import { db } from "/src/firebaseConfig.js";
import {getDoc, doc} from "firebase/firestore";
import {getUserObject} from "./authentication.js"

function userFlag(userRegion, userGames){

    let flag;

    if (userRegion === "west") {

        switch (userGames) {
            case "CA-QA":
                flag = "./images/country_icons/canada.png"
                break;g
            case "CA-SW":
                flag = "./images/country_icons/canada.png"
                break;
            case "NZ-BG":
                flag = "./images/country_icons/new-zealand.png"
                break;
            case "NZ-EG":
                flag = "./images/country_icons/new-zealand.png"
                break;
        }
    } else if (userRegion === "east") {

        switch (userGames) {
            case "CA-QA":
                flag = "./images/country_icons/qatar.png"
                break;
            case "CA-SW":
                flag = "./images/country_icons/switzerland.png"
                break;
            case "NZ-BG":
                flag = "./images/country_icons/belgium.png"
                break;
            case "NZ-EG":
                flag = "./images/country_icons/egypt.png"
                break;
        }
    }
    return flag;
}

async function renderUserThreads(userRegion, userGames) {

    //userGame will be the current selected game while iterating through the array.
    for (const userGame of userGames) {

        // gets the reference to a document with the value of userGame [ex: CA-QA]
        const eventDocRef = doc(db, "events", userGame); 
        const container = document.getElementById('threads-container');
        
        //Reads the reference and stores it in eventDoc.
        const eventDoc = await getDoc(eventDocRef);
        const eventData = eventDoc.data();
        
        let flag = userFlag(userRegion, userGame);

        container.innerHTML += `
        <div class="threads-bg d-flex justify-content-between align-items-center my-2 px-3">
          <img 
            src=${flag}
            class="icon-img" 
          />
          <div class="d-flex flex-column fw-bold text-white">          
            <p class="m-0">${eventData.name}</p>
            <p class="m-0">30 users</p>
          </div>
          <button id="${userGame}" class="chat-btn">ENTER</button>
        </div>
        `;
    }
}

function threadSelect() {

    const container = document.getElementById('threads-container');
    const redirect = 'thread.html'

    //attaches an event listener to the container holding each
    //button
    container.addEventListener('click', async (e) => {

        //stores the clicked button as an object.
        const button = e.target.closest("button");

        console.log(button.id);
        //prevents the event executing when user clicks 
        // anywhere inside the container.
        if (!button){
            return;
        } else {
            localStorage.setItem('selectedThread', button.id)
            location.href = redirect;
        }

    });
}

async function initOtherThreadsUI(){
    
    //gets current user object from firebase
    const user = await getUserObject();

    //Extracts current user's name as well as their selected region and game 
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const userData = userDoc.data();
    const userRegion = userData.region;  //ex: west
    const userGames = userData.games;    //ex: this gives the games array from user document

    renderUserThreads(userRegion, userGames);
    threadSelect();
}

initOtherThreadsUI();