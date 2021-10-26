// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKfuVQa4eTXDUwuY40S91qsMYHVQUuQ_8",
  authDomain: "rgmu-firebase-crud.firebaseapp.com",
  projectId: "rgmu-firebase-crud",
  storageBucket: "rgmu-firebase-crud.appspot.com",
  messagingSenderId: "407950812670",
  appId: "1:407950812670:web:9cc1334289a40da58fccaf",
  measurementId: "G-24PDRR9ZWT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
