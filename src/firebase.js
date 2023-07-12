import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCaF-LWWvg4pSeJufl2SECZgefUbmtCg9Q",
  authDomain: "manstagram-77636.firebaseapp.com",
  projectId: "manstagram-77636",
  storageBucket: "manstagram-77636.appspot.com",
  messagingSenderId: "1026080267458",
  appId: "1:1026080267458:web:76d615339deac87fe9af5b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
