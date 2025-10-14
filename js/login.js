const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

// Function to log the user in
function loginUser(){
    // Get the values from the inputs
    let login_name = document.getElementById("loginName").value;
    let login_password = document.getElementById("loginPassword").value;

    console.log(`Login name: ${login_name} Login password: ${login_password}`)
    
    return login_name, login_password;
}

// Function to register a new user
function registerUser(){
    // Get the values from the inputs
    let register_name = document.getElementById("registerName").value;
    let register_password = document.getElementById("registerPassword").value;
    let register_email = document.getElementById("registerEmail").value;
    let register_phone = document.getElementById("registerPhone").value;

    const registerData = {
        name: register_name,
        password: register_password,
        email: register_email,
        phone: register_phone,
    }

    if(strongRegex.test(registerData[1])) {
        document.querySelectorAll(".input-r").forEach(element => {
            element.style.backgroundColor = "green";
        });
    } else if(mediumRegex.test(registerData[1])) {
        document.querySelectorAll(".input-r").forEach(element => {
            element.style.backgroundColor = "yellow";
        });
    } else {
        document.querySelectorAll(".input-r").forEach(element => {
            element.style.backgroundColor = "red";
        });
    }

    const registerDataStr = JSON.stringify(registerData);

    console.log(`Register name: ${register_name} Register password: ${register_password} Register email: ${register_email} Register phone: ${register_phone}`)
}

const loginData = {
    name: loginUser()[0],
    password: loginUser()[1],
}

const loginDataStr = JSON.stringify(loginData);

localStorage["fake@email.com"] = loginDataStr;

const loginDataObj = JSON.parse(loginDataStr);

console.log(loginDataStr);
console.log(loginDataObj.password);