let cohostCount = 0;

function addCohost() {
    cohostCount++;
    const cohostsContainer = document.getElementById("cohostsContainer");
    const cohostDiv = document.createElement("div");
    cohostDiv.className = "cohost";
    cohostDiv.innerHTML = `
        <h3>Cohost ${cohostCount}:</h3>
        <label for="cohost${cohostCount}Name">Name:</label><br>
        <input type="text" id="cohost${cohostCount}Name" name="cohost${cohostCount}Name"><br><br>
        <label for="cohost${cohostCount}Year">Year (if applicable):</label><br>
        <input type="text" id="cohost${cohostCount}Year" name="cohost${cohostCount}Year"><br><br>
        <label for="cohost${cohostCount}Email">Email:</label><br>
        <input type="email" id="cohost${cohostCount}Email" name="cohost${cohostCount}Email"><br><br>
        <label for="cohost${cohostCount}Major">Major:</label><br>
        <input type="text" id="cohost${cohostCount}Major" name="cohost${cohostCount}Major"><br><br>
    `;
    cohostsContainer.appendChild(cohostDiv);
}

function removeCohost() {
    if (cohostCount > 0) {
        const cohostsContainer = document.getElementById("cohostsContainer");
        cohostsContainer.removeChild(cohostsContainer.lastChild);
        cohostCount--;
    }
}

function createData() {
    const hostName = document.getElementById("hostName").value;
    const year = document.getElementById("year").value;
    const email = document.getElementById("email").value;
    const major = document.getElementById("major").value;
    const showName = document.getElementById("showName").value;
    const showDescription = document.getElementById("showDescription").value;

    let data = `${hostName}\n${year}\n${email}\n${major}\n${showName}\n${showDescription}\n\n`;

    for (let i = 1; i <= cohostCount; i++) {
        const cohostName = document.getElementById(`cohost${i}Name`).value;
        const cohostYear = document.getElementById(`cohost${i}Year`).value; // Get cohost year
        const cohostEmail = document.getElementById(`cohost${i}Email`).value;
        const cohostMajor = document.getElementById(`cohost${i}Major`).value;
        data += `${cohostName}\n${cohostYear}\n${cohostEmail}\n${cohostMajor}\n\n`;
    }

    return data;
}

function writeDatatoFile(data) {
    const blob = new Blob([data], { type: 'text/plain' });
    const link = document.createElement('a');
    console.log(blob);
    link.href = window.URL.createObjectURL(blob);
    link.download = 'wiit_onboarding_data.txt';
    link.click();
}

function convertToCSV(data){
    let csv = '';
    const rows = data.split('\n\n'); // Split into entries

    rows.forEach(row => {
        const values = row.split('\n'); // Split each entry into fields
        const formattedValues = values.map(value => {
            // Escape double quotes and add quotes if necessary
            let escapedValue = value.replace(/"/g, '""');
            if (escapedValue.includes(',') || escapedValue.includes('"') || escapedValue.includes('\n')) {
                escapedValue = `"${escapedValue}"`;
            }
            return escapedValue;
        });
        csv += formattedValues.join(',') + '\n';
    });

    return csv;
}

function writeToServer() {
    const data = createData();
    // convert
    const csvData = convertToCSV(data);

    fetch('/save_data', {  // Send data to the server
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded', // Important!
        },
        body: 'data=' + encodeURIComponent(csvData), // Send data as form data
    })
    .then(response => response.text())
    .then(message => {
        alert(message); // Display server's response (success or error)
        document.getElementById("onboardingForm").reset(); // Clear the form

    })
    .catch(error => {
        alert('Error sending data to server: ' + error);
    });
}

function saveData() {
    let data = createData();
    writeDatatoFile(data);

    document.getElementById("onboardingForm").reset();
    alert("Data saved!");
}

function submitData() {
    writeToServer();
}

function resetForm() {
    document.getElementById("onboardingForm").reset();
    cohostCount = 0;
    document.getElementById("cohostsContainer").innerHTML = "";
}

function loadData(){
    fetch('/view_data')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Parse the JSON response
        })
        .then(data => {
            if (data.error) { // Check for server-side errors
                console.error('Server error:', data.error);
                alert(data.error);
            } else {
                // Store the data in local storage (or a cookie if needed)
                localStorage.setItem('csvData', JSON.stringify(data));

                // Redirect
                window.location.href = '/onboarding_data'; // Adjust path as needed
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Error viewing data. Check the console for details.');
        });
}