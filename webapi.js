//--------------------------------------------------------
// Supabase client setup: Setup the connection between client - server
//--------------------------------------------------------
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
// Replace with your own Supabase project URL and public API key.
const supabaseUrl = 'https://yukpyahqpxkokroinolm.supabase.co';
const supabaseKey = 'sb_publishable_mKXqf_jq5XxWmElobKEGpQ_G9SowyP_';
const supabase = createClient(supabaseUrl, supabaseKey);

// This variable holds every record once it has been loaded from
// Supabase Storage, so filterRecords() can search it without
// re-downloading the file each time the user types.
var allRecords = [];

var searchBox = document.getElementById("searchBox");
var noResultsMessage = document.getElementById("noResultsMessage");

loadDataFromSupabase();

searchBox.addEventListener("keyup", function () {
    filterRecords();
});

//------------------------------------------------------------------
// Download data.json from the "JSON" storage bucket.
//
// Because the bucket is NOT public, we can't just fetch its URL
// directly - we have to go through the Supabase client, the same
// way the table demo goes through supabase.from(...) instead of a
// plain fetch(). The client attaches our API key to the request,
// and Supabase checks that key against the bucket's access rules
// before it will hand the file back.
//
// storage.download() gives us the file back as a Blob (a raw
// chunk of file data), not text, so we then need to turn that
// Blob into text, and then turn that text into a JavaScript
// object with JSON.parse().
//------------------------------------------------------------------
async function loadDataFromSupabase() {

    var downloadResult = await supabase
        .storage
        .from('JSON')
        .download('data.json');

    var fileBlob = downloadResult.data;
    var downloadError = downloadResult.error;

    if (downloadError) {
        console.error('Error downloading data.json from Supabase Storage:', downloadError);
        alert('Error Fetching Data');
        return;
    }

    var fileText = await fileBlob.text();
    var parsedData = JSON.parse(fileText);

    allRecords = parsedData;
    displayRecords(allRecords);
}

// Builds and displays the record cards. Accepts an array so it
// can be reused for both the full list and filtered lists.
function displayRecords(recordsToDisplay) {
    const jsonDataHere = document.getElementById('json-data-here');
    jsonDataHere.innerHTML = "";

    if (recordsToDisplay.length === 0) {
        noResultsMessage.style.display = "block";
        return;
    }

    noResultsMessage.style.display = "none";

    recordsToDisplay.forEach(record => {
        const col = document.createElement('div');
        col.className = 'col-12 col-md-6';

        // inner card / box with padding and full height so gaps look consistent
        const formCard = document.createElement('div');
        formCard.className = 'p-3 h-100';
        formCard.style.backgroundColor = '#EEEEEE';
        formCard.style.border = '1px solid #000';

        let codeSamplesHtml = '';

        if (record.codeSamples && record.codeSamples.length) {
            record.codeSamples.forEach(sample => {
                codeSamplesHtml += `
                        <div class="mt-3">
                            <strong>${sample.name}</strong>
                            <pre class="mb-0">${sample.value}</pre>
                        </div>
                        `;
            });
        }

        formCard.innerHTML = `
                <h3>${record.title}</h3>
                <p>${record.description}</p>
                ${codeSamplesHtml}
                `;

        col.appendChild(formCard);
        jsonDataHere.appendChild(col);
    });
}

var searchTerm = searchBox.value.toLowerCase();
var matchingRecords = [];

for (var i = 0; i < allRecords.length; i++) {

    var record = allRecords[i];

    var titleMatches = record.title.toLowerCase().indexOf(searchTerm) !== -1;
    var descriptionMatches = record.description.toLowerCase().indexOf(searchTerm) !== -1;

    if (titleMatches === true || descriptionMatches === true) {
        matchingRecords.push(record);
    }
}

displayRecords(matchingRecords);

//------------------------------------------------------------------------------------
//Using the Official Supabase Client 
//------------------------------------------------------------------------------------
//The @supabase/supabase-js SDK provides a clean syntax that abstracts raw HTTP requests 
// while routing everything through the /rest/v1/ PostgREST layer   

//Async function to fetch data from the 'mobiletechnologyform' table in Supabase
async function getData() {
    // Fetch data from the 'mobiletechnologyform' table and order by 'created_at' in descending order
    const { data, error } = await supabase
        .from('mobiletechnologyform')
        .select('*')
        .order('created_at', { ascending: false });
    // Check for errors and return an empty array if there is an error
    if (error) {
        console.error('Error fetching data:', error);
        alert('Error Fetching Data');
        return [];
    }
    // Return the fetched data
    return data;
}

// Javascript Async Promise: handle the return Promise
getData().then(data => {
    //Debug: Display the fetched data as a formatted JSON string in the output element
    console.log(JSON.stringify(data, null, 2));

    //Loop through the data and display each record in a formatted way
    data.forEach(record => {
        const outputElement = document.getElementById('rest-data-here');

        // create column wrapper (controls layout: two per row on md+)
        const col = document.createElement('div');
        col.className = 'col-12 col-md-6';

        // inner card / box with padding and full height so gaps look consistent
        const formCard = document.createElement('div');
        formCard.className = 'p-3 h-100';
        formCard.style.backgroundColor = '#EEEEEE';
        formCard.style.border = '1px solid #000';
        formCard.innerHTML = `
                    <h3>${record.fname} ${record.lname} (${record.gender})</h3>
                    <p>Address: ${record.address_line1} ${record.address_line2} ${record.town_city}</p>
                    <p>Mobile Type: ${record.mobile_phone_type}, Provider(s): ${record.mobile_provider}</p>
                    <p>${record.mobile_usage}</p>
                `;

        col.appendChild(formCard);
        outputElement.appendChild(col);
    });
});

// BUTTONS SCRIPT

const toggleButtons = document.querySelectorAll('#json-buttons button[data-bs-toggle="collapse"]');
let activeButton = null;

function resetButtons() {
    toggleButtons.forEach(button => {
        button.classList.add('btn-secondary');
        button.classList.remove('btn-primary');
    });
    activeButton = null;
}

function setActiveButton(button) {
    if (button === activeButton) {
        resetButtons();
        return;
    }

    toggleButtons.forEach(btn => {
        btn.classList.toggle('btn-primary', btn === button);
        btn.classList.toggle('btn-secondary', btn !== button);
    });

    activeButton = button;
}

toggleButtons.forEach(button => {
    button.addEventListener('click', () => setActiveButton(button));
});

resetButtons();