import {
  collection, getDocs, query, where, documentId,
} from '@firebase/firestore';
import { db } from '../firebaseFirestore';
import { PathEnum } from '../firestorePaths';

export const firestoreBuddiesService = {
  getBuddiesByIds: async (buddiesIds: string[]) => {
    const buddies: ({
      name: string,
      email: string,
      id: string,
    })[] = [];
    const docRef = collection(
      db,
      `${PathEnum.USERS}`,
    );
    try {
      for (let i = 0; i < buddiesIds.length; i++) {
        if (buddiesIds[i]) {
          const q = query(
            docRef,
            where(documentId(), '==', buddiesIds[i]),
          );
          // eslint-disable-next-line no-await-in-loop
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            const { name, email } = doc.data();
            buddies.push({ email, name, id: doc.id });
          });
        }
      }
      return buddies;
    } catch (e) {
      throw new Error(e.message);
    }
  },
};
