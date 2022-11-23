import {
  where, query, collection, getDocs, doc, getDoc,
} from '@firebase/firestore';
import { db } from '../firebaseFirestore';
import { SpeciesType, SpeciesTypeWithoutId } from '../models';
import { Coords } from '../../../types';
import { firestorePaths } from '../firestorePaths';
import { getSpeciesBoundsArrays } from '../../../utils/getSpeciesBoundsArrays';
import { firestoreDivesService } from './firestoreDivesService';

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

        // eslint-disable-next-line @typescript-eslint/no-shadow
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

  getMySpecies: async (userId: string) => {
    try {
      const speciesIds = await firestoreDivesService.getUserSpeciesInDives(userId);
      const species = [];
      for (let i = 0; i < speciesIds.length; i++) {
        const docRef = doc(db, firestorePaths.species.path, speciesIds[i]);
        // eslint-disable-next-line no-await-in-loop
        const docSnap = await getDoc(docRef);
        species.push({ id: speciesIds[i], ...docSnap.data() });
      }
      return species.filter((fish) => fish);
    } catch (e) {
      console.log(e.message);
      throw new Error('get my species  error');
    }
  },

  getAllSpecies: async () => {
    const fishes: SpeciesType[] = [];

    try {
      const docRef = collection(db, firestorePaths.species.path);
      const q = query(docRef);
      const querySnapshot = await getDocs(q);

      // eslint-disable-next-line @typescript-eslint/no-shadow
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
