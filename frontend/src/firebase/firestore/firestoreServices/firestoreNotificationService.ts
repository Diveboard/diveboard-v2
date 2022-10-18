import { doc, getDoc, setDoc } from '@firebase/firestore';
import { NotificationsType } from '../models';
import { db } from '../firebaseFirestore';
import { firestorePaths } from '../firestorePaths';

const notificationSegment = firestorePaths.users.settings.notifications.segment;
const getPath = (userId: string) => `${firestorePaths.users.path}/${userId}/${firestorePaths.users.settings.segment}`;

export const firestoreNotificationService = {
  setDefaultNotification: async (userId: string) => {
    try {
      const ref = doc(db, getPath(userId), notificationSegment);
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

  setNotifications: (notifications: NotificationsType, userId: string) => {
    try {
      const ref = doc(db, getPath(userId), notificationSegment);
      setDoc(ref, { ...notifications }, { merge: true });
    } catch (e) {
      throw new Error('set  notifications error');
    }
  },

  getNotifications: async (userId: string) => {
    try {
      const docRef = doc(db, getPath(userId), notificationSegment);
      const docSnap = await getDoc(docRef);
      return docSnap.data();
    } catch (e) {
      throw new Error('get notifications error');
    }
  },
};
