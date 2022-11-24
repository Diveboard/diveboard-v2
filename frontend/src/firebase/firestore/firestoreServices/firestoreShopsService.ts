import {
  collection, getDocs, limit, orderBy, query, startAt, where,
} from '@firebase/firestore';
import { ShopType } from '../models';
import { db } from '../firebaseFirestore';
import { firestorePaths } from '../firestorePaths';

export const firestoreShopsService = {
  getShopsBySpotId: async (spotId: string) => {
    const shops: {
      id: string,
      name: string,
    }[] = [];

    try {
      const docRef = collection(db, firestorePaths.shops.path);
      const q = query(
        docRef,
        where('spots', 'array-contains', spotId),
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const {
          name,
        } = doc.data() as ShopType;

        shops.push({
          id: doc.id,
          name,
        });
      });
      return shops;
    } catch (e) {
      console.log(e.message);
      throw new Error('get shops by spotId  error');
    }
  },

  getShopsByName: async (namePrediction: string) => {
    const shops: {
      id: string,
      name: string,
      guides: ({ id: string, name: string } | { name: string })[]
    }[] = [];

    try {
      const docRef = collection(db, firestorePaths.shops.path);
      const q = query(
        docRef,
        orderBy('name'),
        startAt(namePrediction),
        limit(50),
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const {
          name,
          crewMembers,
        } = doc.data() as ShopType;

        shops.push({
          id: doc.id,
          name,
          guides: crewMembers,
        });
      });
      return shops;
    } catch (e) {
      console.log(e.message);
      throw new Error('get shops by name error');
    }
  },

};
