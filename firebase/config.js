// src/firebase/config.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// *** IMPORTANT: REPLACE THE OBJECT BELOW WITH YOUR ACTUAL KEYS FROM STEP 4 ***
const firebaseConfig = {
  apiKey: "AIzaSyAlVoLXA-BiU-ebrg8uQ0VaCX4yedqjdTM",
  authDomain: "startrackerpro.firebaseapp.com",
  projectId: "startrackerpro",
  storageBucket: "startrackerpro.firebasestorage.app",
  messagingSenderId: "1075124835512",
  appId: "1:1075124835512:web:e1146068baba8bd9fe904d",
  measurementId: "G-7NZHXBV8CM"
};
// *************************************************************************

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
