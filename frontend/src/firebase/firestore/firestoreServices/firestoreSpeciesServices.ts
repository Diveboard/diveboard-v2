import {
  where, query, collection, getDocs, doc, getDoc, limit, orderBy, startAfter, startAt,
} from '@firebase/firestore';
import { db } from '../firebaseFirestore';
import { SpeciesType, SpeciesTypeWithoutId } from '../models';
import { Coords } from '../../../types';
import { firestorePaths, PathEnum } from '../firestorePaths';
import { firestoreDivesService } from './firestoreDivesService';

export const firestoreSpeciesServices = {

  getLocalSpecies: async (coords: Coords) => {
    const fishes = [];
    try {
      const docRef = collection(db, PathEnum.SPECIES_COORDS);
      const q = query(
        docRef,
        where('lat', '==', +coords.lat.toFixed(0)),
        where('lng', '==', +coords.lng.toFixed(0)),
        limit(45),
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((fishDoc) => {
        const fishesData = fishDoc.data();
        fishes.push({ id: fishDoc.id, ...fishesData });
      });

      for (let i = 0; i < fishes.length; i++) {
        // console.log(fishes[i].specieRef.id);
        const specieRef = doc(db, `${PathEnum.SPECIES}/0086QI2FXX99BJ9nD2Dw`);
        // eslint-disable-next-line no-await-in-loop
        const specie = await getDoc(specieRef);
        fishes[i] = { id: fishes[i].id, ...specie.data() };
      }
      // console.log(fishes);
      return fishes;
    } catch (e) {
      throw new Error(e.message);
    }
  },

  getSpeciesByRefs: async (speciesRefs: any) => {
    try {
      const speciesRefsIds = Object.keys(speciesRefs);
      const species = [];
      for (let i = 0; i < speciesRefsIds.length; i++) {
        const docRef = doc(db, `${PathEnum.SPECIES}/${speciesRefsIds[i]}`);
        // eslint-disable-next-line no-await-in-loop
        const docSnap = await getDoc(docRef);
        species.push({ id: docSnap.id, ref: docSnap.ref, ...docSnap.data() });
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

  getMySpecie: async (ref) => {
    const docRef = doc(db, `${PathEnum.SPECIES}/${ref}`);
    const specie = await getDoc(docRef);
    console.log(specie.data());
    return specie.data();
  },

  getMySpecies: async (userId: string) => {
    try {
      const speciesRefs = await firestoreDivesService.getUserSpeciesInDives(userId);
      // @ts-ignore
      return await firestoreSpeciesServices.getSpeciesByRefs(speciesRefs.species);
      // const species = [];
      // for (let i = 0; i < speciesIds.length; i++) {
      //   const docRef = doc(db, firestorePaths.species.path, speciesIds[i]);
      //   // eslint-disable-next-line no-await-in-loop
      //   const docSnap = await getDoc(docRef);
      //   species.push({ id: speciesIds[i], ...docSnap.data() });
      // }
      // return species.filter((fish) => fish);
    } catch (e) {
      throw new Error(e.message);
    }
  },

  getSpeciesCategories: async () => {
    try {
      const docRef = collection(db, PathEnum.SPECIES);
      const lionfises = query(docRef, where('category', '==', 'lionfises and scorpionfishes and rockfishes'));
      const crustaceans = query(docRef, where('category', '==', 'crustaceans'));
      const sponges = query(docRef, where('category', '==', 'sponges'));
      const jellyfish = query(docRef, where('category', '==', 'jellyfish'));
      const corals = query(docRef, where('category', '==', 'soft corals'));

      const lionfisesSnapshot = await getDocs(lionfises);
      const crustaceansSnapshot = await getDocs(crustaceans);
      const spongesSnapshot = await getDocs(sponges);
      const jellyfishSnapshot = await getDocs(jellyfish);
      const coralsSnapshot = await getDocs(corals);
      return {
        lionfises: lionfisesSnapshot.size,
        crustaceans: crustaceansSnapshot.size,
        sponges: spongesSnapshot.size,
        jellyfish: jellyfishSnapshot.size,
        corals: coralsSnapshot.size,
      };
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

  // getAllSpecies: async () => {
  //   const fishes: SpeciesType[] = [];
  //
  //   try {
  //     const docRef = collection(db, PathEnum.SPECIES);
  //     const q = query(docRef, limit(10));
  //     const querySnapshot = await getDocs(q);
  //
  //     querySnapshot.forEach((fishDoc) => {
  //       const fishesData = fishDoc.data() as SpeciesTypeWithoutId;
  //       fishes.push({ id: fishDoc.id, ...fishesData });
  //     });
  //     return fishes;
  //   } catch (e) {
  //     throw new Error(e.message);
  //   }
  // },
};
