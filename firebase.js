// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCOwOM9fBCdTAzEtrpbNrFj4vh5tbDe2Q",
  authDomain: "learnloom-937f3.firebaseapp.com",
  projectId: "learnloom-937f3",
  storageBucket: "learnloom-937f3.appspot.com",
  messagingSenderId: "556569572606",
  appId: "1:556569572606:web:874dff5757b7ebd58b21af",
  measurementId: "G-SNC5F2Q4GW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);