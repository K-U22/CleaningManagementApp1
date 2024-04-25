import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBFPgxmfoqtzEuGaBybLaNJLP4XprLu0L8",
  authDomain: "cleaningsample2.firebaseapp.com",
  projectId: "cleaningsample2",
  storageBucket: "cleaningsample2.appspot.com",
  messagingSenderId: "718641622404",
  appId: "1:718641622404:web:7a57f1d12c19bdbb3d81d1"
});

const db = firebaseApp.firestore();

const auth = firebase.auth();

export {db, auth};