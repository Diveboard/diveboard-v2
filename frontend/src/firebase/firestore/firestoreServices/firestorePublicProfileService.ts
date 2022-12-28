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
  orderBy, startAt,
} from '@firebase/firestore';
import { db } from '../firebaseFirestore';
import { firestorePaths } from '../firestorePaths';
import { UserType } from '../../../types';
import { firestoreDivesService } from './firestoreDivesService';
import { UserSettingsType } from '../models';

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
      await setDoc(ref, { photoUrl: photoURL }, { merge: true });
    } catch (e) {
      throw new Error('set photo error');
    }
  },

  setName: async (firstName: string, lastName: string, userId: string) => {
    try {
      const ref = doc(db, firestorePaths.users.path, userId);
      await setDoc(ref, { firstName, lastName }, { merge: true });
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
      return { ...docSnap.data(), uid: docSnap.id } as UserSettingsType | undefined;
    } catch (e) {
      throw new Error('get user data error');
    }
  },

  getUsersInfo: async (usersIds: Array<{ id?: string, name?: string }>, spotId?: string) => {
    try {
      const users = [];
      for (let i = 0; i < usersIds.length; i++) {
        if (usersIds[i].id) {
          const docRef = doc(db, firestorePaths.users.path, usersIds[i].id);
          // eslint-disable-next-line no-await-in-loop
          const docSnap = await getDoc(docRef);
          if (docSnap.data()) {
            const { firstName, photoURL } = docSnap.data();
            // eslint-disable-next-line no-await-in-loop
            const diveTotal = await firestoreDivesService.getDivesCountByUserId(usersIds[i].id);
            // eslint-disable-next-line no-await-in-loop
            const divesOnSpot = spotId ? await firestoreDivesService
              .getDivesCountByUserIdInSpot(usersIds[i].id, spotId) : 0;
            users.push({
              id: usersIds[i].id, firstName, photoURL, diveTotal, divesOnSpot,
            });
          }
        } else {
          users.push({
            name: usersIds[i]?.name,
            diveTotal: 1,
            divesOnSpot: 0,
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
        const { firstName, photoUrl, lastName } = document.data() as Omit<UserType, 'uid'>;
        users.push({
          uid: document.id, firstName, lastName, photoUrl,
        });
      });
      return users;
    } catch (e) {
      console.log(e.message);
      throw new Error('get users by name predictions  error');
    }
  },

};
