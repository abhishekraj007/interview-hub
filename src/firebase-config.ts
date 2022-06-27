// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// import {
//   FIREBASE_API_KEY,
//   FIREBASE_AUTH_DOMAIN,
//   FIREBASE_PROJECT_ID,
//   FIREBASE_STORAGE_BUCKET,
//   FIREBASE_MESSAGIN_SENDER_ID,
//   FIREBASE_APP_ID,
//   FIREBASE_MEASUREMENT_ID,
// } from "@env"

const FIREBASE_API_KEY = "AIzaSyBSf7gL4yjWCsRc7kMPoTOL-KdhChePQwU";
const FIREBASE_AUTH_DOMAIN = "interview-questions-1f508.firebaseapp.com";
const FIREBASE_PROJECT_ID = "interview-questions-1f508";
const FIREBASE_STORAGE_BUCKET = "interview-questions-1f508.appspot.com";
const FIREBASE_MESSAGIN_SENDER_ID = "74654787266";
const FIREBASE_APP_ID = "1:74654787266:web:967b9f0e46c9d6627c7d5b";
const FIREBASE_MEASUREMENT_ID = "G-CJ8FCNS2Y8";

// console.log(FIREBASE_API_KEY);

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGIN_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const auth = getAuth(app);

const googleAuthProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, googleAuthProvider);
