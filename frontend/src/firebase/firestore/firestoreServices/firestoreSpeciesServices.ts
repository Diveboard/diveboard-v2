import {
  where, query, collection, getDocs,
} from '@firebase/firestore';
import { db } from '../firebaseFirestore';
import { SpeciesAreaType } from '../models';
import { Coords } from '../../../types';

export const firestoreSpeciesServices = {
  getAreas: async (coords: { lat: number, lng: number }) => {
    try {
      const docRef = collection(db, 'areas');
      const q = query(
        docRef,
        where('maxLat', '>=', coords.lat),
      );
      const querySnapshot = await getDocs(q);

      // console.log('docs', querySnapshot.docs);
      let area = null;
      querySnapshot.forEach((doc) => {
        const areaData = doc.data() as SpeciesAreaType;
        if (areaData.minLat <= coords.lat
          && areaData.maxLng >= coords.lng
          && areaData.minLng <= coords.lng) {
          area = areaData;
        }
      });
      return area;
    } catch (e) {
      console.log(e.message);
      throw new Error('get species areas error');
    }
  },

  getAreaCategories: async (id: number) => {
    try {
      const docRef = collection(db, 'area_categories');
      const q = query(
        docRef,
        where('area_id', '==', id),
      );

      const querySnapshot = await getDocs(q);
      const categories = [];
      querySnapshot.forEach((doc) => {
        const categoriesData = doc.data();
        categories.push(categoriesData);
      });

      return categories;
    } catch (e) {
      console.log(e.message);
      throw new Error('get species area categories error');
    }
  },

  getFishFrequencies: async (coords: Coords) => {
    try {
      const docRef = collection(db, ' fish_frequencies');
      const q = query(
        docRef,
        where('lat', '==', Math.round(coords.lat)),
        where('lng', '==', Math.round(coords.lng)),
      );
      const querySnapshot = await getDocs(q);
      const fishes = [];
      querySnapshot.forEach((doc) => {
        const fishesData = doc.data();
        fishes.push(fishesData);
      });

      return fishes;
    } catch (e) {
      console.log(e.message);
      throw new Error('get species fish frequencies error');
    }
  },

  getEolSNames: async (gbifIds: number[]) => {
    try {
      const docRef = collection(db, 'eolsnames');
      const q = query(
        docRef,
        where('gbif_id', 'in', gbifIds),
      );
      const querySnapshot = await getDocs(q);
      const eolsnames = [];
      querySnapshot.forEach((doc) => {
        const fishesData = doc.data();
        eolsnames.push(fishesData);
      });

      return eolsnames;
    } catch (e) {
      console.log(e.message);
      throw new Error('get species eolsname error');
    }
  },

  getEolCNames: async (eolCnamesId: number[], language: string = 'en') => {
    try {
      const docRef = collection(db, 'eolcnames');
      const q = query(
        docRef,
        where('eolsname_id', 'in', eolCnamesId),
        where('language', '==', language),
      );
      const querySnapshot = await getDocs(q);
      const eolcnames = [];
      querySnapshot.forEach((doc) => {
        const fishesData = doc.data();
        eolcnames.push(fishesData);
      });

      return eolcnames;
    } catch (e) {
      console.log(e.message);
      throw new Error('get species eolcname error');
    }
  },

  getAllSNames: async () => {
    try {
      const docRef = collection(db, 'eolsnames');
      const q = query(
        docRef,
      );
      const querySnapshot = await getDocs(q);
      const eolsnames = [];
      querySnapshot.forEach((doc) => {
        const fishesData = doc.data();
        eolsnames.push(fishesData);
      });

      return eolsnames;
    } catch (e) {
      console.log(e.message);
      throw new Error('get all species eolsname error');
    }
  },

  // getAllCNames: async (language: string = 'en') => {
  //   try {
  //     const docRef = collection(db, 'eolcnames');
  //     const q = query(
  //       docRef,
  //       where('language', '==', language),
  //     );
  //     const querySnapshot = await getDocs(q);
  //     const eolcnames = [];
  //     querySnapshot.forEach((doc) => {
  //       const fishesData = doc.data();
  //       eolcnames.push(fishesData);
  //     });
  //     return eolcnames;
  //   } catch (e) {
  //     console.log(e.message);
  //     throw new Error('get all species eolcname error');
  //   }
  // },

  getNewLocal: async (coords: Coords) => {
    try {
      const docRef = collection(db, 'A_Test_species');
      const q = query(
        docRef,
        where('coords', 'array-contains', coords),
      );
      const querySnapshot = await getDocs(q);
      const species = [];
      querySnapshot.forEach((doc) => {
        const fishesData = doc.data();
        species.push(fishesData);
      });

      return species;
    } catch (e) {
      console.log(e.message);
      throw new Error(' error');
    }
  },
};
