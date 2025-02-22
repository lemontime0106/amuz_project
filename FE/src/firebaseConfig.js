// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1ufIQF3Hk0_JztNY28XuIGhbW-v6IegA",
  authDomain: "amuz-project-c2c85.firebaseapp.com",
  databaseURL: "https://amuz-project-c2c85-default-rtdb.firebaseio.com",
  projectId: "amuz-project-c2c85",
  storageBucket: "amuz-project-c2c85.firebasestorage.app",
  messagingSenderId: "788919011251",
  appId: "1:788919011251:web:52c3e6e92934f98aa62dc6",
  measurementId: "G-MXES1M6K9K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
