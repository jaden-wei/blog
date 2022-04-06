// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChx5v4t1cMgROvVxObvfxK9QJHB1yc4KM",
  authDomain: "blog-1846a.firebaseapp.com",
  projectId: "blog-1846a",
  storageBucket: "blog-1846a.appspot.com",
  messagingSenderId: "846901489680",
  appId: "1:846901489680:web:aaeb287976ce2a32d3da95",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
