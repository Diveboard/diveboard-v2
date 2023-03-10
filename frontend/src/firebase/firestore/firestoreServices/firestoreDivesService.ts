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
  updateDoc,
  where,
} from '@firebase/firestore';
import { db } from '../firebaseFirestore';
import { DiveType, SpotType } from '../models';
import { convertTimestampDate } from '../../../utils/convertTimestampDate';
import { firestoreSpotsService } from './firestoreSpotsService';
import { PropertiesType } from '../../../types';
import { firestoreSurveyService } from './firestoreSurveyService';
import { PathEnum } from '../firestorePaths';
import { firestoreGalleryService } from './firestoreGalleryService';
import { firestoreLogbookService } from './firestoreLogbookService';
import { deleteCache } from '../../../utils/refreshCache';

export const firestoreDivesService = {
  uploadFiles: async (data, userId, spotId) => {
    const mediaUrls = data.mediaUrl;
    const spot = spotId ? doc(db, `${PathEnum.SPOTS}/${spotId}`) : null;
    const result = [];
    if (mediaUrls?.length) {
      for (let i = 0; i < mediaUrls.length; i++) {
        if (!mediaUrls[i].id) {
          const createdAt = new Date();
          const newPic = {
            // eslint-disable-next-line no-await-in-loop
            pic: await firestoreGalleryService.addImgToGallery({
              url: mediaUrls[i].url,
              user: userId,
              createdAt: new Date(),
              media: 'IMAGE',
              height: 0,
              width: 0,
              spot,
              videoUrl: null,
            }),
            createdAt,
          };
          result.push(newPic);
        } else {
          const ref = doc(db, `${PathEnum.PICTURES}/${mediaUrls[i].id}`);
          // eslint-disable-next-line no-await-in-loop
          const snap = await getDoc(ref);
          const { createdAt } = snap.data();
          result.push({ pic: [mediaUrls[i].id, ref], createdAt });
        }
      }
    }

    const { files } = data;
    if (files?.length) {
      for (let i = 0; i < files.length; i++) {
        // eslint-disable-next-line no-await-in-loop
        const res = await firestoreGalleryService.uploadGalleryFile(userId, files[i].file);
        // eslint-disable-next-line no-await-in-loop
        const imageRef = await firestoreGalleryService.getGalleryFile(res.ref);
        if (imageRef) {
          const createdAt = new Date();
          result.push({
            // eslint-disable-next-line no-await-in-loop
            pic: await firestoreGalleryService.addImgToGallery({
              url: imageRef,
              user: userId,
              createdAt,
              media: 'IMAGE',
              height: 0,
              width: 0,
              spot,
              videoUrl: null,
            }),
            createdAt,
          });
        } else {
          throw new Error('Error');
        }
      }
    }
    return result;
  },

  setDiveData: async (diveData: DiveType, userId: string, saveDan: boolean = false) => {
    try {
      const ref = doc(collection(db, `${PathEnum.DIVES}/${userId}/${PathEnum.DIVE_DATA}`));
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
      if (diveData.spotRef?.id) {
        const spot = await firestoreSpotsService.getSpotByRef(diveData.spotRef);
        const newSpot = { ...spot };
        spot.dives[ref.id] = ref;
        spotData = newSpot;
        diveData.locationName = newSpot.locationName;
        await firestoreSpotsService.updateSpotById(diveData.spotRef.id, newSpot);
      }
      // @ts-ignore
      const pics = diveData.pictures.files || diveData.pictures.mediaUrl?.length
        ? await firestoreDivesService
          .uploadFiles(diveData.pictures, userId, diveData.spotRef?.id) : [];
      const divePromise = setDoc(
        ref,
        {
          ...diveData,
          pictures: Object.fromEntries(pics.map((picture) => picture.pic)),
        },
        { merge: true },
      );
      const logbookPromise = firestoreLogbookService.addDiveToLogbook(
        userId,
        { ...diveData, pictures: pics },
        spotData,
        ref,
      );
      await Promise.all([divePromise, logbookPromise, deleteCache()]);
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
      const spot = dive.spotRef?.id ? await firestoreSpotsService.getSpotByRef(dive.spotRef) : null;
      const spotData = spot;
      if (spot) {
        if (dive.spotRef?.id !== spotRef?.id) {
          const newSpot = { ...spot };
          newSpot.dives[docRef.id] = docRef;
          dive.spotRef = spot.ref;
          dive.locationName = newSpot.locationName;
          await firestoreSpotsService.updateSpotById(dive.spotRef.id, newSpot);
          if (spotRef?.id) {
            const oldSpot = await firestoreSpotsService.getSpotByRef(spotRef);
            const oldSpotCopy = { ...oldSpot };
            delete oldSpotCopy.dives[diveId];
            await firestoreSpotsService.updateSpotById(spotRef.id, oldSpotCopy);
          }
        }
      }
      // @ts-ignore
      const pics = dive.pictures.files || dive.pictures.mediaUrl?.length
        ? await firestoreDivesService
          .uploadFiles(dive.pictures, userId, dive.spotRef?.id) : [];
      const divePromise = setDoc(
        docRef,
        { ...dive, pictures: Object.fromEntries(pics.map((picture) => picture.pic)) },
        { merge: false },
      );
      const logbookPromise = firestoreLogbookService.updateDiveInLogbook(
        userId,
        { ...dive, pictures: pics },
        spotData,
        docRef,
      );
      await Promise.all([divePromise, logbookPromise, deleteCache()]);

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
      for (let i = 0; i < dives.length; i++) {
        if (Object.entries(dives[i].pictures).length) {
          const [key, value] = Object.entries(dives[i].pictures)[0];
          // @ts-ignore
          // eslint-disable-next-line no-await-in-loop
          const pictures = await firestoreGalleryService.getBestPictures({ [key]: value });
          dives[i].pictures = pictures.map((pic) => ({ url: pic }));
        }
      }
      return dives;
    } catch (e) {
      throw new Error(e.message);
    }
  },

  getDivesCountByUserId: async (userId: string, idx: number = -1) => {
    try {
      const docRef = collection(db, `${PathEnum.DIVES}/${userId}/${PathEnum.DIVE_DATA}`);
      const q = query(
        docRef,
      );
      const querySnapshot = await getDocs(q);
      return { size: querySnapshot.size, idx };
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
        if (data) {
          const dive = {
            ...data,
            id: doc.id,
            date: data.diveData?.date ? convertTimestampDate(data.diveData.date) : null,
          };
          if (dive) {
            dives.push(dive);
          }
        }
      });
      for (const dive of dives) {
        // eslint-disable-next-line no-await-in-loop
        const spot = dive.spotRef ? await firestoreSpotsService.getSpotByRef(dive.spotRef) : null;
        dive.spot = spot;
        dive.spotName = spot ? `${spot.locationName}, ${spot.countryName}, ${spot.regionName}` : null;
        if (Object.entries(dive.pictures).length && draft) {
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
          const buddies = copyFromDive.buddies.map((buddy) => ({
            ...buddy,
            userRef: doc(db, `${PathEnum.USERS}/${buddy.id}`),
          }));
          newProperties.buddies = buddies;
        }
        if (properties.Spot && copyFromDive.spotRef) {
          // @ts-ignore
          const { segments } = copyFromDive.spotRef._key.path;
          const newSpotRef = doc(db, `${PathEnum.SPOTS}/${segments[segments.length - 1]}`);
          newProperties.spotRef = newSpotRef;
          // eslint-disable-next-line no-await-in-loop
          const spot = await getDoc(newSpotRef);
          const { locationName } = spot.data();
          newProperties.locationName = locationName;
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
        const { pictures, spotRef } = docSnap.data();
        if (spotRef?.id) {
          // eslint-disable-next-line no-await-in-loop
          const spot = await firestoreSpotsService.getSpotByRef(spotRef);
          const newSpot = { ...spot };
          delete newSpot.dives[docRef.id];
          // eslint-disable-next-line no-await-in-loop
          await firestoreSpotsService.updateSpotById(spotRef.id, newSpot);
        }
        if (pictures) {
          const picturesIds = Object.keys(pictures);
          for (let j = 0; j < picturesIds.length; j++) {
            // eslint-disable-next-line no-await-in-loop
            await firestoreGalleryService.deleteImageById(picturesIds[j]);
          }
        }
        // eslint-disable-next-line no-await-in-loop
        await deleteDoc(docRef);
      }
      await firestoreLogbookService.deleteDiveFromLogbook(userId, diveIds);
    } catch (e) {
      throw new Error(e.message);
    }
  },

  getDiveByRef: async (
    diveRef: DocumentReference,
    idx: number = -1,
  ) => {
    try {
      const docSnap = await getDoc(diveRef);
      return {
        ...docSnap.data(), id: docSnap.id, ref: docSnap.ref, idx,
      };
    } catch (e) {
      throw new Error(e.message);
    }
  },

  getDivesByRefs: async (
    divesRefs: { [key: string]: DocumentReference },
    slice: boolean | number = false,
  ) => {
    try {
      const divesLength = Object.values(divesRefs).length;
      const size = !slice || divesLength < slice ? divesLength : slice;
      const divesPromises = [];
      const picturesPromises = [];
      const divesIds = typeof slice === 'number'
        ? Object.values(divesRefs).slice(0, slice)
        : Object.values(divesRefs);
      const dives = [];
      for (let i = 0; i < size; i++) {
        divesPromises.push(firestoreDivesService.getDiveByRef(divesIds[i], i));
      }
      await Promise.all(divesPromises)
        .then((values) => values.forEach((value) => {
          if (value) {
            if (value.pictures) {
              const key = Object.keys(value.pictures)[0];
              picturesPromises.push(firestoreGalleryService.getPicById(key, value.idx));
            }
            dives.push(value);
          }
        }));
      await Promise.all(picturesPromises)
        .then((values) => values.forEach((value) => {
          if (value.idx !== -1) {
            dives[value.idx].pictures = [{ url: value.url || '' }];
          }
        }));
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

  getSpotsCoordsByUserDives: async (userId: string) => {
    try {
      const ref = collection(db, `${PathEnum.DIVES}/${userId}/${PathEnum.DIVE_DATA}`);
      const q = query(
        ref,
      );
      const docSnap = await getDocs(q);
      const promises = [];

      docSnap.forEach((d) => {
        const data = d.data();
        if (data.spotRef) {
          promises.push(getDoc(data.spotRef));
        }
      });
      return await Promise.all(promises).then((values) => values.map((res) => {
        const { lat, lng, name } = res.data() as SpotType;
        return {
          lat, lng, id: res.id, name,
        };
      }));
    } catch (e) {
      throw new Error(e.message);
    }
  },
};
