import {
  enableIndexedDbPersistence,
  getFirestore,
} from '@firebase/firestore';
import { app } from '../firebaseApp';

const db = getFirestore(app);

if (typeof window !== 'undefined') {
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
      console.log('only in one tab');
    } else if (err.code === 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
      console.log('does not support');
    }
  });
}

export { db };
