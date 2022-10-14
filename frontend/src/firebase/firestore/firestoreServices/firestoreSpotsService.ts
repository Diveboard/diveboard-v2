import {
  addDoc, collection,
} from '@firebase/firestore';
import { db } from '../firebaseFirestore';
import { SpotType } from '../models';

export const firestoreSpotsService = {
  setNewSpot: async (newSpot: SpotType) => {
    try {
      await addDoc(collection(db, 'test-spots'), newSpot);
    } catch (e) {
      throw new Error('set new spot error');
    }
  },
};
