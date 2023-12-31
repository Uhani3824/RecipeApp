import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getFirestore,collection,addDoc,orderBy,getDocs,serverTimestamp,doc,setDoc,} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCF9fK_gOU0RPmr8xkFlrY0XdZ-Sp1wm7Q",
  authDomain: "recipebook-9a528.firebaseapp.com",
  projectId: "recipebook-9a528",
  storageBucket: "recipebook-9a528.appspot.com",
  messagingSenderId: "488291265407",
  appId: "1:488291265407:web:2ff6c05ae783f793f1884a",
  measurementId: "G-HQCDTE01Y1",
};

const app = initializeApp(firebaseConfig); 

const analytics = getAnalytics(app);

const auth = getAuth(app);

const db = getFirestore();

export { auth, db, analytics };
