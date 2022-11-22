import {
  collection, deleteDoc, doc, getDoc, getDocs, query, setDoc,
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
    } catch (e) {
      console.log({ e });
      throw new Error('set  dive data error');
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
          number: data.aboutDive.diveNumber,
          spotId: data.spotId,
          date: convertTimestampDate(data.diveData.date).toISOString(),
          divetime: data.diveData.duration,
          depth: data.diveData.maxDepth,
          diversCount: data.buddies.length,
          trip: data.aboutDive.tripName,
          diveShop: data.diveCenter.id,
          water: data.diveData.waterType,
          visibility: data.diveData.waterVisibility,
          altitude: data.diveData.altitude,
          featuredGear: data.gears?.map((gear) => gear.typeOfGear).toString(),
        };
        dives.push(dive);
      });
      for (const dive of dives) {
        // eslint-disable-next-line no-await-in-loop
        dive.spot = await firestoreSpotsService.getSpotById(dive.spotId);
      }
      return dives;
    } catch (e) {
      console.log(e.message);
      throw new Error('get dive data error');
    }
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
