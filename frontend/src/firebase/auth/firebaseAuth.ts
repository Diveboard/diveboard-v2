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
import { app } from '../firebaseApp';

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
