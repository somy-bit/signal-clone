// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCGadiaau2lonphFwHRHnqcSh_8pv9J-DY",
  authDomain: "signal-clone-7ffd3.firebaseapp.com",
  projectId: "signal-clone-7ffd3",
  storageBucket: "signal-clone-7ffd3.appspot.com",
  messagingSenderId: "338836937110",
  appId: "1:338836937110:web:62e67fe38d61c411e0a5b7",
  measurementId: "G-ZGEJ09D556"
};

// Initialize Firebase

let app;
if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
}else{
    app = firebase.app();
}

const db = app.firestore();
const auth = app.auth();

export { db,auth }
