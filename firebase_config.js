// Import the functions you need from the SDKs you need
import {getAuth} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCO3VzVfsGe74eRicVYMehiAW7yOXem3M",
  authDomain: "shuttletracker-68e61.firebaseapp.com",
  projectId: "shuttletracker-68e61",
  storageBucket: "shuttletracker-68e61.firebasestorage.app",
  messagingSenderId: "1088277660472",
  appId: "1:1088277660472:web:5c87f24438df6de880f7cd",
  measurementId: "G-ETVKZ2LJPP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export {auth, app}