// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBarHwd5_W2B9APEpaeO6Mc_ni0SNQYOgM",
  authDomain: "giphy-search-app-cfccd.firebaseapp.com",
  projectId: "giphy-search-app-cfccd",
  storageBucket: "giphy-search-app-cfccd.appspot.com",
  messagingSenderId: "155506155429",
  appId: "1:155506155429:web:a1b06d5d3d434a9a95d24c",
  measurementId: "G-J7VWGLXH9M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
