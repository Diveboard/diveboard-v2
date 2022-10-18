import {
  doc, setDoc, updateDoc, arrayUnion, arrayRemove, getDoc,
} from '@firebase/firestore';
import { db } from '../firebaseFirestore';
import { firestorePaths } from '../firestorePaths';

export const firestorePublicProfileService = {
  setEmail: async (email: string, userId: string) => {
    try {
      const ref = doc(db, firestorePaths.users.path, userId);
      await setDoc(ref, { email }, { merge: true });
    } catch (e) {
      throw new Error('set mail error');
    }
  },

  setPhotoURL: async (photoURL: string, userId: string) => {
    try {
      const ref = doc(db, firestorePaths.users.path, userId);
      await setDoc(ref, { photoURL }, { merge: true });
    } catch (e) {
      throw new Error('set photo error');
    }
  },

  setName: async (name: string, userId: string) => {
    try {
      const ref = doc(db, firestorePaths.users.path, userId);
      await setDoc(ref, { name }, { merge: true });
    } catch (e) {
      throw new Error('set name error');
    }
  },

  setCountry: async (country: string, userId: string) => {
    try {
      const ref = doc(db, firestorePaths.users.path, userId);
      await setDoc(ref, { country }, { merge: true });
    } catch (e) {
      throw new Error('set country error');
    }
  },
  setAbout: async (about: string, userId: string) => {
    try {
      const ref = doc(db, firestorePaths.users.path, userId);
      await setDoc(ref, { about }, { merge: true });
    } catch (e) {
      throw new Error('set country error');
    }
  },

  setQualification: async (qualification: string, userId: string) => {
    try {
      const ref = doc(db, firestorePaths.users.path, userId);
      await updateDoc(ref, { qualifications: arrayUnion(qualification) });
    } catch (e) {
      throw new Error('set qualification error');
    }
  },

  deleteQualification: async (qualification: string, userId: string) => {
    try {
      const ref = doc(db, firestorePaths.users.path, userId);
      await updateDoc(ref, { qualifications: arrayRemove(qualification) });
    } catch (e) {
      throw new Error('delete qualification error');
    }
  },

  getUserData: async (userId: string) => {
    try {
      const docRef = doc(db, firestorePaths.users.path, userId);
      const docSnap = await getDoc(docRef);
      return docSnap.data();
    } catch (e) {
      throw new Error('get user data error');
    }
  },

};
