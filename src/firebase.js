// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCynTZxr42cuPr7D9TlcoFfz14L7Ls8LXI",
  authDomain: "myresume-ae906.firebaseapp.com",
  databaseURL: "https://myresume-ae906-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "myresume-ae906",
  storageBucket: "myresume-ae906.appspot.com",
  messagingSenderId: "852344509671",
  appId: "1:852344509671:web:784dc91c3be7bce5773e42",
  measurementId: "G-Z0JX0YKW13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);