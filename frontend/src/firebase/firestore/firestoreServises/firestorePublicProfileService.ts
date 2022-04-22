import { doc, setDoc } from '@firebase/firestore';
import { db } from '../firebaseFirestore';

export const firestorePublicProfileService = {
  setEmail: async (email: string, userId: string) => {
    try {
      const ref = doc(db, 'user-public-profile', userId);
      await setDoc(ref, { email }, { merge: true });
    } catch (e) {
      throw new Error('set mail error');
    }
  },

  setPhotoURL: async (photoURL: string, userId: string) => {
    try {
      const ref = doc(db, 'user-public-profile', userId);
      await setDoc(ref, { photoURL }, { merge: true });
    } catch (e) {
      throw new Error('set photo error');
    }
  },

  setName: async (name: string, userId: string) => {
    try {
      const ref = doc(db, 'user-public-profile', userId);
      await setDoc(ref, { name }, { merge: true });
    } catch (e) {
      throw new Error('set name error');
    }
  },
};
