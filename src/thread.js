import { db } from "/src/firebaseConfig.js";
import { doc, collection, onSnapshot, getDocs, getDoc, addDoc, query, orderBy, limit } from "firebase/firestore";
import {getUserObject} from "./authentication.js"

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap'; //must create js to export setVisibility function

// helper functions
function setVisible(el, visible) {
    el.classList.toggle('d-none', !visible);
}

function userFlag(userRegion, userGames){

    let flag;

    if (userRegion === "west") {

        switch (userGames) {
            case "CA-QA":
                flag = "./images/country_icons/canada.png"
                break;
            case "CA-SW":
                flag = "./images/country_icons/canada.png"
                break;
            case "NZ-BG":
                flag = "./images/country_icons/new-zealand.png"
                break;
            case "NZ-EG":
                flag = "./imagescountry_icons/new-zealand.png"
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
// helper functions

//creates a subcollection if it doesn't exist yet.
async function seedThread(eventDocRef, userRegion) {

    // returns a reference to a document inside a specified subcollection.
    const docRef = query(collection(eventDocRef, userRegion), limit(1));
    const doc = await getDocs(docRef);

    //If the document does not exist, this means the subcollection does not exist.
    if (doc.empty){

        //creates a subcollection with a document that seeds it.
        await addDoc(collection(eventDocRef, userRegion), {
            time: Date.now(),
        });
        console.log("seed succesfully ran");
    }
}

//responsible for logic and rendering content in header.
async function renderHeader(eventDocRef, userGames, userRegion) {

    //stores the header element as an object.
    const container = document.getElementById('header-container')

    //extracts document inside event collection depending on 
    //user selected game.
    //the extracted document's field is stored inside eventData.
    const eventDoc = await getDoc(eventDocRef); 
    const eventData = eventDoc.data();

    let flag = userFlag(userRegion, userGames);

    container.innerHTML = `
    
    <div class="me-3">←</div>
    <img
      src=${flag}
      class="header-icon-custom me-3"
    />
    <button id="thread-information-btn" class="thread-info-btn">
      <div class="fw-bold fs-5">${eventData.name}</div>
      <small>${eventData.date}</small>
      <small>${eventData.time}</small>
    </button>
    `;

    //Redirects user to thread-information using the header as a button.
    const threadInformationBtn = document.getElementById('thread-information-btn')
    const redirect = 'thread-information.html'
    threadInformationBtn?.addEventListener('click', (e) => {
        location.href = redirect;
    });

}

function renderRegionMessage(eventDocRef, userRegion, user) {

    //stores a div element with the following ID as an object.
    const container = document.getElementById('chatbox-container');

    //the query selects a subcollection inside the event document according to user's region.
    //the query then sorts each documnent is sorted according to milliseconds since epoch.
    //onSnapshot runs once to display message field of each document sorted by query.
    //onSnapshot runs once again if a new document is added.
    onSnapshot(
        query(collection(eventDocRef, userRegion), orderBy("time", "asc")),
        (message) => {
            message.docChanges().forEach((newMessage) => {

                //stores data of current document in the loop
                const data = newMessage.doc.data();
                
                if (newMessage.type === "added") {

                    if(data.message != undefined){

                        if (user.uid == data.user) {
                            container.innerHTML += `
                            <div class="d-flex flex-row-reverse gap-3 align-items-center">
                                <img src="./images/account.png" class="chat-icon" />
                                <p class="chat-bubble">${data.message}</p>
                            </div>
                            `;
                            //console.log("user's message");

                        } else {

                            //Stores the user that created the current document
                            //const otherUserName =

                            container.innerHTML += `
                            <div class="d-flex justify-content-start gap-3 align-items-center">
                                <img src="./images/account.png" class="chat-icon" />
                                <div class="chat-bubble">
                                <small>${data.name}</small>
                                <p class="mb-0">${data.message}</p>
                                </div>
                            </div>
                            `;
                            //console.log("other user's message");
                        }
                    }
                }
            })
        }
    );
}

function sendMessage(eventDocRef, userRegion, userName, user) {

    const cameraBtn = document.getElementById('camera-btn')
    const micBtn = document.getElementById('mic-btn')
    const sendBtn = document.getElementById('send-btn')
    const messageInput = document.getElementById('messageInput')

    messageInput?.addEventListener('focus', (e) => {
        setVisible(cameraBtn, false);
        setVisible(micBtn, false);
    });

    messageInput?.addEventListener('blur', (e) => {
        setVisible(cameraBtn, true);
        setVisible(micBtn, true);
    });

    sendBtn?.addEventListener('click', async (e) => {

        await addDoc(collection(eventDocRef, userRegion), {
            message: messageInput.value,
            time: Date.now(),
            user: user.uid,
            name: userName
        })
        
        //Clears the textbox after user clicks send button
        messageInput.value = "";
        //Automatically selects the textbox after using clicks send.
        messageInput.focus();
    });
}

async function initThreadUI() {
    
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

    //gets every document from the event subcollection
    //const docsRef = query(eventSubColRef);

    seedThread(eventDocRef, userRegion);
    renderHeader(eventDocRef, userGames, userRegion);
    renderRegionMessage(eventDocRef, userRegion, user);
    sendMessage(eventDocRef, userRegion, userName, user);
}

initThreadUI(); 