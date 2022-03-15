import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD61ICdovc0N43d2_Hu5KtcQfwRXbXU86s",
    authDomain: "diveboard-org.firebaseapp.com",
    projectId: "diveboard-org",
    storageBucket: "diveboard-org.appspot.com",
    messagingSenderId: "14557716782",
    appId: "1:14557716782:web:f99e418585508d526adabf",
    measurementId: "G-HYPX8YKS1F"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)