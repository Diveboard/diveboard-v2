import {
  collection, collectionGroup, getDocs, limit, orderBy, query, startAt,
} from '@firebase/firestore';
import { db } from '../firebaseFirestore';
import { firestorePaths } from '../firestorePaths';

export const firestoreGuidesService = {
  getGuidesByShopsIds: async (shopsIds: string[]) => {
    const guides: ({
      id: string,
      name: string,
    })[] = [];

    try {
      for (let i = 0; i < shopsIds.length; i++) {
        const docRef = collection(
          db,
          `${firestorePaths.shops.path}/${shopsIds[i]}/${firestorePaths.shops.guides.segment}`,
        );
        const q = query(
          docRef,
        );
        // eslint-disable-next-line no-await-in-loop
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          const {
            name,
          } = doc.data();

          guides.push({ id: doc.id, name });
        });
      }
      return guides;
    } catch (e) {
      console.log(e.message);
      throw new Error('get shops by spotId  error');
    }
  },

  getGuidesByGuideName: async (predictionName: string) => {
    const guides:{ id: string, name: string }[] = [];
    try {
      const q = query(
        collectionGroup(db, firestorePaths.shops.guides.segment),
        orderBy('name'),
        startAt(predictionName),
        limit(20),
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const { name } = doc.data();
        guides.push({
          id: doc.id,
          name,
        });
      });
      return guides;
    } catch (e) {
      console.log(e.message);
      throw new Error('get guides predictions error');
    }
  },
};
