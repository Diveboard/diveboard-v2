import {
  collection, getDocs, query, where, documentId,
} from '@firebase/firestore';
import { db } from '../firebaseFirestore';
import { firestorePaths } from '../firestorePaths';

export const firestoreBuddiesService = {
  getBuddiesByIds: async (buddiesIds: string[]) => {
    const buddies: ({
      name: string,
      email: string,
      id: string,
    })[] = [];
    const docRef = collection(
      db,
      `${firestorePaths.users.path}`,
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
      console.log(e.message);
      throw new Error('get buddies by Id  error');
    }
  },
};
