import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyDrvUHHTltU_b2LCPisI8MVThSWdCsgxVc",
    authDomain: "horarioescolar-767eb.firebaseapp.com",
    projectId: "horarioescolar-767eb",
    storageBucket: "horarioescolar-767eb.firebasestorage.app",
    messagingSenderId: "849231753070",
    appId: "1:849231753070:web:ce3a40604cc50e42591b7f",
    measurementId: "G-XTKZXJ50Z8"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore();
export const analytics = firebase.analytics();
