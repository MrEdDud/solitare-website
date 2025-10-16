// Regex patterns for password, email, and phone validation
const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
const emailRegex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
const phoneRegex = new RegExp("^07\\d{8,9}$");

// Function to register a new user
function registerUser(){
    // Variables to check if the inputs are valid
    let nameCheck = false;
    let passwordCheck = false;
    let emailCheck = false;
    let phoneCheck = false;

    // Get the values from the inputs
    let register_name = document.getElementById("registerName").value;
    let register_password = document.getElementById("registerPassword").value;
    let register_email = document.getElementById("registerEmail").value;
    let register_phone = document.getElementById("registerPhone").value;

    // An object to hold the registration data
    const registerData = {
        name: register_name,
        password: register_password,
        email: register_email,
        phone: register_phone,
    }
    
    // Checking if the name is valid
    if(register_name.length >= 3 && register_name.length <= 20) {
        nameCheck = true;
    } else {
        console.log("Invalid name");
        // popup
    }

    // Checking if the password is valid
    if(strongRegex.test(register_password)) {
        document.getElementById("registerPassword").style.backgroundColor = "#588157";
        passwordCheck = true;
    } else if(mediumRegex.test(register_password)) {
        document.getElementById("registerPassword").style.backgroundColor = "#fdb833";
    } else {
        document.getElementById("registerPassword").style.backgroundColor = "#9d0208";
    };

    // Checking if the email is valid
    if(emailRegex.test(register_email)) {
        emailCheck = true;
    } else {
        console.log("Invalid email");
        // popup
    }

    // Checking if the phone number is valid
    if(phoneRegex.test(register_phone)) {
        phoneCheck = true;
    } else {
        console.log("Invalid phone number");
        // popup
    }

    // Checking if all inputs are valid
    if (nameCheck && passwordCheck && emailCheck && phoneCheck) {
        // Converting the users data into JSON and storing it in local storage
        const registerDataStr = JSON.stringify(registerData);
        localStorage[registerData.name] = registerDataStr;

        console.log("All inputs are valid");
        setTimeout(() => {window.location.href = "game.html"}, 1000);
    }
}

// Function to log the user in
function loginUser(){
    // Get the values from the inputs
    let login_name = document.getElementById("loginName").value;
    let login_password = document.getElementById("loginPassword").value;

    if(localStorage[login_name] === undefined) {
        console.log("User not found");
        // popup
    } else {
        let userObj = JSON.parse(localStorage[login_name]);

        if (login_password === userObj.password) {
            console.log("Login successful");
            // popup
            setTimeout(() => {window.location.href = "game.html"}, 1000);
        } else {
            console.log("Incorrect password");
            // popup
        }
    }
}