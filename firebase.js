// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApyLxawq3ldUBnxqfsBGZaSwsiIeOwKPE",
  authDomain: "chat-app-f72bd.firebaseapp.com",
  projectId: "chat-app-f72bd",
  storageBucket: "chat-app-f72bd.appspot.com",
  messagingSenderId: "372482317626",
  appId: "1:372482317626:web:07ca7a2b9ea1ae714e4403"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };