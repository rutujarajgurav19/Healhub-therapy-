import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbNKOFXmEMF18qlydSZv7Eu64QDqtuiNM",
  authDomain: "healhub-fff1b.firebaseapp.com",
  projectId: "healhub-fff1b",
  storageBucket: "healhub-fff1b.firebasestorage.app",
  messagingSenderId: "525150454564",
  appId: "1:525150454564:web:3ebf5a49d2a9887d9829b1",
  measurementId: "G-RFVBQ203S6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
