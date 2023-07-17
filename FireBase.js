// Import the functions you need from the SDKs you need
 import { initializeApp } from "firebase/app";

 import {getAuth} from 'firebase/auth'
import firebase from "firebase/compat/app";
// Required for side-effects
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7rEjq3ULptt9vKp5UuENC44vEDwB53og",
  authDomain: "expenses-app-e8fab.firebaseapp.com",
  projectId: "expenses-app-e8fab",
  storageBucket: "expenses-app-e8fab.appspot.com",
  messagingSenderId: "567285528957",
  appId: "1:567285528957:web:446300a30cd71ce693f414"
};

// Initialize Firebase
export const app=initializeApp(firebaseConfig);
export const auth =getAuth(app);
export const db = getFirestore(app);



