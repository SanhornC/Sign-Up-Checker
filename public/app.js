// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDocs, updateDoc, query, collection, where, doc, getFirestore, setDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyAS93ZcfbigenxgGBksjYQHzt_sBy1BTF8",
  authDomain: "signupchecker-7646c.firebaseapp.com",
  projectId: "signupchecker-7646c",
  storageBucket: "signupchecker-7646c.appspot.com",
  messagingSenderId: "1076540516134",
  appId: "1:1076540516134:web:94b2609931eaa57cd6c3e7",
  measurementId: "G-CRQV5G53JL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
// console.log("hello")
// console.log(app)

// document.getElementById("process").addEventListener("click", () => {
//     const fileInput = document.getElementById('csvFileInput');
    
//     // Ensure that a file has been selected
//     if (!fileInput.files.length) {
//       alert("Please select a CSV file first.");
//       return;
//     }
    
//     const file = fileInput.files[0];
  
//     // Parse the CSV file
//     Papa.parse(file, {
//       header: true, // If your CSV has headers, this will read them as field names
//       skipEmptyLines: true, // Skip empty lines
//       complete: function(results) {
//         const data = results.data;
  
//         // Process each row of the CSV
//         data.forEach((row, index) => {
//           const name = row["Full Name"];
//           const netId = row["NetID"];
//           const year = row["What year are you in?"];
//           const membership = row["Do you have TSA membership card?"];
  
//           // Call the function to upload this data to Firestore
//           uploadParticipantData(`participant_${index + 1}`, name, netId, year, membership);
//         });

//         if (fileInput.files.length) {
//             alert("Upload Success");
//         }
//       }
//     });
//   });
  
//   // Upload participant data to Firestore
//  async function uploadParticipantData(participantId, name, netId, year, membership) {
//     // Firebase setup should already be in place here (as in previous examples)
//     try {
//       const participantRef = doc(db, "tsa_bbq", participantId);
  
//       await setDoc(participantRef, {
//         Name: name,
//         NetId: netId,
//         Year: year,
//         Table: "0",  // Default value
//         Membership: membership,
//         CheckIn: "0"
//       });
  
//       console.log(`${participantId} added successfully!`);
//     } catch (error) {
//       console.error("Error adding participant: `", error);
//     }
//     // console.log(participantId, name, netId, year, membership);
//   }

  // Search 
  const checkInButton = document.getElementById('search-button');
  const netIdInput = document.getElementById('search');

// Event listener for the check-in button
checkInButton.addEventListener('click', async () => {
    document.getElementById('checkin-h2').style.display = 'none';
    document.getElementById('search').style.display = 'none';
    document.getElementById('search-button').style.display = 'none';
    document.getElementById('loading-circle').style.display = 'block';
    setTimeout(async function() {
        document.getElementById('loading-circle').style.display = 'none';
        // pick a random number between 0 and 1
        const netId = netIdInput.value.trim(); // Get the inputted NetID

        if (!netId) {
            alert("Please enter your NetID.");
            return;
        }
    
        try {
            // Query Firestore to find the participant with the matching NetID
            const participantsRef = collection(db, "tsa_bbq");
            const q = query(participantsRef, where("NetId", "==", netId), where("CheckIn", "==", "0"));
            const querySnapshot = await getDocs(q);
    
            if (querySnapshot.empty) {
                document.getElementById('not-found-result').style.display = 'flex';
                return;
            }
    
            // Assuming the NetID is unique and we only get one result
            querySnapshot.forEach(async (doc) => {
                // console.log(doc)
                const participantRef = doc.ref;
    
                // Update the CheckIn field to "1"
                await updateDoc(participantRef, {
                    CheckIn: "1"
                });
                ///
                querySnapshot.forEach(async (doc) => {
                    const participantRef = doc.ref;
                    const participantData = doc.data(); // Get the participant data from Firestore
                
                    // Update the CheckIn field to "1"
                    await updateDoc(participantRef, {
                        CheckIn: "1"
                    });
                
                    // Dynamically update the participant information in the HTML
                    document.querySelector('#found-result h4:nth-child(2)').textContent = `Name: ${participantData.Name}`;
                    document.querySelector('#found-result h4:nth-child(3)').textContent = `NetId: ${participantData.NetId}`;
                    document.querySelector('#found-result h4:nth-child(4)').textContent = `Year: ${participantData.Year}`;
                    document.querySelector('#found-result h4:nth-child(5)').textContent = `Membership Card: ${participantData.Membership}`;
                    document.querySelector('#found-result h4:nth-child(6)').textContent = `Table: ${participantData.Table}`;
                
                    // Show the result section after updating the content
                });
                ///
                document.getElementById('found-result').style.display = 'flex';
            });
            
        }
        catch (error) {
            document.getElementById('not-found-result').style.display = 'flex';
        }
    }, 1000);
     
});

document.getElementById('confirm-button').addEventListener('click', function() {
    document.getElementById('found-result').style.display = 'none';
    document.getElementById('not-found-result').style.display = 'none';
    document.getElementById('checkin-h2').style.display = 'unset';
    document.getElementById('search').style.display = 'unset';
    document.getElementById('search-button').style.display = 'unset';
});

document.getElementById('back-button').addEventListener('click', function() {
    document.getElementById('found-result').style.display = 'none';
    document.getElementById('not-found-result').style.display = 'none';
    document.getElementById('checkin-h2').style.display = 'unset';
    document.getElementById('search').style.display = 'unset';
    document.getElementById('search-button').style.display = 'unset';
});

