// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
// const firebaseConfig = {
//   apiKey: "AIzaSyDzBflo7f2uFgiFJb2ltKdMK3xTL8KDMR4",
//   authDomain: "airbnb-8bb51.firebaseapp.com",
//   projectId: "airbnb-8bb51",
//   storageBucket: "airbnb-8bb51.firebasestorage.app",
//   messagingSenderId: "674835301870",
//   appId: "1:674835301870:web:a143eccca53b9e5c22baff"
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app);

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCBA-MVVBe778whk9KwpYKVZpoGoLDplYA",
//   authDomain: "property-40aaa.firebaseapp.com",
//   projectId: "property-40aaa",
//   storageBucket: "property-40aaa.firebasestorage.app",
//   messagingSenderId: "954815209160",
//   appId: "1:954815209160:web:82574e4623338d88384ffd",
//   measurementId: "G-VR9GGJ2PWN"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export const auth = getAuth(app);
// export const db = getFirestore(app);


// const firebaseConfig = {
//   apiKey: "AIzaSyCBA-MVVBe778whk9KwpYKVZpoGoLDplYA",
//   authDomain: "property-40aaa.firebaseapp.com",
//   projectId: "property-40aaa",
//   storageBucket: "property-40aaa.firebasestorage.app",
//   messagingSenderId: "954815209160",
//   appId: "1:954815209160:web:82574e4623338d88384ffd",
//   measurementId: "G-VR9GGJ2PWN"
// };


// firebaseConfig.js
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCBA-MVVBe778whk9KwpYKVZpoGoLDplYA",
//   authDomain: "property-40aaa.firebaseapp.com",
//   projectId: "property-40aaa",
//   storageBucket: "property-40aaa.firebasestorage.app",
//   messagingSenderId: "954815209160",
//   appId: "1:954815209160:web:82574e4623338d88384ffd",
//   measurementId: "G-VR9GGJ2PWN"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDq45L8Y9Vq4Il7XRSZgvju_fuVZlfkk-A",
  authDomain: "airbnb-5b5d2.firebaseapp.com",
  projectId: "airbnb-5b5d2",
  storageBucket: "airbnb-5b5d2.firebasestorage.app",
  messagingSenderId: "952829748312",
  appId: "1:952829748312:web:d742478da089576218962d",
  measurementId: "G-JVBZ0LMMJX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);