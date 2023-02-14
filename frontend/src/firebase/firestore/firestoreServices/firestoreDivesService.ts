import {
  collection,
  deleteDoc,
  doc, DocumentReference,
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
import { PathEnum } from '../firestorePaths';
import { firestoreGalleryService } from './firestoreGalleryService';

export const firestoreDivesService = {
  setDiveData: async (diveData: DiveType, userId: string, saveDan: boolean = false) => {
    try {
      const ref = doc(collection(db, `${PathEnum.DIVES}/${userId}`, 'userDives'));
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
        newSpot.dives[ref.id] = ref;
        // newSpot.dive?.push({ diveId: ref.id, userId });
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
      const docRef = doc(db, `${PathEnum.DIVES}/${userId}/${PathEnum.DIVE_DATA}`, diveId);
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
          newSpot.dives?.push({ diveId, userId });
          await firestoreSpotsService.updateSpotById(dive.spotId, newSpot);

          if (spotId) {
            // Delete dive from old spot
            const spotO = await firestoreSpotsService.getSpotById(spotId);
            const oldSpot = { ...spotO };
            oldSpot.dives = oldSpot.dives.filter((i) => i !== diveId);
            await firestoreSpotsService.updateSpotById(spotId, oldSpot);
          }
        }
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
        const docRef = doc(db, `${PathEnum.DIVES}/${userId}/${PathEnum.DIVE_DATA}`, diveIds[i]);
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
      const docRef = collection(db, `${PathEnum.DIVES}/${userId}/${PathEnum.DIVE_DATA}`);
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
      const docRef = collection(db, `${PathEnum.DIVES}/${userId}/${PathEnum.DIVE_DATA}`);
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
      const docRef = collection(db, `${PathEnum.DIVES}/${userId}/${PathEnum.DIVE_DATA}`);

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

      const q = lastDate ? next : first;
      const querySnapshot = await getDocs(draft ? drafts : q);

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
        const docRef = doc(db, `${PathEnum.DIVES}/${userId}/${PathEnum.DIVE_DATA}`, copyToDiveIds[i]);
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
    const docRef = collection(db, `${PathEnum.DIVES}/${userId}/${PathEnum.DIVE_DATA}`);
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
    const docRef = collection(db, `${PathEnum.DIVES}/${userId}/${PathEnum.DIVE_DATA}`);
    const q = query(
      docRef,
      where('species', '!=', {}),
    );
    const querySnapshot = await getDocs(q);
    let speciesSet = new Set();
    querySnapshot.forEach((specDoc) => {
      const { species } = specDoc.data();
      if (species) {
        // @ts-ignore
        speciesSet = { ...speciesSet, species };
      }
    });
    return speciesSet;
  },

  getDiveData: async (
    userId: string,
    diveId: string,
    withDraft: boolean = false,
  ) => {
    try {
      const docRef = doc(db, `${PathEnum.DIVES}/${userId}/${PathEnum.DIVE_DATA}`, diveId);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      if (withDraft) {
        return data;
      }
      return data && (!data.draft || data.publishMode === 'PUBLIC') ? data : undefined;
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
        const docRef = doc(db, `${PathEnum.DIVES}/${userId}/${PathEnum.DIVE_DATA}`, diveIds[i]);
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
      const docRef = doc(db, `${PathEnum.DIVES}/${userId}/${PathEnum.DIVE_DATA}`, diveId);
      // TODO: Delete this dive in spot
      await deleteDoc(docRef);
      return true;
    } catch (e) {
      console.log(e.message);
      throw new Error('delete dive data error');
    }
  },

  getDivesByRefs: async (
    divesRefs: { [key: string]: DocumentReference },
    slice: boolean | number = false,
  ) => {
    try {
      const divesIds = typeof slice === 'number'
        ? Object.values(divesRefs).slice(0, slice)
        : Object.values(divesRefs);
      const dives = [];
      for (let i = 0; i < divesIds.length; i++) {
        // eslint-disable-next-line no-await-in-loop
        const docSnap = await getDoc(divesIds[i]);
        const data = docSnap.data();
        let externalImgsUrls = [];
        if (data.pictures) {
          const key = Object.keys(data.pictures)[0];
          const value = Object.values(data.pictures)[0];
          // eslint-disable-next-line no-await-in-loop
          externalImgsUrls = await firestoreGalleryService.getBestPictures({ [key]: value });
        }
        dives.push({
          ...data, id: docSnap.id, ref: docSnap.ref, externalImgsUrls,
        });
      }
      return dives;
    } catch (e) {
      throw new Error(e.message);
    }
  },
};
