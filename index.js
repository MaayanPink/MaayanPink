import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
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
//round-image
const storageRef1 = [ref(storage, 'Roni/at the beach.jpeg'), ref(storage, 'Roni/face jewels.jpeg'), ref(storage, 'Roni/makeup.jpeg'), ref(storage, 'feathers/feather_1.png'), ref(storage, 'feathers/feather_3.png'), ref(storage, 'feathers/feather_4.png'), ref(storage, 'feathers/feather_1.png')];
const addPic1 = [document.querySelector('.roundimg1'), document.querySelector('.roundimg2'), document.querySelector('.roundimg3'), document.querySelector('.feather1'), document.querySelector('.feather3'), document.querySelector('.feather4'), document.querySelector('.feather2')]
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

// firestore database
const db = getFirestore(firebaseApp);
//collection ref
const colRef = collection(db, 'comments')
    //get collection data
getDocs(colRef).then((snapshot) => {
    let comments = []
    snapshot.docs.forEach((doc) => {
        comments.push({...doc.data(), id: doc.id })
    })
    console.log(comments)
})

//adding a comment
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

// authentication
const auth = getAuth(firebaseApp);

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

        newLogin.querySelector('.error').innerHTML = error.message;
    });
});

$('.sub1').click(function() {
    onAuthStateChanged(auth, user => {
        if (user != null) {
            $('#login-container1').hide(500);
        } else {
            $('#login-container1').show(0);
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
            $('#login-container2').hide(500);
        } else {
            $('#login-container2').show(0);
        }

    });
});

//sign out 
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    signOut(auth).then(() => {});
});