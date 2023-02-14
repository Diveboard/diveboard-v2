import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  getDocs,
  orderBy,
  startAt,
  limit, DocumentReference,
} from '@firebase/firestore';
import { db } from '../firebaseFirestore';
import { PathEnum } from '../firestorePaths';
import { UserType } from '../../../types';
import { firestoreDivesService } from './firestoreDivesService';
import { UserSettingsType } from '../models';

export const firestorePublicProfileService = {
  setEmail: async (email: string, userId: string) => {
    try {
      const ref = doc(db, PathEnum.USERS, userId);
      await setDoc(ref, { email }, { merge: true });
    } catch (e) {
      throw new Error(e.message);
    }
  },

  setPhotoURL: async (photoUrl: string, userId: string) => {
    try {
      const ref = doc(db, PathEnum.USERS, userId);
      await setDoc(ref, { photoUrl }, { merge: true });
    } catch (e) {
      throw new Error(e.message);
    }
  },

  setName: async (firstName: string, lastName: string, userId: string) => {
    try {
      const ref = doc(db, PathEnum.USERS, userId);
      await setDoc(ref, { firstName, lastName }, { merge: true });
    } catch (e) {
      throw new Error(e.message);
    }
  },

  setCountry: async (country: string, userId: string) => {
    try {
      const ref = doc(db, PathEnum.USERS, userId);
      await setDoc(ref, { country }, { merge: true });
    } catch (e) {
      throw new Error(e.message);
    }
  },
  setAbout: async (about: string, userId: string) => {
    try {
      const ref = doc(db, PathEnum.USERS, userId);
      await setDoc(ref, { about }, { merge: true });
    } catch (e) {
      throw new Error(e.message);
    }
  },

  getUserById: async (userId: string) => {
    try {
      const docRef = doc(db, PathEnum.USERS, userId);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      if (!data) {
        return null;
      }
      return { ...data, uid: docSnap.id } as UserSettingsType | undefined;
    } catch (e) {
      throw new Error(e.message);
    }
  },

  getUserByRef: async (userRef: DocumentReference) => {
    try {
      const docSnap = await getDoc(userRef);
      const data = docSnap.data();
      if (!data) {
        return null;
      }
      return { ...data, uid: docSnap.id } as UserSettingsType | undefined;
    } catch (e) {
      throw new Error(e.message);
    }
  },

  getBuddiesInfo: async (usersIds: Array<{ id?: string, name?: string }>, spotId?: string) => {
    try {
      const users = [];
      for (let i = 0; i < usersIds.length; i++) {
        if (usersIds[i].id) {
          const docRef = doc(db, PathEnum.USERS, usersIds[i].id);
          // eslint-disable-next-line no-await-in-loop
          const docSnap = await getDoc(docRef);
          if (docSnap.data()) {
            const { firstName, lastName, photoUrl } = docSnap.data();
            // eslint-disable-next-line no-await-in-loop
            const diveTotal = await firestoreDivesService.getDivesCountByUserId(usersIds[i].id);
            // eslint-disable-next-line no-await-in-loop
            const divesOnSpot = spotId ? await firestoreDivesService
              .getDivesCountByUserIdInSpot(usersIds[i].id, spotId) : 0;
            users.push({
              id: usersIds[i].id,
              firstName,
              lastName,
              photoUrl,
              diveTotal,
              divesOnSpot,
            });
          }
        } else {
          users.push({
            id: usersIds[i]?.id,
            firstName: usersIds[i]?.name,
            diveTotal: 1,
            divesOnSpot: 0,
          });
        }
      }
      return users;
    } catch (e) {
      throw new Error(e.message);
    }
  },

  getUserPredictionsByName: async (predictionName: string) => {
    const users:Omit<UserType, 'about' | 'country' | 'qualifications' | 'email'>[] = [];

    try {
      const docRef = collection(db, PathEnum.USERS);
      const q = query(
        docRef,
        orderBy('firstName'),
        startAt(predictionName.trim()),
        limit(15),
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
      throw new Error(e.message);
    }
  },

};
