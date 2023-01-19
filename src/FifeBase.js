// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCZqhmqMLuqyenwwP1jpzyW6gtpLqXbDb0",
  authDomain: "newsfeed-pr.firebaseapp.com",
  projectId: "newsfeed-pr",
  storageBucket: "newsfeed-pr.appspot.com",
  messagingSenderId: "216540277364",
  appId: "1:216540277364:web:480a6c4c2e02d5970a3f21",
  measurementId: "G-CLMZ3BV191",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const authService = getAuth(app);
export const storage = getStorage(app);
export default app;
