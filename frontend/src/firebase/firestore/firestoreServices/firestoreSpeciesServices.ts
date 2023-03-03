import {
  where,
  query,
  collection,
  getDocs,
  doc,
  getDoc,
  limit,
  DocumentReference,
} from '@firebase/firestore';
import { db } from '../firebaseFirestore';
import { Coords } from '../../../types';
import { PathEnum } from '../firestorePaths';

export const firestoreSpeciesServices = {

  getLocalSpecies: async (coords: Coords) => {
    const fishes = [];
    try {
      const docRef = collection(db, PathEnum.SPECIES_COORDS);
      const q = query(
        docRef,
        where('lat', '==', +coords.lat.toFixed(0)),
        where('lng', '==', +coords.lng.toFixed(0)),
        limit(500),
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
      const speciesPromises = [];
      const size = length || speciesRefsIds.length;
      const species = [];
      for (let i = 0; i < size; i++) {
        const docRef = doc(db, `${PathEnum.SPECIES}/${speciesRefsIds[i]}`);
        speciesPromises.push(getDoc(docRef));
      }
      await Promise.all(speciesPromises)
        .then((values) => values.forEach((value) => {
          const specie = value.data();
          if (specie) {
            species.push({ id: specie.id, ref: specie.ref, ...specie });
          }
        }));

      return species;
    } catch (e) {
      throw new Error(e.message);
    }
  },

  getSpeciesByIds: async (speciesIds: Array<string>) => {
    try {
      const species = [];
      const speciesPromises = [];
      for (let i = 0; i < speciesIds.length; i++) {
        const docRef = doc(db, PathEnum.SPECIES, speciesIds[i]);
        speciesPromises.push(getDoc(docRef));
      }
      await Promise.all(speciesPromises)
        .then((values) => values.forEach((value) => {
          const specie = value.data();
          if (specie) {
            species.push({ ref: value.ref, id: value.id, ...specie });
          }
        }));
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
      const speciesPromises = [];
      for (let i = 0; i < species.length; i++) {
        speciesPromises.push(getDoc(species[i].specieRef));
      }
      await Promise.all(speciesPromises)
        .then((values) => values.forEach((value) => {
          const specie = value.data();
          if (specie) {
            speciesData.push({ id: specie.id, ref: specie.ref, ...specie });
          }
        }));
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
        limit(500),
      );
      const next = after ? query(
        docRef,
        where('category', '==', category.toLowerCase()),
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
    try {
      const docRef = collection(db, PathEnum.SPECIES_CNAMES);
      const q = query(docRef, where('name', '>=', name), limit(100));
      const querySnapshot = await getDocs(q);
      const speciesIds = new Set();

      querySnapshot.forEach((fishDoc) => {
        const fishesData = fishDoc.data();
        speciesIds.add(fishesData.specieRef.id);
      });
      return await firestoreSpeciesServices.getSpeciesByIds(
        Array.from(speciesIds) as Array<string>,
      );
    } catch (e) {
      throw new Error(e.message);
    }
  },
};
