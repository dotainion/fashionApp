import firebase from 'firebase';

export const FIREBASE_CONFIG = {
    apiKey: "AIzaSyCFbRL3fMe6H09_F9QUgJVRLkcFbODXinY",
    authDomain: "fashion-app-23795.firebaseapp.com",
    projectId: "fashion-app-23795",
    storageBucket: "fashion-app-23795.appspot.com",
    messagingSenderId: "577422648299",
    appId: "1:577422648299:web:8e5520f1beb6efa4362fae",
    measurementId: "G-R1PY6E5RF7"
}

const app = firebase.initializeApp(FIREBASE_CONFIG);
export const db = app.firestore();
export const auth = app.auth();