// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBpKbbVCn-x0E5I2D0FgzOvePbUiOWt6DU",
    authDomain: "sauron-645ac.firebaseapp.com",
    databaseURL: "https://sauron-645ac-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "sauron-645ac",
    storageBucket: "sauron-645ac.appspot.com",
    messagingSenderId: "122014887641",
    appId: "1:122014887641:web:e2eeae21852d94371798c8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);