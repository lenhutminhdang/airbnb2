import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // Your firebase config here
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
