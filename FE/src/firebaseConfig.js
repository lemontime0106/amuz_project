// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const {
  VITE_FE_apiKey,
  VITE_FE_authDomain,
  VITE_FE_databaseURL,
  VITE_FE_projectId,
  VITE_FE_storageBucket,
  VITE_FE_messagingSenderId,
  VITE_FE_appId,
  VITE_FE_measurementId,
} = import.meta.env;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: VITE_FE_apiKey,
  authDomain: VITE_FE_authDomain,
  databaseURL: VITE_FE_databaseURL,
  projectId: VITE_FE_projectId,
  storageBucket: VITE_FE_storageBucket,
  messagingSenderId: VITE_FE_messagingSenderId,
  appId: VITE_FE_appId,
  measurementId: VITE_FE_measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
