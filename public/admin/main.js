import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDocs, collection, getFirestore } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAS93ZcfbigenxgGBksjYQHzt_sBy1BTF8",
  authDomain: "signupchecker-7646c.firebaseapp.com",
  projectId: "signupchecker-7646c",
  storageBucket: "signupchecker-7646c.appspot.com",
  messagingSenderId: "1076540516134",
  appId: "1:1076540516134:web:94b2609931eaa57cd6c3e7",
  measurementId: "G-CRQV5G53JL"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', function() {
    const isAuthenticated = sessionStorage.getItem('authenticated');

    if (isAuthenticated !== 'true') {
        const password = prompt('Enter the password:');
        const correctPassword = "uiuctsa";

        if (password !== correctPassword) {
            alert('Incorrect password. Redirecting to login page.');
            window.location.href = '../index.html';
        } else {
            sessionStorage.setItem('authenticated', 'true');
        }
    }
});

async function fetchParticipants() {
    const querySnapshot = await getDocs(collection(db, "tsa_bbq"));
    
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const { Name, NetId, Table, Payment } = data;
        const participantElement = document.createElement('div');

        participantElement.classList.add('checkin-people');
        participantElement.innerHTML = `
        <div class="checkin-list-header-item">${Name}</div>
        <div class="checkin-list-header-item">${NetId}</div>
        <div class="checkin-list-header-item">${Table || 0}</div>
        <div class="checkin-list-header-item">${Payment == '1' ? 'Yes' : 'No'}</div>
        `;

        if (CheckIn == '1') {
            document.getElementById('checked-in-list').appendChild(participantElement);
        } else {
            document.getElementById('not-checked-in-list').appendChild(participantElement);
        }
    });
}

window.onload = fetchParticipants;