import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  getDocs,
  limit, DocumentReference, where,
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

  getUserByRef: async (userRef: DocumentReference, idx?: number) => {
    try {
      const docSnap = await getDoc(userRef);
      const data = docSnap.data();
      if (!data) {
        return null;
      }
      return { ...data, uid: docSnap.id, idx } as unknown as UserSettingsType | undefined;
    } catch (e) {
      throw new Error(e.message);
    }
  },

  getBuddiesInfo: async (usersIds: Array<BuddiesType>, length?: number) => {
    try {
      const size = (!length || length > usersIds.length) ? usersIds.length : length;
      const usersPromises = [];
      const divesTotalPromises = [];
      const users = [];
      for (let i = 0; i < size; i++) {
        if (usersIds[i].userRef) {
          usersPromises.push(firestorePublicProfileService.getUserByRef(usersIds[i].userRef, i));
          users.push({
            ...usersIds[i],
            id: usersIds[i].userRef.id,
          });
        } else {
          users.push({
            ...usersIds[i],
            diveTotal: 1,
            id: i,
          });
        }
      }
      await Promise.all(usersPromises)
        .then((values) => values
          .forEach((value) => {
            divesTotalPromises.push(firestoreDivesService
              .getDivesCountByUserId(usersIds[value.idx].userRef.id, value.idx));
            users[value.idx].photoUrl = value.photoUrl;
            users[value.idx].name = `${value?.firstName || value?.lastName ? `${value?.firstName || ''} ${value?.lastName || ''}` : value.nickname || ''}`;
          }));

      await Promise.all(divesTotalPromises)
        .then((values) => values
          .forEach((value) => {
            users[value.idx].diveTotal = value.size || 7;
          }));
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
        where('firstName', '>=', predictionName.trim()),
        // orderBy('firstName'),
        // startAt(predictionName.trim()),
        limit(50),
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
