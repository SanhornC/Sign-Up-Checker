import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDocs, updateDoc, query, collection, where, doc, getFirestore, setDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

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

const checkInButton = document.getElementById('search-button');
const netIdInput = document.getElementById('search');

checkInButton.addEventListener('click', async () => {
    document.getElementById('checkin-h2').style.display = 'none';
    document.getElementById('search').style.display = 'none';
    document.getElementById('search-button').style.display = 'none';
    document.getElementById('loading-circle').style.display = 'block';
    setTimeout(async function () {
        document.getElementById('loading-circle').style.display = 'none';
        const netId = netIdInput.value.trim();

        if (!netId) {
            alert("Please enter your NetID.");
            return;
        }

        try {
            const participantsRef = collection(db, "tsa_bbq");
            const q = query(participantsRef, where("NetId", "==", netId), where("CheckIn", "==", "0"));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                document.getElementById('not-found-result').style.display = 'flex';
                return;
            }

            querySnapshot.forEach(async (doc) => {
                const participantRef = doc.ref;
                await updateDoc(participantRef, {
                    CheckIn: "1"
                });

                querySnapshot.forEach(async (doc) => {
                    const participantRef = doc.ref;
                    const participantData = doc.data();

                    await updateDoc(participantRef, {
                        CheckIn: "1"
                    });

                    document.querySelector('#found-result h4:nth-child(2)').textContent = `Name: ${participantData.Name}`;
                    document.querySelector('#found-result h4:nth-child(3)').textContent = `NetId: ${participantData.NetId}`;
                    document.querySelector('#found-result h4:nth-child(4)').textContent = `Year: ${participantData.Year}`;
                    document.querySelector('#found-result h4:nth-child(5)').textContent = `Membership Card: ${participantData.Membership}`;
                    document.querySelector('#found-result h4:nth-child(6)').textContent = `Table: ${participantData.Table}`;
                });
                document.getElementById('found-result').style.display = 'flex';
            });

        }
        catch (error) {
            document.getElementById('not-found-result').style.display = 'flex';
        }
    }, 1000);

});

document.getElementById('confirm-button').addEventListener('click', function () {
    document.getElementById('found-result').style.display = 'none';
    document.getElementById('not-found-result').style.display = 'none';
    document.getElementById('checkin-h2').style.display = 'unset';
    document.getElementById('search').style.display = 'unset';
    document.getElementById('search-button').style.display = 'unset';
});

document.getElementById('back-button').addEventListener('click', function () {
    document.getElementById('found-result').style.display = 'none';
    document.getElementById('not-found-result').style.display = 'none';
    document.getElementById('checkin-h2').style.display = 'unset';
    document.getElementById('search').style.display = 'unset';
    document.getElementById('search-button').style.display = 'unset';
});


// document.getElementById("process").addEventListener("click", () => {
//     const fileInput = document.getElementById('csvFileInput');

//     if (!fileInput.files.length) {
//         alert("Please select a CSV file first.");
//         return;
//     }

//     const file = fileInput.files[0];

//     Papa.parse(file, {
//         header: true,
//         skipEmptyLines: true,
//         complete: function (results) {
//             const data = results.data;
//             data.forEach((row, index) => {
//                 const name = row["Full Name"];
//                 const netId = row["NetID"];
//                 const year = row["What year are you in?"];
//                 const membership = row["Do you have TSA membership card?"];
//                 uploadParticipantData(`participant_${index + 1}`, name, netId, year, membership);
//             });

//             if (fileInput.files.length) {
//                 alert("Upload Success");
//             }
//         }
//     });
// });

// async function uploadParticipantData(participantId, name, netId, year, membership) {
//     try {
//         const participantRef = doc(db, "tsa_bbq", participantId);

//         await setDoc(participantRef, {
//             Name: name,
//             NetId: netId,
//             Year: year,
//             Table: "0",
//             Membership: membership,
//             CheckIn: "0"
//         });

//         console.log(`${participantId} added successfully!`);
//     } catch (error) {
//         console.error("Error adding participant: `", error);
//     }
// }