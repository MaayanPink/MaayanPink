// revealing the login containers
const loginContainer1 = document.getElementById('login-container1');
const loginContainer2 = document.getElementById('login-container2');
const newPassword = document.getElementById('new-password');

function show1() {
    loginContainer2.style.display = "none";
    newPassword.style.display = "none";
    if (loginContainer1.style.display === "none") {
        loginContainer1.style.display = "inline-block";
    } else {
        loginContainer1.style.display = "none";
    }
};

function show2() {
    loginContainer1.style.display = "none";
    newPassword.style.display = "none";
    if (loginContainer2.style.display === "none") {
        loginContainer2.style.display = "inline-block";
    } else {
        loginContainer2.style.display = "none";
    }
};

function show4() {
    loginContainer2.style.display = "none"
    newPassword.style.display = "block"
}
//reveal the submit video
const stayCon = document.getElementById('stay-connected')

function show3() {
    stayCon.style.display = "block";
}

function hide3() {
    stayCon.style.display = "none";
}