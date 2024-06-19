import { initializeApp, } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAdAoqhrAknf8fMptssheYdQ340ThNK1Lc",
  authDomain: "olx-clone-8fb38.firebaseapp.com",
  projectId: "olx-clone-8fb38",
  storageBucket: "olx-clone-8fb38.appspot.com",
  messagingSenderId: "838305888905",
  appId: "1:838305888905:web:3301859f2ba7569e066458",
  measurementId: "G-LQD8D9PE4Q"
};

export const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)
export const auth = getAuth(app)
export const db  = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()
