// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithRedirect,
  getAuth,
  signOut,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_DOMAIN!,
  messagingSenderId: process.env.NEXT_PUBLIC_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_APP_ID!,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const logout = () => signOut(auth);
export const googleSignIn = () => signInWithRedirect(auth, googleProvider);
export const githubSignIn = () => signInWithRedirect(auth, githubProvider);
