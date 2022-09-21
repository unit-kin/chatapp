
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'



const firebaseConfig = {

  apiKey: "AIzaSyAhrWPVRB-wG23rYQNYazi28-imfMjPrek",

  authDomain: "chat-e0a1f.firebaseapp.com",

  projectId: "chat-e0a1f",

  storageBucket: "chat-e0a1f.appspot.com",

  messagingSenderId: "366118340579",

  appId: "1:366118340579:web:9781378a94b5e76f68c2d6"

};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export const db =getFirestore(app);