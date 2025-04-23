// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const apikey = import.meta.env.VITE_APIKEY
const authDomain = import.meta.env.VITE_AUTHDOMAIN;
const projectID= import.meta.env.VITE_PROJECTID
const storageBucket = import.meta.env.VITE_STORAGEBUCKET;
const messagingSenderId = import.meta.env.VITE_MESSAGINGSENDERID;
const apiId = import.meta.env.VITE_APIID;
const measurementId = import.meta.env.VITE_MESUREMENTID;

const firebaseConfig = {
  apiKey: apikey,
  authDomain: authDomain,
  projectId: projectID,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: apiId,
  measurementId: measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export { db };