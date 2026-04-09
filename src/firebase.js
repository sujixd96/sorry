// ============================================================
// FIREBASE CONFIGURATION
// Replace these values with your own Firebase project config.
// Go to: https://console.firebase.google.com
// Project Settings → Your apps → SDK setup and configuration
// ============================================================

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBRn3Un_uSaWnjMpJsEi4pdEgK0oZXPMtc",
  authDomain: "sorry-msg.firebaseapp.com",
  projectId: "sorry-msg",
  storageBucket: "sorry-msg.firebasestorage.app",
  messagingSenderId: "163268977242",
  appId: "1:163268977242:web:18f8daa917e551c30dee63"
  
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;
