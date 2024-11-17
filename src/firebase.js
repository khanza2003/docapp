import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyA5GWk_g7P_-y--RujLIh5JnwJgxd9N9fo",
  authDomain: "docapp-a0c48.firebaseapp.com",
  projectId: "docapp-a0c48",
  storageBucket: "docapp-a0c48.appspot.com", // Corrected domain for storage bucket
  messagingSenderId: "261070863621",
  appId: "1:261070863621:web:4278373ea3b4dedb370b6c",
  measurementId: "G-B17160XWD4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);
export { db };

// Optionally initialize Analytics
const analytics = getAnalytics(app);
