import {
  collection, deleteDoc,
  doc, DocumentReference, DocumentSnapshot, getDoc, getDocs, orderBy, query, setDoc,
} from '@firebase/firestore';
import { firestoreDivesService } from './firestoreDivesService';
import { firestoreSpeciesServices } from './firestoreSpeciesServices';
import { firestorePublicProfileService } from './firestorePublicProfileService';
import { firestoreSpotsService } from './firestoreSpotsService';
import { firestoreCommentsService } from './firestoreCommentsService';
import { firestoreGalleryService } from './firestoreGalleryService';
import { db } from '../firebaseFirestore';
import { PathEnum } from '../firestorePaths';
import { DiveType, SpotType } from '../models';

export const firestoreLogbookService = {
  getDive: async (userId: string, diveId: string, withComments: boolean = false) => {
    try {
      const data = await firestoreDivesService.getDiveData(
        userId as string,
        diveId as string,
      );

      const comments = withComments
        ? await firestoreCommentsService.getComments(userId, diveId)
        : [];

      if (!data) {
        throw new Error('Dive is not found');
      }
      let spot = null;
      let species = [];
      let buddies = [];
      let pictures = [];

      if (data?.spotRef) {
        spot = await firestoreSpotsService.getSpotByRef(data.spotRef);
      }

      if (data?.species) {
        species = await firestoreSpeciesServices.getSpeciesByRefs(data.species, 4);
      }

      if (data?.buddies.length) {
        buddies = await firestorePublicProfileService.getBuddiesInfo(data.buddies, 2);
      }

      if (data?.pictures) {
        pictures = await firestoreGalleryService.getBestPictures(data.pictures, 5);
      }

      const diveUser = await firestorePublicProfileService.getUserById(userId as string);
      return {
        diveUser: diveUser ? JSON.parse(JSON.stringify(diveUser)) : null,
        dive: data ? JSON.parse(JSON.stringify(data)) : null,
        comments: JSON.parse(JSON.stringify(comments)),
        spot: spot ? JSON.parse(JSON.stringify(spot)) : null,
        speciesData: JSON.parse(JSON.stringify(species)),
        species: JSON.parse(JSON.stringify(
          Object.values(data.species).map((s) => ({ specieRef: s })),
        )),
        buddiesData: JSON.parse(JSON.stringify(buddies)),
        buddies: JSON.parse(JSON.stringify(data.buddies)),
        picturesData: JSON.parse(JSON.stringify(pictures)),
        pictures: JSON.parse(JSON.stringify(
          Object.values(data.pictures).map((p) => ({ pictureRef: p })),
        )),
      };
    } catch (e) {
      throw new Error(e.message);
    }
  },

  loadDives: async (dives, size = 4) => {
    try {
      const divesPromises = [];
      const picturesPromises = [];
      for (let i = 0; i < size; i++) {
        if (dives[i]?.diveRef) {
          divesPromises.push(getDoc(dives[i].diveRef));
        }
      }
      const divesData = await Promise.all(divesPromises)
        .then((values) => values
          .map((value, idx) => {
            const data = value.data();
            if (!data) {
              return null;
            }
            if (Object.values(data.pictures).length) {
              const val = Object.keys(data.pictures)[0];
              picturesPromises.push(firestoreGalleryService.getPicById(val, idx));
            }
            return { ...data, id: value.id };
          }));
      await Promise.all(picturesPromises)
        .then((values) => values.forEach((value) => {
          if (value.idx !== -1) {
            divesData[value.idx].pictures = [{ url: value.url, id: value.id, ref: value.ref }];
          }
        }));
      return divesData;
    } catch (e) {
      throw new Error(e.message);
    }
  },

  getLogbookData: async (uid: string) => {
    try {
      const docRef = doc(db, `${PathEnum.LOGBOOK}/${uid}`);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();

      if (!data) {
        return {
          data: null,
          divesData: [],
          pictures: [],
          species: [],
          buddies: [],
        };
      }
      const {
        longestDive, deepestDive, species, buddies,
      } = data;

      const divesRef = collection(db, `${PathEnum.LOGBOOK}/${uid}/${PathEnum.LOGBOOK_DIVES}`);
      const q = query(divesRef, orderBy('diveNumber', 'desc'));
      const divesSnap = await getDocs(q);
      const dives = [];

      if (divesSnap?.size) {
        divesSnap.forEach((dive) => (dives.push({ ...dive.data(), id: dive.id })));
      }

      data.dives = dives;

      const divesData = await firestoreLogbookService.loadDives(dives, 4);

      const pictures = data.pictures?.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
      let longestDiveName = '';
      let deepestDiveName = '';

      const speciesPromises = [];
      const picturesPromises = [];
      let buddiesData = [];
      if (species?.length) {
        for (let i = 0; i < 4; i++) {
          if (species[i]?.specieRef.id) {
            speciesPromises.push(getDoc(species[i].specieRef));
          }
        }
      }
      if (pictures?.length) {
        for (let i = 0; i < 5; i++) {
          if (pictures[i]?.pictureRef.id) {
            picturesPromises.push(firestoreGalleryService.getPicById(pictures[i].pictureRef.id));
          }
        }
      }

      if (buddies?.length) {
        buddiesData = await firestorePublicProfileService.getBuddiesInfo(buddies, 2);
      }
      const picturesData = await Promise.all(picturesPromises)
        .then((values) => values
          .map((value) => value.url)
          .filter((url) => url));

      const speciesData = await Promise.all(speciesPromises)
        .then((values) => values
          .map((value) => ({ ...value.data(), id: value.id })));

      if (longestDive && longestDive?.spot) {
        const spotDoc: DocumentSnapshot<SpotType> = await getDoc(longestDive.spot);
        const spot = spotDoc.data();
        longestDiveName = `${spot?.locationName || ''}, ${spot?.regionName || ''}, ${spot?.countryName || ''}`;
      }
      if (deepestDive && deepestDive?.spot) {
        const spotDoc: DocumentSnapshot<SpotType> = await getDoc(longestDive.spot);
        const spot = spotDoc.data();
        deepestDiveName = `${spot?.locationName || ''}, ${spot?.regionName || ''}, ${spot?.countryName || ''}`;
      }
      if (data.longestDive) {
        data.longestDive.longestDiveName = longestDiveName;
      }
      if (data.deepestDive) {
        data.deepestDive.deepestDiveName = deepestDiveName;
      }
      return {
        data: JSON.parse(JSON.stringify(data)),
        divesData: divesData.length ? JSON.parse(JSON.stringify(divesData)) : [],
        pictures: picturesData.length ? JSON.parse(JSON.stringify(picturesData)) : [],
        species: speciesData.length ? JSON.parse(JSON.stringify(speciesData)) : [],
        buddies: buddiesData.length ? JSON.parse(JSON.stringify(buddiesData)) : [],
      };
    } catch (e) {
      throw new Error(e.message);
    }
  },

  updateDiveInLogbook: async (userId: string, dive: DiveType, spotData, ref) => {
    try {
      const logbookRef = doc(db, `${PathEnum.LOGBOOK}/${userId}`);
      const logbookSnap = await getDoc(logbookRef);
      const logbookData = logbookSnap.data();
      const logbookDive = {
        countryName: spotData?.countryName || '',
        diveRef: ref,
        draft: dive.draft,
        publishingMode: dive.publishingMode,
        year: dive.diveData.date.getFullYear(),
        diveNumber: dive.aboutDive.diveNumber,
      };

      let pictures = [];
      let species = [];
      let buddies = [];
      let longestDive = logbookData?.longestDive;
      let deepestDive = logbookData?.deepestDive;
      if (!longestDive
          || longestDive.time < dive.diveData.duration
          || longestDive.diveRef.id === ref.id
      ) {
        longestDive = {
          diveRef: ref,
          time: dive.diveData.duration,
          spot: spotData?.ref || null,
        };
      }

      if (!deepestDive
          || deepestDive.depth < dive.diveData.maxDepth
          || deepestDive.diveRef.id === ref.id
      ) {
        deepestDive = {
          diveRef: ref,
          depth: dive.diveData.maxDepth,
          spot: spotData?.ref || null,
          unitSystem: dive.unitSystem.toLowerCase(),
        };
      }
      const divePictures = dive.pictures?.length ? dive.pictures
        .map((pic) => ({ diveRef: ref, pictureRef: pic.pic[1], createdAt: pic.createdAt })) : [];

      if (logbookData?.pictures?.length) {
        pictures = logbookData.pictures?.filter((pic) => pic.diveRef.id !== ref.id);
      }

      const diveSpecies = dive.species ? Object.values(dive.species)
        .map((specie) => ({ diveRef: ref, specieRef: specie })) : [];

      if (logbookData?.species?.length) {
        species = logbookData.species?.filter((pic) => pic.diveRef.id !== ref.id);
      }

      const diveBuddies = dive.buddies?.length ? dive.buddies
        .map((bud) => ({
          diveRef: ref,
          userRef: bud.userRef ? doc(db, `${PathEnum.USERS}/${bud.userRef.id}`) : null,
          email: bud.email || null,
          name: bud.name || null,
        })) : [];

      if (logbookData?.buddies?.length) {
        buddies = logbookData.buddies?.filter((bud) => bud.diveRef.id !== ref.id);
      }

      pictures = [...pictures, ...divePictures];
      species = [...species, ...diveSpecies];
      buddies = [...buddies, ...diveBuddies];

      const diveRef = doc(db, `${PathEnum.LOGBOOK}/${userId}/${PathEnum.LOGBOOK_DIVES}/${ref.id}`);
      await setDoc(diveRef, logbookDive);

      const underwaterTime = logbookData.underwaterTime.map((d) => {
        if (d.diveRef.id === ref.id) {
          d.time = dive.diveData.duration;
        }
        return d;
      });
      await setDoc(
        logbookRef,
        {
          pictures,
          species,
          longestDive,
          deepestDive,
          underwaterTime,
          buddies,
          oldId: '4',
        },
        { merge: true },
      );
    } catch (e) {
      throw new Error(e.message);
    }
  },

  addDiveToLogbook: async (
    userId: string,
    diveData: DiveType,
    spotData,
    ref: DocumentReference,
  ) => {
    try {
      const logbookDive = {
        countryName: spotData?.countryName || '',
        diveRef: ref,
        draft: diveData.draft,
        publishingMode: diveData.publishingMode,
        year: diveData.diveData.date.getFullYear(),
        diveNumber: diveData.aboutDive.diveNumber,
      };
      const logbookSpecies = Object.values(diveData.species)
        .map((specie) => ({ diveRef: ref, specieRef: specie }));
      const logbookPictures = diveData.pictures
        .map((pic) => ({ diveRef: ref, pictureRef: pic.pic[1], createdAt: pic.createdAt }));
      const logbookBuddies = Object.values(diveData.buddies)
        .map((bud) => ({
          diveRef: ref,
          userRef: bud.userRef ? doc(db, `${PathEnum.USERS}/${bud.userRef.id}`) : null,
          email: bud.email || null,
          name: bud.name || null,
        }));
      const logbookRef = doc(db, `${PathEnum.LOGBOOK}/${userId}`);
      const logbookSnap = await getDoc(logbookRef);
      const logbookData = logbookSnap.data();

      const species = logbookData?.species ? [...logbookData.species, ...logbookSpecies] : [];
      const pictures = logbookData?.pictures ? [...logbookData.pictures, ...logbookPictures] : [];
      const buddies = logbookData?.buddies ? [...logbookData.buddies, ...logbookBuddies] : [];

      let longestDive = logbookData?.longestDive || null;

      if (
        longestDive === null
          || longestDive === {}
          || longestDive?.time < diveData.diveData.duration
      ) {
        longestDive = {
          diveRef: ref,
          time: diveData.diveData.duration,
          spot: spotData?.ref || null,
        };
      }

      let deepestDive = logbookData?.deepestDive || null;
      if (deepestDive === null
          || deepestDive === {}
          || deepestDive?.depth < diveData.diveData.maxDepth
      ) {
        deepestDive = {
          diveRef: ref,
          depth: diveData.diveData.maxDepth,
          spot: spotData?.ref || null,
          unitSystem: diveData.unitSystem.toLowerCase(),
        };
      }
      const underwaterTime = logbookData?.underwaterTime || [];

      underwaterTime.push({
        diveRef: ref,
        time: diveData.diveData.duration,
      });
      const diveRef = doc(db, `${PathEnum.LOGBOOK}/${userId}/${PathEnum.LOGBOOK_DIVES}/${ref.id}`);
      await setDoc(diveRef, logbookDive, { merge: false });

      await setDoc(logbookRef, {
        species, pictures, longestDive, deepestDive, underwaterTime, buddies,
      }, { merge: true });
    } catch (e) {
      throw new Error(e.message);
    }
  },

  deleteDiveFromLogbook: async (userId: string, diveIds: Array<string>) => {
    try {
      const logbookRef = doc(db, `${PathEnum.LOGBOOK}/${userId}`);
      const logbookSnap = await getDoc(logbookRef);
      const logbookData = logbookSnap.data();
      let pictures = logbookData?.pictures || [];
      let species = logbookData?.species || [];
      let buddies = logbookData?.buddies || [];
      let underwaterTime = logbookData?.underwaterTime || [];
      let longestDive = logbookData?.longestDive;
      let deepestDive = logbookData?.deepestDive;

      const isLongestDiveDeleted = diveIds.some((diveId) => longestDive?.diveRef?.id === diveId);
      const isDeepestDiveDeleted = diveIds.some((diveId) => deepestDive?.diveRef?.id === diveId);
      if (isLongestDiveDeleted) {
        longestDive = await firestoreDivesService.getLongestDive(userId);
      }

      if (isDeepestDiveDeleted) {
        deepestDive = await firestoreDivesService.getDeepestDive(userId);
      }

      buddies = buddies.filter((buddy) => !diveIds.some((diveId) => buddy.diveRef.id === diveId));

      underwaterTime = underwaterTime
        .filter((dive) => !diveIds
          .some((diveId) => dive.diveRef.id === diveId));
      pictures = pictures
        .filter((picture) => !diveIds
          .some((diveId) => picture.diveRef.id === diveId));
      species = species
        .filter((specie) => !diveIds
          .some((diveId) => specie.diveRef.id === diveId));

      await setDoc(
        logbookRef,
        {
          pictures, species, underwaterTime, longestDive, deepestDive, buddies,
        },
        { merge: true },
      );

      for (let i = 0; i < diveIds.length; i++) {
        const diveRef = doc(db, `${PathEnum.LOGBOOK}/${userId}/${PathEnum.LOGBOOK_DIVES}/${diveIds[i]}`);
        // eslint-disable-next-line no-await-in-loop
        await deleteDoc(diveRef);
      }
    } catch (e) {
      throw new Error(e.message);
    }
  },

  unpublishDivesToLogbook: async (userId: string, diveIds: Array<string>) => {
    try {
      for (let i = 0; i < diveIds.length; i++) {
        const diveRef = doc(db, `${PathEnum.LOGBOOK}/${userId}/${PathEnum.LOGBOOK_DIVES}/${diveIds[i]}`);
        // eslint-disable-next-line no-await-in-loop
        const diveSnap = await getDoc(diveRef);
        const data = diveSnap.data();
        if (data) {
          data.draft = true;
        }
        // eslint-disable-next-line no-await-in-loop
        await setDoc(diveRef, data);
      }
    } catch (e) {
      throw new Error(e.message);
    }
  },

  addSurveyToLogbook: async (userId: string, surveyRef: DocumentReference) => {
    try {
      const logbookRef = doc(db, `${PathEnum.LOGBOOK}/${userId}`);
      const logbookSnap = await getDoc(logbookRef);
      const { surveys = [] } = logbookSnap.data();
      surveys.push(surveyRef);
      await setDoc(logbookRef, { surveys }, { merge: true });
    } catch (e) {
      throw new Error(e.message);
    }
  },
};
