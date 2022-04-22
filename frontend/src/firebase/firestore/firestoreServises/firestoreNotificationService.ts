import { doc, getDoc, setDoc } from '@firebase/firestore';
import { NotificationsType } from '../models';
import { db } from '../firebaseFirestore';

export const firestoreNotificationService = {
  setDefaultNotification: async (userId: string) => {
    try {
      const ref = doc(db, 'notifications', userId);
      const defaultNotifications: NotificationsType = {
        instant: true,
        biWeeklyNotifications: true,
        biWeeklyDigest: true,
        newsletters: true,
      };
      await setDoc(ref, { ...defaultNotifications }, { merge: true });
    } catch (e) {
      throw new Error('set default notifications error');
    }
  },

  setNotifications: async (notifications: NotificationsType, userId: string) => {
    try {
      const ref = doc(db, 'notifications', userId);
      await setDoc(ref, { ...notifications }, { merge: true });
    } catch (e) {
      throw new Error('set  notifications error');
    }
  },

  getNotifications: async (userId: string) => {
    try {
      const docRef = doc(db, 'notifications', userId);
      const docSnap = await getDoc(docRef);
      return docSnap.data();
    } catch (e) {
      throw new Error('get notifications error');
    }
  },
};
