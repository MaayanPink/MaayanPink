import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseApp = initializeApp({

    apiKey: "AIzaSyBUn2djUt6InDbVaS9MlHuPi1vPdoZyHkE",
    authDomain: "final-project-5e1fa.firebaseapp.com",
    projectId: "final-project-5e1fa",
    storageBucket: "final-project-5e1fa.appspot.com",
    messagingSenderId: "196218979082",
    appId: "1:196218979082:web:1990703aa62829ade730f3",
    measurementId: "G-0Z0WELGY07"
});

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

onAuthStateChanged(auth, user => {
    if (user != null) {
        console.log('User is signed in.')
    } else {
        console.log('User is signed out.')
    }
});

//sign up
const newLogin = document.querySelector('#new-login');
newLogin.reset();
newLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    //get user info
    const email = newLogin['signup-email'].value;
    const password = newLogin['signup-password'].value;
    console.log(email, password);
    //sign up the user
    const userCredential = createUserWithEmailAndPassword(auth, email, password).then(userCredential => {
        console.log(userCredential.user);
        newLogin.reset();
        newLogin.querySelector('.error').innerHTML = '';
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        newLogin.querySelector('.error').innerHTML = errorMessage;
    });
});

$('.sub1').click(function() {
    onAuthStateChanged(auth, user => {
        if (user != null) {
            $('.login-container1').hide(500);
        } else {
            $('.login-container1').show(0);
        }

    });
});


//sign in
const oldLogin = document.querySelector('#old-login');
oldLogin.reset();
oldLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    //get user info
    const email = oldLogin['signin-email'].value;
    const password = oldLogin['signin-password'].value;
    console.log(email, password);
    //sign in  user
    const userCredential = signInWithEmailAndPassword(auth, email, password).then(userCredential => {
        console.log(userCredential.user);
        oldLogin.reset();
        oldLogin.querySelector('.error').innerHTML = '';
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        oldLogin.querySelector('.error').innerHTML = errorCode;
    });
});

$('.sub2').click(function() {
    onAuthStateChanged(auth, user => {
        if (user != null) {
            $('.login-container2').hide(500);
        } else {
            $('.login-container2').show(0);
        }

    });
});

//sign out 
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    signOut(auth).then(() => {});
});