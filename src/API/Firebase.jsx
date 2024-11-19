// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import getAuth from firebase/auth

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChj9I5v3PiHeWa2EezEaK5MD36apYJTA0",
  authDomain: "columbae-b57a9.firebaseapp.com",
  projectId: "columbae-b57a9",
  storageBucket: "columbae-b57a9.appspot.com",
  messagingSenderId: "25525523064",
  appId: "1:25525523064:web:21809c85192b3aff2f138d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Firebase Auth

export { auth }; // Export the auth object
