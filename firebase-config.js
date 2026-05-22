// Firebase SDK initialization using ES modules from Google CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";

// User's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJbIVNHZZAHk-dK9PgGjuFFmq997B9Dbk",
  authDomain: "diet-tracker-18a4c.firebaseapp.com",
  projectId: "diet-tracker-18a4c",
  storageBucket: "diet-tracker-18a4c.firebasestorage.app",
  messagingSenderId: "957120332394",
  appId: "1:957120332394:web:b03b51fd44f6c53ca08013",
  measurementId: "G-BVFKHMX9T1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

// Export for app use
export { db, auth, analytics };
