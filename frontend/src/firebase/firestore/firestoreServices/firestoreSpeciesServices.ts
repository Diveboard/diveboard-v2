import {
  where, query, collection, getDocs,
} from '@firebase/firestore';
import { db } from '../firebaseFirestore';
import { SpeciesType, SpeciesTypeWithoutId } from '../models';
import { Coords } from '../../../types';
import { firestorePaths } from '../firestorePaths';
import { getSpeciesBoundsArrays } from '../../../utils/getSpeciesBoundsArrays';

export const firestoreSpeciesServices = {

  getLocalSpecies: async (coords: Coords) => {
    const boundsArrays = getSpeciesBoundsArrays(coords);
    const fishes: SpeciesType[] = [];

    try {
      const docRef = collection(db, firestorePaths.species.path);

      for (let i = 0; i < boundsArrays.length; i++) {
        const q = query(
          docRef,
          where('coords', 'array-contains-any', boundsArrays[i]),
        );
        // eslint-disable-next-line no-await-in-loop
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          const fishesData = doc.data() as SpeciesTypeWithoutId;
          if (!fishes.find((species) => species.id === doc.id)) { // check duplicates
            fishes.push({ id: doc.id, ...fishesData });
          }
        });
      }

      return fishes;
    } catch (e) {
      console.log(e.message);
      throw new Error('get local species  error');
    }
  },
  getAllSpecies: async () => {
    const fishes:SpeciesType[] = [];

    try {
      const docRef = collection(db, firestorePaths.species.path);
      const q = query(
        docRef,
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const fishesData = doc.data() as SpeciesTypeWithoutId;
        fishes.push({ id: doc.id, ...fishesData });
      });
      return fishes;
    } catch (e) {
      console.log(e.message);
      throw new Error('get local species  error');
    }
  },

};
