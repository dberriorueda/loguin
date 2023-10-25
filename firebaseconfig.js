
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyDAj54W_O9HMrye3NRVOTfN6lKnTu0uabw",
  authDomain: "alquilercarros-351d0.firebaseapp.com",
  projectId: "alquilercarros-351d0",
  storageBucket: "alquilercarros-351d0.appspot.com",
  messagingSenderId: "438914752499",
  appId: "1:438914752499:web:3bc6de1be38c5865f8bc86",
  measurementId: "G-DS212MN4ZD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };



