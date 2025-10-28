// Regex patterns for password, email, and phone validation
const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
const emailRegex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
const phoneRegex = new RegExp("^07\\d{8,9}$");

// ADD SCORE
// Function to register a new user
function registerUser(){ 
    // Variables to check if the inputs are valid
    let nameCheck = false;
    let passwordCheck = false;
    let emailCheck = false;
    let phoneCheck = false;

    // Get the values from the inputs
    const register_name = document.getElementById("registerName").value;
    const register_password = document.getElementById("registerPassword").value;
    const register_email = document.getElementById("registerEmail").value;
    const register_phone = document.getElementById("registerPhone").value;

    // An object to hold the registration data
    const registerData = {
        name: register_name,
        password: register_password,
        email: register_email,
        phone: register_phone,
    }
    
    // Checking if the name is valid
    if(register_name.length >= 3 && register_name.length <= 20) {
        if (localStorage.getItem(register_name) !== null){ 
            showError("errorName", "Name already taken!");
        }
        else {
            nameCheck = true;
            hideError("errorName");
        }
    } else {
        showError("errorName", "Name must be 3-20 characters long");
    }

    // Checking if the password is valid
    if(strongRegex.test(register_password)) {
        passwordCheck = true;
        hideError("errorPassword");
    } else {
        showError("errorPassword", "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
    };

    // Checking if the email is valid
    if(emailRegex.test(register_email)) {
        emailCheck = true;
        hideError("errorEmail");
    } else {
        showError("errorEmail", "Invalid email address!");
    }

    // Checking if the phone number is valid
    if(phoneRegex.test(register_phone)) {
        phoneCheck = true;
        hideError("errorPhone");
    } else {
        showError("errorPhone", "Invalid phone number! It should start with 07 and be 10-11 digits long.");
    }

    // Checking if all inputs are valid
    if (nameCheck && passwordCheck && emailCheck && phoneCheck) {
        // Converting the users data into JSON and storing it in local storage
        const registerDataStr = JSON.stringify(registerData);
        localStorage[registerData.name] = registerDataStr;
        // Changes window after 1 second
        setTimeout(() => {window.location.href = "index.html"}, 1000);
    }
}

// Helper functions to show and hide error messages
function showError(id, message) {
    const elementID = document.getElementById(id);
    elementID.innerHTML = message;
    elementID.classList.remove("hidden");
}
function hideError(id) {
    const elementID = document.getElementById(id);
    elementID.innerHTML = "";
    elementID.classList.add("hidden");
}

// Function to log the user in
function loginUser(){
    // Get the values from the inputs
    const login_name = document.getElementById("loginName").value;
    const login_password = document.getElementById("loginPassword").value;

    if(localStorage[login_name] === undefined) {
        showError("errorLoginName", "User not found!");
    } else {
        hideError("errorLoginName");
        const userObj = JSON.parse(localStorage[login_name]);
        
        if (login_password === userObj.password) {
            hideError("errorLoginPassword");
            sessionStorage.setItem("loggedInUser", login_name);
            setTimeout(() => {window.location.href = "game.html"}, 1000);
        } else {
            showError("errorLoginPassword", "Incorrect password!");
        }
    }
}