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
  Timestamp, updateDoc,
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
import { firestoreLogbookService } from './firestoreLogbookService';

export const firestoreDivesService = {
  setDiveData: async (diveData: DiveType, userId: string, saveDan: boolean = false) => {
    try {
      const ref = doc(collection(db, `${PathEnum.DIVES}/${userId}`, 'userDives'));
      let spotData = null;
      if (diveData.danSurvey) {
        diveData.surveyRef = await firestoreSurveyService.addSurvey(
          userId,
          ref,
          diveData.danSurvey,
          saveDan,
        );
      } else {
        diveData.surveyRef = null;
      }
      delete diveData.danSurvey;
      if (diveData.spotRef) {
        const spot = await firestoreSpotsService.getSpotByRef(diveData.spotRef);
        const newSpot = { ...spot };
        diveData.spotRef = spot.ref;
        newSpot.dives[ref.id] = ref;
        spotData = newSpot;
        await firestoreSpotsService.updateSpotById(diveData.spotId, newSpot);
      }
      await firestoreLogbookService.addDiveToLogbook(userId, diveData, spotData, ref);
      await setDoc(ref, { ...diveData }, { merge: true });
    } catch (e) {
      throw new Error(e.message);
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
        let { surveyRef } = docSnap.data();
        surveyRef = await firestoreSurveyService.updateSurvey(
          userId,
          surveyRef,
          diveId,
          dive.danSurvey,
          saveDan,
        );
        dive.surveyRef = surveyRef;
      }
      delete dive.danSurvey;
      const { spotRef } = await docSnap.data();
      // TODO: Add dive to new spot. Check for logbook
      const spot = dive.spotRef?.id ? await firestoreSpotsService.getSpotByRef(dive.spotRef) : null;
      const spotData = spot;
      if (spot) {
        if (dive.spotRef?.id !== spotRef.id) {
          const newSpot = { ...spot };
          newSpot.dives[docRef.id] = docRef;
          dive.spotRef = spot.ref;
          await firestoreSpotsService.updateSpotById(dive.spotRef.id, newSpot);

          // if (spotRef?.id) {
          //   // Delete dive from old spot
          //   const spotO = await firestoreSpotsService.getSpotById(spotRef.id);
          //   const oldSpot = { ...spotO };
          //   oldSpot.dives = oldSpot.dives?.filter((i) => i !== diveId);
          //   spotData = spotO;
          //   await firestoreSpotsService.updateSpotById(spotRef.id, oldSpot);
          // }
        }
      }
      await firestoreLogbookService.updateDiveInLogbook(userId, dive, spotData, docRef);
      await setDoc(docRef, { ...dive }, { merge: false });
      return true;
    } catch (e) {
      throw new Error(e.message);
    }
  },

  unpublishDives: async (userId: string, diveIds: Array<string>) => {
    try {
      await firestoreLogbookService.unpublishDivesToLogbook(userId, diveIds);
      for (let i = 0; i < diveIds.length; i++) {
        const docRef = doc(db, `${PathEnum.DIVES}/${userId}/${PathEnum.DIVE_DATA}`, diveIds[i]);
        // eslint-disable-next-line no-await-in-loop
        const docSnap = await getDoc(docRef);
        // eslint-disable-next-line no-await-in-loop
        await setDoc(docRef, { ...docSnap.data(), draft: true }, { merge: true });
      }
    } catch (e) {
      throw new Error(e.message);
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
      throw new Error(e.message);
    }
  },

  getDivesByLocationName: async (userId: string, locationName: string) => {
    try {
      const docRef = collection(db, `${PathEnum.DIVES}/${userId}/${PathEnum.DIVE_DATA}`);
      const q = query(
        docRef,
        where('locationName', '==', locationName),
      );
      const querySnapshot = await getDocs(q);
      const dives = [];
      querySnapshot.forEach((dive) => {
        dives.push({ ...dive.data(), id: dive.id });
      });
      return dives;
    } catch (e) {
      throw new Error(e.message);
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
      throw new Error(e.message);
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
        if (dive) {
          dives.push(dive);
        }
      });
      for (const dive of dives) {
        // eslint-disable-next-line no-await-in-loop
        const spot = dive.spotRef ? await firestoreSpotsService.getSpotByRef(dive.spotRef) : null;
        dive.spot = spot;
        dive.spotName = spot ? `${spot.location?.location}, ${spot.location?.country}, ${spot?.location.region}` : null;
        if (dive.pictures === {} && draft) {
          const [key, value] = Object.entries(dive.pictures)[0];
          // @ts-ignore
          // eslint-disable-next-line no-await-in-loop
          const pictures = await firestoreGalleryService.getBestPictures({ [key]: value });
          dive.pictures = pictures.map((pic) => ({ url: pic }));
        }
      }
      return dives;
    } catch (e) {
      throw new Error(e.message);
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
      throw new Error(e.message);
    }
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
      throw new Error(e.message);
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
        const docSnap = await getDoc(docRef);
        const { pictures, surveyRef } = docSnap.data();
        if (pictures) {
          const picturesIds = Object.keys(pictures);
          for (let j = 0; j < picturesIds.length; j++) {
            // eslint-disable-next-line no-await-in-loop
            await firestoreGalleryService.deleteImageById(picturesIds[j]);
          }
        }
        if (surveyRef) {
          // eslint-disable-next-line no-await-in-loop
          await firestoreLogbookService.deleteSurveyFromLogbook(userId, surveyRef.id);
        }
        // eslint-disable-next-line no-await-in-loop
        await deleteDoc(docRef);
      }
      await firestoreLogbookService.deleteDiveFromLogbook(userId, diveIds);
    } catch (e) {
      throw new Error(e.message);
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
      throw new Error(e.message);
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
        let pictures = [];
        if (data.pictures) {
          const key = Object.keys(data.pictures)[0];
          const value = Object.values(data.pictures)[0];
          // @ts-ignore
          // eslint-disable-next-line no-await-in-loop
          pictures = await firestoreGalleryService.getBestPictures({ [key]: value });
        }
        dives.push({
          ...data, id: docSnap.id, ref: docSnap.ref, pictures: [{ url: pictures[0] || '' }],
        });
      }
      return dives;
    } catch (e) {
      throw new Error(e.message);
    }
  },

  deletePictureFromDive: async (
    userId: string,
    diveId: string,
    pictureId: string,
  ) => {
    try {
      const docRef = doc(db, `${PathEnum.DIVES}/${userId}/${PathEnum.DIVE_DATA}`, diveId);
      const docSnap = await getDoc(docRef);
      const { pictures } = docSnap.data();
      delete pictures[pictureId];
      await updateDoc(docRef, {
        pictures,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  },

  getLongestDive: async (userId: string) => {
    try {
      let longestDive = null;
      const ref = collection(db, `${PathEnum.DIVES}/${userId}/${PathEnum.DIVE_DATA}`);
      const q = query(
        ref,
        orderBy('diveData.duration', 'desc'),
        limit(1),
      );

      const docSnap = await getDocs(q);
      docSnap.forEach((d) => {
        const data = d.data();
        if (data) {
          longestDive = {
            diveRef: d.ref,
            time: data.diveData.duration,
            spot: data.spotRef || null,
          };
        }
      });
      return longestDive;
    } catch (e) {
      throw new Error(e.message);
    }
  },

  getDeepestDive: async (userId: string) => {
    try {
      let deepestDive = null;
      const ref = collection(db, `${PathEnum.DIVES}/${userId}/${PathEnum.DIVE_DATA}`);
      const q = query(
        ref,
        orderBy('diveData.maxDepth', 'desc'),
        limit(1),
      );
      const docSnap = await getDocs(q);
      docSnap.forEach((d) => {
        const data = d.data();
        if (data) {
          deepestDive = {
            diveRef: d.ref,
            spot: data.spotRef || null,
            depth: data.diveData.maxDepth,
            unitSystem: data.unitSystem?.toLowerCase(),
          };
        }
      });
      return deepestDive;
    } catch (e) {
      throw new Error(e.message);
    }
  },
};
