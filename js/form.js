//--------------------------------------------------------
// Supabase client setup
//--------------------------------------------------------
// Import the Supabase client library and create a client instance
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
// Replace with your Supabase project URL
const supabaseUrl = 'https://yukpyahqpxkokroinolm.supabase.co';
// Replace with your Supabase project API key
const supabaseKey = 'sb_publishable_mKXqf_jq5XxWmElobKEGpQ_G9SowyP_';
// Create a Supabase client instance
const supabase = createClient(supabaseUrl, supabaseKey);
//--------------------------------------------------------
// Handle form submission and insert data into Supabase
//--------------------------------------------------------
//Get the form element by its name
const form = document.forms['mobile-techno-form'];
//Add an event listener to the form for the 'submit' event
form.addEventListener('submit', async (e) => {
    //Prevent the default form submission behavior
    e.preventDefault();
    //Get the values from the form fields
    const fname = document.getElementById('fname').value.trim();
    const lname = document.getElementById('lname').value.trim();
    const addressline1 = document.getElementById('addressInput1').value.trim();
    const addressline2 = document.getElementById('addressInput2').value.trim();
    const townInput = document.getElementById('townInput').value.trim();
    const gender = document.querySelector('input[name="genderRadios"]:checked')?.value || '';
    const selected_mobile_phone_type = Array.from(
        document.querySelectorAll('input[name="mobileChecks"]:checked')
    )
    const mobile_phone_type = selected_mobile_phone_type.map(cb => cb.value).join(', ');
    const mobile_provider = document.getElementById('mobileProviderInput').value;
    const mobile_usages = document.getElementById('mobileUsageInput').value.trim();
    console.log('data: ' + fname + ' ' + lname + ' ' + addressline1 + ' ' + addressline2 + ' ' + townInput + ' ' + gender + ' ' + mobile_phone_type + ' ' + mobile_provider + ' ' + mobile_usages);
    //Validate the form data (you can add more validation as needed)
    if (!fname || !lname || !addressline1 || !townInput || !gender || !mobile_phone_type || !mobile_usages) {
        alert('Please fill in all fields.');
        return;
    }
    //Authenticate the user with Supabase (replace with your own email and password)
    const email = 'ben259a123@gmail.com'; // Replace with your email
    const password = 'ben259a123'; // Replace with your password
    // Handle the authentication result
    const authData = await authenticateUser(email, password);
    if (!authData) {
        console.error('Authentication failed');
        return;
    }

    await insertData(fname, lname, addressline1, addressline2, townInput, gender, mobile_phone_type, mobile_provider, mobile_usages);
});
//--------------------------------------------------------
//"InsertData" function to insert the form data into the 'mobiletechnologyform' table
//--------------------------------------------------------
//Asynchronous function
async function insertData(fname, lname, addressline1, addressline2, townInput, gender, mobile_phone_type, mobile_provider, mobile_usages) {
    // Insert the data into the 'mobiletechnologyform' table in Supabase
    const { data, error } = await supabase
        .from('mobiletechnologyform')
        .insert([{
            fname,
            lname,
            address_line1: addressline1,
            address_line2: addressline2,
            town_city: townInput,
            gender,
            mobile_phone_type,
            mobile_provider,
            mobile_usages
        }
        ])
        .select();
    // Check for errors and log them to the console
    if (error) {
        console.error('Supabase insert error:', error);
        alert(`Insert failed: ${error.message}`);
        return null;
    }
    // Return the inserted data
    alert('Data inserted successfully!');
    return data;
}
//--------------------------------------------------------
//Function to authenticate the uer with Supabase using email and password
//--------------------------------------------------------
async function authenticateUser(email, password) {
    try {
        // Attempt to sign in the user with the provided email and password
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });
        // Check for errors and log them to the console
        if (error) {
            console.error('Error authenticating user:', error);
            return null;
        }
        // Return the authenticated user data
        return data; //data.user
    } catch (error) {
        // Log any unexpected errors to the console
        console.error('Unexpected error during authentication:', error);
        return null;
    }
}

// BUTTONS SCRIPT

const toggleButtons = document.querySelectorAll('#form-buttons button[data-bs-toggle="collapse"]');
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
