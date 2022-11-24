import {
  collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, where,
} from '@firebase/firestore';
import { db } from '../firebaseFirestore';
import { DiveType } from '../models';
import { convertTimestampDate } from '../../../utils/convertTimestampDate';
import { firestoreSpotsService } from './firestoreSpotsService';

export const firestoreDivesService = {
  setDiveData: async (diveData: DiveType, userId: string) => {
    try {
      const ref = doc(collection(db, `Test_Dives/${userId}`, 'userDives'));
      await setDoc(ref, { ...diveData }, { merge: true });
      if (diveData.spotId) {
        const spot = await firestoreSpotsService.getSpotById(diveData.spotId);
        const newSpot = { ...spot };
        newSpot.dives.push(ref.id);
        await firestoreSpotsService.updateSpotById(diveData.spotId, newSpot);
      }
    } catch (e) {
      console.log({ e });
      throw new Error('set  dive data error');
    }
  },

  unpublishDives: async (userId: string, diveIds: Array<string>) => {
    try {
      for (let i = 0; i < diveIds.length; i++) {
        const docRef = doc(db, `Test_Dives/${userId}/userDives`, diveIds[i]);
        // eslint-disable-next-line no-await-in-loop
        const docSnap = await getDoc(docRef);
        // eslint-disable-next-line no-await-in-loop
        await setDoc(docRef, { ...docSnap.data(), draft: true }, { merge: true });
      }
    } catch (e) {
      console.log({ e });
      throw new Error('unpublish dive data error');
    }
  },

  getDivesByUserId: async (
    userId: string,
  ) => {
    try {
      const dives = [];
      const docRef = collection(db, `Test_Dives/${userId}/userDives`);
      const q = query(
        docRef,
      );
      const querySnapshot = await getDocs(q);

      // eslint-disable-next-line @typescript-eslint/no-shadow
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const dive = {
          id: doc.id,
          draft: data.draft,
          number: data.aboutDive?.diveNumber,
          spotId: data.spotId,
          date: data.diveData.date ? convertTimestampDate(data.diveData.date).toISOString() : null,
          divetime: data.diveData?.duration,
          depth: data.diveData?.maxDepth,
          diversCount: data.buddies.length,
          trip: data.aboutDive?.tripName,
          diveShop: data.diveCenter?.id,
          water: data.diveData?.waterType,
          visibility: data.diveData?.waterVisibility,
          altitude: data.diveData?.altitude,
          featuredGear: data.gears?.map((gear) => gear?.typeOfGear)?.toString(),
        };
        dives.push(dive);
      });
      for (const dive of dives) {
        // eslint-disable-next-line no-await-in-loop
        dive.spot = dive.spotId ? await firestoreSpotsService.getSpotNameById(dive.spotId) : null;
      }
      return dives;
    } catch (e) {
      console.log(e.message);
      throw new Error('get dive data error');
    }
  },

  getUserSpeciesInDives: async (
    userId: string,
  ) => {
    const docRef = collection(db, `Test_Dives/${userId}/userDives`);
    const q = query(
      docRef,
      where('species', '!=', []),
      // where('draft', '==', false),
    );
    const querySnapshot = await getDocs(q);
    let speciesArray = [];
    // eslint-disable-next-line @typescript-eslint/no-shadow
    querySnapshot.forEach((doc) => {
      const { species } = doc.data();
      speciesArray = [...speciesArray, ...species];
    });
    // @ts-ignore
    return [...new Set(speciesArray)];
  },

  getDiveData: async (
    userId: string,
    diveId: string,
  ) => {
    try {
      const docRef = doc(db, `Test_Dives/${userId}/userDives`, diveId);
      const docSnap = await getDoc(docRef);
      return docSnap.data();
    } catch (e) {
      console.log(e.message);
      throw new Error('get dive data error');
    }
  },

  updateDiveData: async (
    userId: string,
    diveId: string,
    dive: DiveType,
  ) => {
    try {
      const docRef = doc(db, `Test_Dives/${userId}/userDives`, diveId);
      await setDoc(docRef, { ...dive }, { merge: false });
      return true;
    } catch (e) {
      console.log(e.message);
      throw new Error('update dive data error');
    }
  },

  deleteDives: async (
    userId: string,
    diveIds: Array<string>,
  ) => {
    try {
      for (let i = 0; i < diveIds.length; i++) {
        const docRef = doc(db, `Test_Dives/${userId}/userDives`, diveIds[i]);
        // eslint-disable-next-line no-await-in-loop
        await deleteDoc(docRef);
      }
    } catch (e) {
      console.log(e.message);
      throw new Error('delete dive data error');
    }
  },

  deleteDiveData: async (
    userId: string,
    diveId: string,
  ) => {
    try {
      const docRef = doc(db, `Test_Dives/${userId}/userDives`, diveId);
      await deleteDoc(docRef);
      return true;
    } catch (e) {
      console.log(e.message);
      throw new Error('delete dive data error');
    }
  },

  getDiveField: async (userId: string = '0HmlinuLc5Q6OyRywFWdiod6Ikt1') => {
    const docRef = doc(db, 'Test_Dives', userId);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data());
    return docSnap.data();
  },
};
