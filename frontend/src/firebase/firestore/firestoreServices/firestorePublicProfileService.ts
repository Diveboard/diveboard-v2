import {
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
  collection,
  query,
  getDocs,
  orderBy, startAt, where,
} from '@firebase/firestore';
import { db } from '../firebaseFirestore';
import { firestorePaths } from '../firestorePaths';
import { UserType } from '../../../types';
import { firestoreDivesService } from './firestoreDivesService';

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

  getUserById: async (userId: string) => {
    try {
      const docRef = doc(db, firestorePaths.users.path, userId);
      const docSnap = await getDoc(docRef);
      return docSnap.data() as UserType | undefined;
    } catch (e) {
      throw new Error('get user data error');
    }
  },

  getUsersInfo: async (usersIds: Array<{ id?: string, name?: string }>) => {
    try {
      const users = [];
      for (let i = 0; i < usersIds.length; i++) {
        if (usersIds[i].id) {
          const docRef = doc(db, firestorePaths.users.path, usersIds[i].id);
          // eslint-disable-next-line no-await-in-loop
          const docSnap = await getDoc(docRef);
          const { name, photoURL } = docSnap.data();
          // eslint-disable-next-line no-await-in-loop
          const diveTotal = await firestoreDivesService.getDivesCountByUserId(usersIds[i].id);
          users.push({
            id: usersIds[i].id, name, photoURL, diveTotal,
          });
        } else {
          users.push({
            name: usersIds[i]?.name,
            diveTotal: 1,
          });
        }
      }
      return users;
    } catch (e) {
      console.log(e.message);
      throw new Error('get user error');
    }
  },

  getUserPredictionsByName: async (predictionName: string) => {
    const users:Omit<UserType, 'about' | 'country' | 'qualifications' | 'email'>[] = [];

    try {
      const docRef = collection(db, firestorePaths.users.path);
      const q = query(
        docRef,
        orderBy('name'),
        startAt(predictionName.trim()),
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((document) => {
        const { name, photoURL } = document.data() as Omit<UserType, 'uid'>;
        users.push({ uid: document.id, name, photoURL });
      });
      return users;
    } catch (e) {
      console.log(e.message);
      throw new Error('get users by name predictions  error');
    }
  },

};
