import { db } from "/src/firebaseConfig.js";
import { doc, collection, onSnapshot, getDocs, getDoc, addDoc, query, orderBy, limit } from "firebase/firestore";
import {getUserObject} from "./authentication.js"
import { userFlag } from "./utilities.js";

// -------------------------------------------------------------
// setVisible()
// -------------------------------------------------------------
// Used to toggle visiblity of an element to none.
//
// Usage:
//   sendMessage();
// -------------------------------------------------------------
function setVisible(el, visible) {
    el.classList.toggle('d-none', !visible);
}

// -------------------------------------------------------------
// seedThread()
// -------------------------------------------------------------
// Seeds a subcollecton if it doesn't exist yet in database by
// generating a document.
// 
// The document only contains date of time it was created. 
//
// Usage:
//   initThreadUI();
// -------------------------------------------------------------
async function seedThread(eventDocRef, userRegion) {

    const docRef = query(collection(eventDocRef, userRegion), limit(1));
    const doc = await getDocs(docRef);

    if (doc.empty){

        await addDoc(collection(eventDocRef, userRegion), {
            time: Date.now(),
        });
        console.log("seed succesfully ran");
    }
}

// -------------------------------------------------------------
// renderHeader()
// -------------------------------------------------------------
// Responsible for logic and rendering content in header.
//
// Usage:
//   initThreadUI();
// -------------------------------------------------------------
async function renderHeader(eventDocRef, userGames, userRegion) {

    const container = document.getElementById('header-container')
    const eventDoc = await getDoc(eventDocRef); 
    const eventData = eventDoc.data();

    let flag = userFlag(userRegion, userGames);

    container.innerHTML += `
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
 
    // Redirects user to thread-information.html
    //
    // CODE IS COMMENTED OUT DUE TO IMPLEMENTATION OF 
    // thread-information.html FEATURES ARE INCOMPLETE
    /* 
    const threadInformationBtn = document.getElementById('thread-information-btn')
    threadInformationBtn?.addEventListener('click', (e) => {
        location.href = 'thread-information.html';
    }); */

    const backBtn = document.getElementById('back-btn')
    backBtn?.addEventListener('click', (e) => {
        location.href = "other-threads.html";
    });

}


// -------------------------------------------------------------
// renderRegionMessage()
// -------------------------------------------------------------
// Extracts documents from event sub collection in database. This
// Documents represent user messages and is sorted by date before
// being rendered on the page.
//
// When this function is called, OnSnapshot runs atleast once
// to extract current documents.
//
// This function runs once again when a new message document is added
// to the subcollection.
//
// Usage:
//   initThreadUI();
// -------------------------------------------------------------
function renderRegionMessage(eventDocRef, userRegion, user) {

    const container = document.getElementById('chatbox-container');

    onSnapshot(
        query(collection(eventDocRef, userRegion), orderBy("time", "asc")),
        (message) => {
            message.docChanges().forEach((newMessage) => {

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

                        } else {
                            container.innerHTML += `
                            <div class="d-flex justify-content-start gap-3 align-items-center">
                                <img src="./images/account.png" class="chat-icon" />
                                <div class="chat-bubble">
                                <small>${data.name}</small>
                                <p class="mb-0">${data.message}</p>
                                </div>
                            </div>
                            `;
                        }
                    }
                }
            })
        }
    );
}


// -------------------------------------------------------------
// sendMessage()
// -------------------------------------------------------------
// Extracts text from an input field and sends this to the database
// under the correct event subcollection.
//
// The data sent is a document containing details and the text
// from the input as the message.
//
// These are the following fields in the document sent to firestore. 
//
// message: user's message from input element.
// time: Creates a date object counting milliseconds since epoch. 
// user: user's id.
// name: user's name.
//
// Usage:
//   initThreadUI();
// -------------------------------------------------------------
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

// -------------------------------------------------------------
// initThreadUI()
// -------------------------------------------------------------
// Initializes the page by loading the current user's data
// and calling the functions needed to render the UI.
// -------------------------------------------------------------
async function initThreadUI() {
    //gets current user object from firebase
    const user = await getUserObject();

    //Extracts current user's name as well as their selected region and game 
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const userData = userDoc.data();
    const userName = userData.name;
    const userRegion = userData.region;  //ex: west
    const userGames = userData.games;

    if (userGames.length === 1){
        //gets a referece to document inside the events collection 
        //depending on what game the user selected.
        const eventDocRef = doc(db, "events", userGames[0]); 

        seedThread(eventDocRef, userRegion);
        renderHeader(eventDocRef, userGames[0], userRegion);
        renderRegionMessage(eventDocRef, userRegion, user);
        sendMessage(eventDocRef, userRegion, userName, user);

    } else {
        const userGame = localStorage.getItem('selectedThread')
        const eventDocRef = doc(db, "events", userGame);

        seedThread(eventDocRef, userRegion);
        renderHeader(eventDocRef, userGame, userRegion);
        renderRegionMessage(eventDocRef, userRegion, user);
        sendMessage(eventDocRef, userRegion, userName, user);
    }
}

initThreadUI(); 