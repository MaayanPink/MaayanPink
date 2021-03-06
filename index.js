import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, collection, getDocs, addDoc, doc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";

const firebaseApp = initializeApp({

    apiKey: "AIzaSyBUn2djUt6InDbVaS9MlHuPi1vPdoZyHkE",
    authDomain: "final-project-5e1fa.firebaseapp.com",
    projectId: "final-project-5e1fa",
    storageBucket: "final-project-5e1fa.appspot.com",
    messagingSenderId: "196218979082",
    appId: "1:196218979082:web:1990703aa62829ade730f3",
    measurementId: "G-0Z0WELGY07"
});

//storage
const storage = getStorage(firebaseApp);

//round-images
const storageRef1 = [ref(storage, 'Roni/at the beach.jpeg'), ref(storage, 'Roni/face jewels.jpeg'), ref(storage, 'Roni/makeup.jpeg')];
const addPic1 = [document.querySelector('.roundimg1'), document.querySelector('.roundimg2'), document.querySelector('.roundimg3')]
for (let i = 0; i < storageRef1.length; i++) {
    for (let j = 0; j < addPic1.length; j++) {
        if (i == j) {
            getDownloadURL(storageRef1[i]).then((url) => {
                addPic1[j].src = url;
            })
        }
    }
}

//Feathers images
const storageRef2 = [ref(storage, 'feathers/feather_1.png'), ref(storage, 'feathers/feather_3.png'), ref(storage, 'feathers/feather_4.png'), ref(storage, 'feathers/feather_1.png')];
const addPic2 = [document.querySelector('.feather1'), document.querySelector('.feather3'), document.querySelector('.feather4'), document.querySelector('.feather2')]
for (let i = 0; i < storageRef2.length; i++) {
    for (let j = 0; j < addPic2.length; j++) {
        if (i == j) {
            getDownloadURL(storageRef2[i]).then((url) => {
                addPic2[j].src = url;
            })
        }
    }
}

//banner images
const storageRef3 = [ref(storage, 'Roni/peace.jpeg'), ref(storage, 'Roni/fire.jpeg')];
const addPic3 = [document.querySelector('.banner-pic1'), document.querySelector('.banner-pic2')]
for (let i = 0; i < storageRef3.length; i++) {
    for (let j = 0; j < addPic3.length; j++) {
        if (i == j) {
            getDownloadURL(storageRef3[i]).then((url) => {
                addPic3[j].src = url;
            })
        }
    }
}

//slider images
const storageRef4 = [ref(storage, 'Roni/dancer.png'), ref(storage, 'Roni/snow.jpg'), ref(storage, 'Roni/my brothers.jpeg'), ref(storage, 'Roni/snow-bro.jpeg'), ref(storage, 'Roni/with my friends.jpeg'), ref(storage, 'Roni/big family.jpeg'), ref(storage, 'Roni/painting with my brother.jpeg'), ref(storage, 'Roni/swinging.jpeg'), ref(storage, 'Roni/eating.jpeg')];
const addPic4 = [document.querySelector('.slider-pic1'), document.querySelector('.slider-pic2'), document.querySelector('.slider-pic3'), document.querySelector('.slider-pic4'), document.querySelector('.slider-pic5'), document.querySelector('.slider-pic6'), document.querySelector('.slider-pic7'), document.querySelector('.slider-pic8'), document.querySelector('.slider-pic9')]
for (let i = 0; i < storageRef4.length; i++) {
    for (let j = 0; j < addPic4.length; j++) {
        if (i == j) {
            getDownloadURL(storageRef4[i]).then((url) => {
                addPic4[j].src = url;
            })
        }
    }
}

//firestore database
const db = getFirestore(firebaseApp);

//collection ref
const colRef = collection(db, 'comments')

//adding a comment to database
const addComment = document.querySelector('.form-group')
addComment.addEventListener('submit', (e) => {
    e.preventDefault();
    addDoc(colRef, {
        name: addComment.name.value,
        comment: addComment.comments.value
    }).then(() => {
        addComment.reset()
    })
});

//get collection data to the console
getDocs(colRef).then((snapshot) => {
    let comments = []
    snapshot.docs.forEach((doc) => {
        comments.push({...doc.data() })
    })
    console.log(comments)
})


// authentication
const auth = getAuth(firebaseApp);

//checking if the user is signed in
onAuthStateChanged(auth, user => {
    if (user != null) {
        console.log('User is signed in.')
    } else {
        console.log('User is signed out.')
        const greet = document.getElementById('hi');
        greet.innerHTML = "";
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
    //console.log(email, password);

    //greeting user
    const num = email.indexOf('@');
    const emailName = email.slice(0, num);
    const greet = document.getElementById('hi');
    greet.innerHTML = "hi, " + emailName

    //sign up the user + error options
    const userCredential = createUserWithEmailAndPassword(auth, email, password).then(userCredential => {
        //console.log(userCredential.user);
        newLogin.reset();
        newLogin.querySelector('.error').innerHTML = '';
    }).catch((error) => {
        const errorCode = error.code;
        var errorMessage = ""
        if (errorCode === "auth/weak-password") {
            errorMessage = "Password should be at least 6 characters"
        } else if (errorCode === "auth/email-already-in-use") {
            errorMessage = "This E-mail is already in use"
        } else if (errorCode === "auth/invalid-email") {
            errorMessage = "invalid E-mail"
        }
        newLogin.querySelector('.error').innerHTML = errorMessage;
    });
});

//closing the signup container
const loginContainer1 = document.getElementById('login-container1');
document.getElementById("sub1").addEventListener("click", hide1());


function hide1() {
    onAuthStateChanged(auth, user => {
        if (user != null) {
            loginContainer1.style.display = "none"
        }
    });
};

//sign in
const oldLogin = document.querySelector('#old-login');
oldLogin.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const email = oldLogin['signin-email'].value;
    const password = oldLogin['signin-password'].value;
    //console.log(email, password);

    //greeting user
    onAuthStateChanged(auth, user => {
        if (user != null) {
            const num = email.indexOf('@');
            const emailName = email.slice(0, num);
            const greet = document.getElementById('hi');
            greet.innerHTML = "hi, " + emailName
        } else {
            const greet = document.getElementById('hi');
            greet.innerHTML = "see you soon"
        };
    });

    //sign in  user + error
    const userCredential = signInWithEmailAndPassword(auth, email, password).then(userCredential => {
        //console.log(userCredential.user);
        oldLogin.reset();
        oldLogin.querySelector('.error').innerHTML = '';
    }).catch((error) => {
        const errorCode = error.code;
        var errorMessage = ""
        if (errorCode === "auth/wrong-password") {
            errorMessage = "wrong password, try again"
        } else if (errorCode === "auth/user-not-found") {
            errorMessage = "Sorry, the user is not found"
        }
        oldLogin.querySelector('.error').innerHTML = errorMessage;
    });
});

//closing the sign in container
const loginContainer2 = document.getElementById('login-container2');
document.getElementById("sub2").addEventListener("click", hide2());

function hide2() {
    onAuthStateChanged(auth, user => {
        if (user != null) {
            loginContainer2.style.display = "none"
        }
    });
}

//reset password Email
const resetPassword = document.getElementById('change-password');
resetPassword.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = resetPassword['sign-in-email'].value;
    sendPasswordResetEmail(auth, email)
        .then(() => {
            //closing the reset password container
            const newPassword = document.getElementById('new-password');
            document.getElementById("sub3").addEventListener("click", hide3());

            function hide3() {
                newPassword.style.display = "none"
            }
        })
})

//sign out 
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    signOut(auth);
});