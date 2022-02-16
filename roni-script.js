// reviling the login containers
function show1() {
    const loginContainer1 = document.getElementById('login-container1');
    const loginContainer2 = document.getElementById('login-container2');
    loginContainer2.style.display = "none";
    if (loginContainer1.style.display === "none") {
        loginContainer1.style.display = "inline-block";
    } else {
        loginContainer1.style.display = "none";
    }
};

function show2() {
    const loginContainer1 = document.getElementById('login-container1');
    const loginContainer2 = document.getElementById('login-container2');
    loginContainer1.style.display = "none";
    if (loginContainer2.style.display === "none") {
        loginContainer2.style.display = "inline-block";
    } else {
        loginContainer2.style.display = "none";
    }
};