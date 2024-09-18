let signUpData = [];
let signedUpPeople = [];
let totalSignedUp = 0;

window.addEventListener('load', () => {
    localStorage.clear(); 
    totalSignedUp = 0;    
    updateCounter();     
});

// Read Excel
document.getElementById('fileUpload').addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // first sheet in the xlsx
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];

        
        signUpData = XLSX.utils.sheet_to_json(firstSheet);
        
       
        document.getElementById('nameInput').disabled = false;
        document.querySelector('button').disabled = false;

        alert("Excel file loaded successfully! You can now search for names.");
    };

    reader.readAsArrayBuffer(file);
});

// Hit Enter to Search
document.getElementById('nameInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') { 
        searchName();
    }
});

function searchName() {
    const nameInput = document.getElementById('nameInput').value.trim().toLowerCase();
    const resultDiv = document.getElementById('result');

    // Reset Everytime
    resultDiv.innerHTML = '';

    
    const found = signUpData.find(row => 
        row["Name"] === nameInput || (row["Name"] && row["Name"].toLowerCase().trim() === nameInput)
    );
    
    if (found) {
        resultDiv.innerHTML = `<p><strong>Name:</strong> ${found["Name"]}</p>
                               <p><strong>Signed Up By:</strong> ${found.Signed_Up_Email}</p>
                               <p><strong>Year:</strong> ${found.Year}</p>
                               <p><strong>Table:</strong> ${found.Table}</p>`;

        if (!signedUpPeople.includes(found["Name"])) {
            totalSignedUp++; // add 1 when person found
            updateCounter(); 

            
            localStorage.setItem('signedUpPeople', JSON.stringify(signedUpPeople));
        }
    } 
    else {
        resultDiv.innerHTML = `<p>No match found.</p>`;
    }
}


function updateCounter() {
    document.getElementById('totalCount').textContent = totalSignedUp;
}


// alert when hit reload
window.addEventListener('beforeunload', function (e) {
    const confirmationMessage = 'Are you sure you want to leave? Your progress will be lost!';
    e.preventDefault(); 
    e.returnValue = confirmationMessage;
});
