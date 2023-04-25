// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyCZqhmqMLuqyenwwP1jpzyW6gtpLqXbDb0",
//   authDomain: "newsfeed-pr.firebaseapp.com",
//   projectId: "newsfeed-pr",
//   storageBucket: "newsfeed-pr.appspot.com",
//   messagingSenderId: "216540277364",
//   appId: "1:216540277364:web:480a6c4c2e02d5970a3f21",
//   measurementId: "G-CLMZ3BV191",
// };
// const firestoreSettings = {
//   experimentalAutoDetectLongPolling: true, // 압축을 자동으로 감지
//   ignoreUndefinedProperties: true, // undefined 속성 무시
// };

// // Initialize Firebase

// const app = initializeApp(firebaseConfig);
// export const apiKeys = firebaseConfig.apiKey;
// export const db = getFirestore(app);
// db.settings(firestoreSettings);
// export const authService = getAuth(app);
// export const storage = getStorage(app);
// export default app;
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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const authService = getAuth(app);
const storage = getStorage(app);

export { app, db, authService, storage };
