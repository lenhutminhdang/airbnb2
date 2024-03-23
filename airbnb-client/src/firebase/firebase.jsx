import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyANqof-hoizKUxwzqRvkC2d4IiyurI9EtA",
  authDomain: "airbnb-server-06.firebaseapp.com",
  projectId: "airbnb-server-06",
  storageBucket: "airbnb-server-06.appspot.com",
  messagingSenderId: "486518934438",
  appId: "1:486518934438:web:1db1bfa051edeb91ed1d67",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
