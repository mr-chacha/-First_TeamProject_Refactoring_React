// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);

export const authService = getAuth(app);
export default app;
