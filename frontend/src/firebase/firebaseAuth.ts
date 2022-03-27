import { initializeApp } from 'firebase/app';
import {
  browserLocalPersistence,
  browserSessionPersistence,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithCustomToken,
  signOut,
} from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions';

const firebaseConfig = {
  apiKey: 'AIzaSyD61ICdovc0N43d2_Hu5KtcQfwRXbXU86s',
  authDomain: 'diveboard-org.firebaseapp.com',
  databaseURL: 'https://diveboard-org-default-rtdb.firebaseio.com',
  projectId: 'diveboard-org',
  storageBucket: 'diveboard-org.appspot.com',
  messagingSenderId: '14557716782',
  appId: '1:14557716782:web:4e46d22ca36004ae6adabf',
  measurementId: 'G-12N6Y6KY7L',
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const functions = getFunctions(app);

export {
  auth,
  signOut,
  functions,
  httpsCallable,
  signInWithCustomToken,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
};
