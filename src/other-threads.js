import { db } from "/src/firebaseConfig.js";
import {getDoc, doc} from "firebase/firestore";
import {getUserObject} from "./authentication.js"
import { userFlag } from "./utilities.js";

// -------------------------------------------------------------
// renderUserThreads()
// -------------------------------------------------------------
// Gets the user's document from firestore and reads the games field
// which contains the threads/matches[CA-QA, CA-SW]. These string are
// used to get the correct document from the event collection.
//
// A list of matches are rendered to the page after getting the correct
// fields from the document.
//
// Usage:
//   initOtherThreadUI();
// -------------------------------------------------------------
async function renderUserThreads(userRegion, userGames) {

    for (const userGame of userGames) {

        const eventDocRef = doc(db, "events", userGame); 
        const container = document.getElementById('threads-container');
        
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

// -------------------------------------------------------------
// threadSelect()
// -------------------------------------------------------------
// Redirects user thread.html 
//
// An event listener is attached to the container holding each button
// and listens to which child button is pressed.
//
// Usage:
//   initOtherThreadUI();
// -------------------------------------------------------------
function threadSelect() {
    const container = document.getElementById('threads-container');
    const redirect = 'thread.html'

    //attaches an event listener to the container holding each
    //button
    container.addEventListener('click', async (e) => {

        //stores the clicked button as an object.
        const button = e.target.closest("button");

        console.log(button.id);

        // prevents the event listener executing when user clicks 
        // anywhere inside the container.
        if (!button){
            return;
        } else {
            localStorage.setItem('selectedThread', button.id)
            location.href = redirect;
        }

    });
}


// -------------------------------------------------------------
// initOtherThreadUI()
// -------------------------------------------------------------
// Initializes the page by loading the current user's thread data
// and rendering the available threads with click handlers.
// -------------------------------------------------------------
async function initOtherThreadsUI(){
    
    //gets current user object from firebase
    const user = await getUserObject();

    //Extracts current user's name as well as their selected region and game 
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const userData = userDoc.data();
    const userRegion = userData.region;  //ex: west
    const userGames = userData.games;    //ex: extracts games array [CA-QA, CQ-SW]

    renderUserThreads(userRegion, userGames);
    threadSelect();
}

initOtherThreadsUI();