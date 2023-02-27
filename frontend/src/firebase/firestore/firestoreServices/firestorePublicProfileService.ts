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
import { firestoreDivesService } from './firestoreDivesService';
import { BuddiesType, UserSettingsType } from '../models';

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

  getBuddiesInfo: async (usersIds: Array<BuddiesType>, length?: number) => {
    try {
      const users = [];
      const size = (!length || length > usersIds.length) ? usersIds.length : length;
      for (let i = 0; i < size; i++) {
        if (usersIds[i].userRef) {
          // eslint-disable-next-line no-await-in-loop
          const docSnap = await getDoc(usersIds[i].userRef);
          if (docSnap.data()) {
            const { photoUrl } = docSnap.data();
            // eslint-disable-next-line no-await-in-loop
            const diveTotal = await firestoreDivesService
              .getDivesCountByUserId(usersIds[i].userRef.id);
            users.push({
              ...usersIds[i],
              photoUrl,
              diveTotal,
              id: usersIds[i].userRef.id,
            });
          }
        } else {
          users.push({
            ...usersIds[i],
            diveTotal: 1,
            id: i,
          });
        }
      }
      return users;
    } catch (e) {
      throw new Error(e.message);
    }
  },

  getUserPredictionsByName: async (predictionName: string) => {
    const users: BuddiesType[] = [];

    try {
      const docRef = collection(db, PathEnum.USERS);
      const q = query(
        docRef,
        orderBy('firstName'),
        startAt(predictionName.trim()),
        limit(20),
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((document) => {
        const {
          firstName,
          photoUrl,
          lastName,
          settings,
          email,
        } = document.data() as UserSettingsType;
        users.push({
          id: document.id,
          userRef: document.ref,
          email,
          notify: settings.notifications.instant,
          name: `${firstName} ${lastName}`,
          type: 'internal',
          photoUrl,
        } as BuddiesType);
      });
      return users;
    } catch (e) {
      throw new Error(e.message);
    }
  },

};
