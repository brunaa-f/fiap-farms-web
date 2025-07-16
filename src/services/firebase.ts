import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJvXnggOP2S63teFNhpgiu0ho5yXpZMiE",
  authDomain: "fiap-farms-417a8.firebaseapp.com",
  projectId: "fiap-farms-417a8",
  storageBucket: "fiap-farms-417a8.appspot.com",
  messagingSenderId: "392686882556",
  appId: "1:392686882556:web:a012c85411e208a6341179"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
