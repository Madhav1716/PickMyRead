import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCaA4tqj0hcpq5rSVzhkAQIqLqUhIuNgLk",
  authDomain: "book-admin-c210c.firebaseapp.com",
  projectId: "book-admin-c210c",
  storageBucket: "book-admin-c210c.appspot.com",
  messagingSenderId: "118898468173",
  appId: "1:118898468173:web:718ee7177c8c4b05f80304",
  measurementId: "G-1L8B6ZYP4Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
