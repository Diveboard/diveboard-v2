import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  Timestamp,
  where,
} from '@firebase/firestore';
import { db } from '../firebaseFirestore';
import { DiveType } from '../models';
import { convertTimestampDate } from '../../../utils/convertTimestampDate';
import { firestoreSpotsService } from './firestoreSpotsService';
import { PropertiesType } from '../../../types';
import { firestoreSurveyService } from './firestoreSurveyService';

export const firestoreDivesService = {
  setDiveData: async (diveData: DiveType, userId: string, saveDan: boolean = false) => {
    try {
      const ref = doc(collection(db, `Test_Dives/${userId}`, 'userDives'));
      if (diveData.danSurvey) {
        diveData.surveyId = await firestoreSurveyService.addSurvey(
          userId,
          ref.id,
          diveData.danSurvey,
          saveDan,
        );
      } else {
        diveData.surveyId = null;
      }
      delete diveData.danSurvey;
      await setDoc(ref, { ...diveData }, { merge: true });
      if (diveData.spotId) {
        const spot = await firestoreSpotsService.getSpotById(diveData.spotId);
        const newSpot = { ...spot };
        newSpot.dives.push(ref.id);
        newSpot.dive?.push({ diveId: ref.id, userId });
        // TODO: Add to spot data
        await firestoreSpotsService.updateSpotById(diveData.spotId, newSpot);
      }
    } catch (e) {
      console.log({ e });
      throw new Error('set  dive data error');
    }
  },

  updateDiveData: async (
    userId: string,
    diveId: string,
    dive: DiveType,
    saveDan: boolean = false,
  ) => {
    try {
      const docRef = doc(db, `Test_Dives/${userId}/userDives`, diveId);
      const docSnap = await getDoc(docRef);
      if (dive.danSurvey) {
        const surveyId = await firestoreSurveyService.updateSurvey(
          userId,
          dive.surveyId,
          diveId,
          dive.danSurvey,
          saveDan,
        );
        dive.surveyId = surveyId;
      }
      delete dive.danSurvey;
      const { spotId } = await docSnap.data();
      if (dive.spotId !== spotId) {
        // Add dive to new spot
        const spot = await firestoreSpotsService.getSpotById(dive.spotId);
        if (spot) {
          const newSpot = { ...spot };
          newSpot.dive?.push({ diveId, userId });
          newSpot.dives?.push(diveId);
          await firestoreSpotsService.updateSpotById(dive.spotId, newSpot);
        }
        // Delete dive from old spot
        const spotO = await firestoreSpotsService.getSpotById(spotId);
        const oldSpot = { ...spotO };
        oldSpot.dives = oldSpot.dives.filter((i) => i !== diveId);
        await firestoreSpotsService.updateSpotById(spotId, oldSpot);
      }
      await setDoc(docRef, { ...dive }, { merge: false });
      return true;
    } catch (e) {
      console.log(e.message);
      throw new Error('update dive data error');
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

  getDivesCountByUserIdInSpot: async (userId: string, spotId: string) => {
    try {
      const docRef = collection(db, `Test_Dives/${userId}/userDives`);
      const q = query(
        docRef,
        where('spotId', '==', spotId),
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.size;
    } catch (e) {
      console.log(e.message);
      throw new Error('get dive data error');
    }
  },

  getDivesCountByUserId: async (userId: string) => {
    try {
      const docRef = collection(db, `Test_Dives/${userId}/userDives`);
      const q = query(
        docRef,
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.size;
    } catch (e) {
      console.log(e.message);
      throw new Error('get dive data error');
    }
  },

  getDivesByUserId: async (
    userId: string,
    divesLimit: number = 4,
    sort: 'desc' | 'asc' = 'desc',
    lastDate: Timestamp = null,
    draft: boolean = false,
  ) => {
    try {
      const dives = [];
      const docRef = collection(db, `Test_Dives/${userId}/userDives`);

      const first = query(
        docRef,
        orderBy('diveData.date', sort),
        limit(divesLimit),
      );

      const next = query(
        docRef,
        orderBy('diveData.date', sort),
        startAfter(lastDate),
        limit(divesLimit),
      );

      const drafts = query(
        docRef,
        where('draft', '==', true),
      );

      // eslint-disable-next-line no-nested-ternary
      const querySnapshot = await getDocs(draft ? drafts : lastDate ? next : first);

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
        const spot = dive.spotId ? await firestoreSpotsService.getSpotById(dive.spotId) : null;
        dive.spot = spot;
        dive.spotName = spot ? `${spot.location?.location}, ${spot.location?.country}, ${spot?.location.region}` : null;
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
        if (properties['Water Type'] && copyFromDive.diveData.waterType) {
          newProperties.diveData.waterType = copyFromDive.diveData.waterType;
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
    withDraft: boolean = false,
  ) => {
    try {
      const docRef = doc(db, `Test_Dives/${userId}/userDives`, diveId);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      if (withDraft) {
        return data;
      }
      return data && (!data.draft || data.publishMode === 'public') ? data : undefined;
    } catch (e) {
      console.log(e.message);
      throw new Error('get dive data error');
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
      // TODO: Delete this dive in spot
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
