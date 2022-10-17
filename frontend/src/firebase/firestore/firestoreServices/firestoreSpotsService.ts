import {
  addDoc, collection, deleteDoc, doc, getDocs, query, where,
} from '@firebase/firestore';
import { db } from '../firebaseFirestore';
import { SpotType } from '../models';
import { Coords } from '../../../types';

export const firestoreSpotsService = {
  setNewSpot: async (newSpot: SpotType) => {
    try {
      const res = await addDoc(collection(db, 'test-spots'), newSpot);
      return res.id;
    } catch (e) {
      throw new Error('set new spot error');
    }
  },
  getAllSpotsInMapViewport: async (bounds: {
    ne: Coords;
    sw: Coords;
  }) => {
    try {
      const docRef = collection(db, 'test-spots');
      const q = query(
        docRef,
        where('lat', '>', bounds.sw.lat),
        where('lat', '<', bounds.ne.lat),
      );
      const querySnapshot = await getDocs(q);

      const spots = [];
      querySnapshot.forEach((document) => {
        const {
          lat,
          lng,
          name,
          stats: { divesLogged },
          zoom,
        } = document.data();
        const { id } = document;

        if (lng > bounds.sw.lng && lng < bounds.ne.lng) {
          spots.push({
            id,
            name,
            divesLogged,
            zoom,
            lat,
            lng,
          });
        }
      });
      return spots;
    } catch (e) {
      throw new Error('get spots by bounds error');
    }
  },

  deleteSpot: async (id: string) => {
    try {
      await deleteDoc(doc(db, 'test-spots', id));
    } catch (e) {
      throw new Error('delete spot error');
    }
  },
};
