import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCW5BXRki65Mun8bqHaQBR5HFLH6x-Bvg0",
  authDomain: "sambag2-8663a.firebaseapp.com",
  databaseURL: "https://sambag2-8663a-default-rtdb.firebaseio.com",
  projectId: "sambag2-8663a",
  storageBucket: "sambag2-8663a.appspot.com",
  messagingSenderId: "991681556862",
  appId: "1:991681556862:web:52edae80b4e97fae88432f",
  measurementId: "G-63M71EGKYL",
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

export { db, ref, set };
