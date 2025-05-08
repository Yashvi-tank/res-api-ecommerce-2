// frontend/src/services/firebaseConfig.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyABEmiTodbvnTRik8Ggn83kBh9Uu-GdIFU",
    authDomain: "ecommerce-b2a11.firebaseapp.com",
    projectId: "ecommerce-b2a11",
    storageBucket: "ecommerce-b2a11.firebasestorage.app",
    messagingSenderId: "562019240092",
    appId: "1:562019240092:web:ce9040ffc870b103a90559",
    measurementId: "G-CQ4YRN58ZL"
  };

// Initialize Firebase
const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Re‐export everything you need
export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
};