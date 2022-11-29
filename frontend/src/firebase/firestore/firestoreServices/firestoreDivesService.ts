import {
  collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, where,
} from '@firebase/firestore';
import { db } from '../firebaseFirestore';
import { DiveType } from '../models';
import { convertTimestampDate } from '../../../utils/convertTimestampDate';
import { firestoreSpotsService } from './firestoreSpotsService';
import { PropertiesType } from '../../../types';

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
          ...data,
          id: doc.id,
          date: data.diveData?.date ? convertTimestampDate(data.diveData.date) : null,
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

  updateDiveProperties: async (
    userId: string,
    copyFromDive: DiveType,
    copyToDiveIds: Array<string>,
    properties: PropertiesType,
  ) => {
    try {
      for (let i = 0; i < copyToDiveIds.length; i++) {
        const docRef = doc(db, `Test_Dives/${userId}/userDives`, copyToDiveIds[i]);
        // eslint-disable-next-line no-await-in-loop
        const docSnap = await getDoc(docRef);
        const newProperties = {
          ...docSnap.data(),
        };
        if (properties.Buddies && copyFromDive.buddies?.length) {
          newProperties.buddies = copyFromDive.buddies;
        }
        if (properties.Spot && copyFromDive.spotId) {
          newProperties.spotId = copyFromDive.spotId;
        }
        if (properties['Tanks user'] && copyFromDive.tanks?.length) {
          newProperties.tanks = copyFromDive.tanks;
        }
        if (properties.Visibility && copyFromDive.diveData?.waterVisibility) {
          newProperties.diveData.waterVisibility = copyFromDive.diveData.waterVisibility;
        }
        if (properties['Gear used'] && copyFromDive.gears?.length) {
          newProperties.gears = copyFromDive.gears;
        }
        if (properties.Guide && copyFromDive.diveCenter?.guide) {
          newProperties.diveCenter.guide = copyFromDive.diveCenter.guide;
        }
        if (properties['Dive Shop'] && copyFromDive.diveCenter?.id) {
          newProperties.diveCenter.id = copyFromDive.diveCenter.id;
        }
        if (properties['Dive type'] && copyFromDive.diveActivities?.length) {
          newProperties.diveActivities = copyFromDive.diveActivities;
        }
        if (properties.Ratings) {
          if (copyFromDive.aboutDive?.diveDifficulty) {
            newProperties.aboutDive.diveDifficulty = copyFromDive.aboutDive.diveDifficulty;
          }
          if (copyFromDive.aboutDive?.bigFish) {
            newProperties.aboutDive.diveDifficulty = copyFromDive.aboutDive.bigFish;
          }
          if (copyFromDive.aboutDive?.marineLifeQuality) {
            newProperties.aboutDive.diveDifficulty = copyFromDive.aboutDive.marineLifeQuality;
          }
          if (copyFromDive.aboutDive?.wreck) {
            newProperties.aboutDive.diveDifficulty = copyFromDive.aboutDive.wreck;
          }
          if (copyFromDive.aboutDive?.overReview) {
            newProperties.aboutDive.diveDifficulty = copyFromDive.aboutDive.overReview;
          }
        }
        // eslint-disable-next-line no-await-in-loop
        await setDoc(docRef, { ...newProperties }, { merge: true });
      }
    } catch (e) {
      console.log(e.message);
      throw new Error('update dive properties error');
    }
  },

  getImagesInDives: async (
    userId: string,
  ) => {
    const docRef = collection(db, `Test_Dives/${userId}/userDives`);
    const q = query(
      docRef,
      where('externalImgsUrls', '!=', []),
    );
    const querySnapshot = await getDocs(q);
    const images = [];
    const foundSpotsSet = new Set();
    // eslint-disable-next-line @typescript-eslint/no-shadow
    querySnapshot.forEach((doc) => {
      const {
        externalImgsUrls, diveData, draft, spotId,
      } = doc.data();
      externalImgsUrls.forEach((i) => {
        images.push({
          img: i,
          date: diveData?.date ? convertTimestampDate(diveData.date) : null,
          draft,
          spot: spotId,
        });
        foundSpotsSet.add(spotId);
      });
    });
    const spots: { [key: string]: string } = {};
    // @ts-ignore Get spots names
    const foundSpots = [...foundSpotsSet];
    for (let i = 0; i < foundSpots.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      spots[foundSpots[i]] = await firestoreSpotsService.getSpotNameById(foundSpots[i]);
    }

    return images.map((i) => ({
      ...i,
      spot: spots[i.spot],
    }));
  },

  getUserSpeciesInDives: async (
    userId: string,
  ) => {
    const docRef = collection(db, `Test_Dives/${userId}/userDives`);
    const q = query(
      docRef,
      where('species', '!=', []),
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
