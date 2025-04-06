// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDzBflo7f2uFgiFJb2ltKdMK3xTL8KDMR4",
  authDomain: "airbnb-8bb51.firebaseapp.com",
  projectId: "airbnb-8bb51",
  storageBucket: "airbnb-8bb51.appspot.com",
  messagingSenderId: "674835301870",
  appId: "1:674835301870:web:a143eccca53b9e5c22baff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with persistence
const db = getFirestore(app);
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
  } else if (err.code === 'unimplemented') {
    console.warn('The current browser does not support all of the features required to enable persistence.');
  }
});

// Initialize Authentication with session persistence
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error('Error enabling auth persistence:', error);
  });

// Initialize Storage
const storage = getStorage(app);

// Export initialized services
export { db, storage, auth };