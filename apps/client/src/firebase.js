// Firebase client initialization
// Uses the config provided by the user. If uploads fail, verify storageBucket matches <project-id>.appspot.com.
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6FoHZMOfmSMBBjT3yiOr4yvPvZrjttrk",
  authDomain: "sehat-bot.firebaseapp.com",
  projectId: "sehat-bot",
  storageBucket: "sehat-bot.firebasestorage.app",
  messagingSenderId: "326018479113",
  appId: "1:326018479113:web:62bd20ffff9378bfa3b4d8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
