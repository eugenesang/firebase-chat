// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCZFF5Yo73_6cyrolHeefdG7lvY7axcRU",
  authDomain: "jabber-chat-73d5c.firebaseapp.com",
  projectId: "jabber-chat-73d5c",
  storageBucket: "jabber-chat-73d5c.appspot.com",
  messagingSenderId: "153823014443",
  appId: "1:153823014443:web:092e0550031297423e846e",
  measurementId: "G-99P65NMHE8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export {app, auth};