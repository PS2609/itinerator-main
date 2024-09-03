// firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// Check for any changes in import paths for getAnalytics and getAuth

import { getAuth } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9cb7zySwiYnXgqWnQKgb8L84Q4Y-eYZY",
  authDomain: "itinerator-bf719.firebaseapp.com",
  projectId: "itinerator-bf719",
  storageBucket: "itinerator-bf719.appspot.com",
  messagingSenderId: "1086600294636",
  appId: "1:1086600294636:web:75ff5886022f30a853f5c9",
  measurementId: "G-M9TB6E76QY"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Optional: Initialize Firebase analytics
const analytics = getAnalytics(app);

// Initialize Firestore and Auth services
const db = getFirestore(app);
const auth = getAuth(app);

export { analytics, app, auth, db };
