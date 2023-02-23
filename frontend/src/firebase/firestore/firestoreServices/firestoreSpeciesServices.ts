import {
  where,
  query,
  collection,
  getDocs,
  doc,
  getDoc,
  limit,
  DocumentReference,
  DocumentSnapshot,
} from '@firebase/firestore';
import { db } from '../firebaseFirestore';
import { SpeciesType } from '../models';
import { Coords } from '../../../types';
import { firestorePaths, PathEnum } from '../firestorePaths';

export const firestoreSpeciesServices = {

  getLocalSpecies: async (coords: Coords) => {
    const fishes = [];
    try {
      const docRef = collection(db, PathEnum.SPECIES_COORDS);
      const q = query(
        docRef,
        where('lat', '==', +coords.lat.toFixed(0)),
        where('lng', '==', +coords.lng.toFixed(0)),
        limit(1000),
      );
      const querySnapshot = await getDocs(q);
      const promises = [];
      querySnapshot.forEach((fishDoc) => {
        const fishesData = fishDoc.data();
        promises.push(getDoc(fishesData.specieRef));
        fishes.push({ id: fishDoc.id, ...fishesData });
      });

      const categories = {};

      await Promise.all(promises)
        .then((values) => values
          .forEach((value) => {
            const data = value.data();
            if (categories[data.category]) {
              categories[data.category] = [...categories[data.category], { ...data, id: value.id }];
            } else {
              categories[data.category] = [{ ...data, id: value.id }];
            }
            return { ...data, id: data.id };
          }));
      return categories;
    } catch (e) {
      throw new Error(e.message);
    }
  },

  getSpeciesByRefs: async (speciesRefs: { [key: string]: DocumentReference }, length?: number) => {
    try {
      const speciesRefsIds = Object.keys(speciesRefs);
      const size = length || speciesRefsIds.length;
      const species = [];
      for (let i = 0; i < size; i++) {
        const docRef = doc(db, `${PathEnum.SPECIES}/${speciesRefsIds[i]}`);
        // eslint-disable-next-line no-await-in-loop
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        if (data) {
          species.push({ id: docSnap.id, ref: docSnap.ref, ...data });
        }
      }
      return species;
    } catch (e) {
      throw new Error(e.message);
    }
  },

  getSpeciesByIds: async (speciesIds: Array<string>) => {
    try {
      const species = [];
      for (let i = 0; i < speciesIds.length; i++) {
        const docRef = doc(db, firestorePaths.species.path, speciesIds[i]);
        // eslint-disable-next-line no-await-in-loop
        const docSnap = await getDoc(docRef);
        species.push({ ref: docSnap.ref, id: speciesIds[i], ...docSnap.data() });
      }
      return species.filter((fish) => fish);
    } catch (e) {
      throw new Error(e.message);
    }
  },

  getMySpecies: async (userId: string) => {
    try {
      const logbookRef = doc(db, `${PathEnum.LOGBOOK}/${userId}`);
      const logbookSnap = await getDoc(logbookRef);
      const { species } = logbookSnap.data();
      const speciesData = [];
      for (let i = 0; i < species.length; i++) {
        // eslint-disable-next-line no-await-in-loop
        const docSnap: DocumentSnapshot<SpeciesType> = await getDoc(species[i].specieRef);
        speciesData.push({ id: docSnap.id, ...docSnap.data() });
      }
      return speciesData;
    } catch (e) {
      throw new Error(e.message);
    }
  },

  getSpeciesByCategory: async (category: string, after?: any) => {
    try {
      const docRef = collection(db, PathEnum.SPECIES);
      const fishes = [];
      const first = query(
        docRef,
        where('category', '==', category.toLowerCase()),
        // orderBy('category', 'desc'),
        // startAt(category.toLowerCase()),
        limit(500),
      );
      const next = after ? query(
        docRef,
        where('category', '==', category.toLowerCase()),
        // startAfter(after),
        // orderBy('category'),
        limit(100),
      ) : null;

      const querySnapshot = await getDocs(after ? next : first);

      querySnapshot.forEach((fishDoc) => {
        const fishesData = fishDoc.data();
        fishes.push({ ref: fishDoc.ref, id: fishDoc.id, ...fishesData });
      });
      return fishes;
    } catch (e) {
      throw new Error(e.message);
    }
  },

  getSpeciesByName: async (name: string) => {
    const fishes = [];
    try {
      const docRef = collection(db, PathEnum.SPECIES);
      const q = query(docRef, where('sname', '>=', name), limit(100));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((fishDoc) => {
        const fishesData = fishDoc.data();
        fishes.push({ ref: fishDoc.ref, id: fishDoc.id, ...fishesData });
      });
      return fishes;
    } catch (e) {
      throw new Error(e.message);
    }
  },
};
