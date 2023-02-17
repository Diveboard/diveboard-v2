import {
  doc, DocumentReference, DocumentSnapshot, getDoc, setDoc,
} from '@firebase/firestore';
import { firestoreDivesService } from './firestoreDivesService';
import { firestoreSpeciesServices } from './firestoreSpeciesServices';
import { firestorePublicProfileService } from './firestorePublicProfileService';
import { firestoreSpotsService } from './firestoreSpotsService';
import { firestoreCommentsService } from './firestoreCommentsService';
import { firestoreGalleryService } from './firestoreGalleryService';
import { db } from '../firebaseFirestore';
import { PathEnum } from '../firestorePaths';
import { DiveType, SpeciesType, SpotType } from '../models';
import { ImageInfo } from '../../../types';

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

      if (data?.spotId) {
        spot = await firestoreSpotsService.getSpotById(data.spotId);
      }

      if (data?.species) {
        // TODO: Add pagination
        species = await firestoreSpeciesServices.getSpeciesByRefs(data.species);
      }

      if (data?.buddies.length) {
        // TODO: Add pagination
        buddies = await firestorePublicProfileService.getBuddiesInfo(data.buddies, data?.spotId);
      }

      if (data?.pictures) {
        // TODO: Add pagination
        pictures = await firestoreGalleryService.getBestPictures(data.pictures);
      }

      const diveUser = await firestorePublicProfileService.getUserById(userId as string);
      return {
        diveUser: diveUser ? JSON.parse(JSON.stringify(diveUser)) : null,
        dive: data ? JSON.parse(JSON.stringify(data)) : null,
        comments: JSON.parse(JSON.stringify(comments)),
        spot: spot ? JSON.parse(JSON.stringify(spot)) : null,
        species: JSON.parse(JSON.stringify(species)),
        buddies: JSON.parse(JSON.stringify(buddies)),
        pictures: JSON.parse(JSON.stringify(pictures)),
      };
    } catch (e) {
      throw new Error(e.message);
    }
  },

  loadDives: async (dives, size = 4) => {
    try {
      const divesData = [];
      for (let i = 0; i < size; i++) {
        if (dives[i]?.diveRef) {
          // eslint-disable-next-line no-await-in-loop
          const diveSnap: DocumentSnapshot<DiveType> = await getDoc(dives[i].diveRef);
          const diveD = diveSnap.data();
          if (diveD) {
            if (diveD.pictures) {
              const value: unknown = Object.values(diveD.pictures)[0];
              if (value) {
                // eslint-disable-next-line no-await-in-loop
                const picSnap: DocumentSnapshot<ImageInfo> = await getDoc(
                  value as DocumentReference<ImageInfo>,
                );
                diveD.pictures = [{ url: picSnap.data().url, id: picSnap.id, ref: picSnap.ref }];
              }
            }
            divesData.push({ ...diveD, id: diveSnap.id });
          }
        }
      }
      return divesData;
    } catch (e) {
      throw new Error(e.message);
    }
  },

  getLogbookData: async (uid: string) => {
    // TODO: Map
    // TODO: Species Images
    // TODO: Pagination for pictures
    // TODO: Dive Buddies
    // TODO: Save to draft

    try {
      const logbookUser = await firestorePublicProfileService.getUserById(uid as string);
      const docRef = doc(db, `${PathEnum.LOGBOOK}/${uid}`);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();

      if (!logbookUser) {
        throw new Error('Logbook is not exist');
      }

      if (!data) {
        return {
          logbookUser: JSON.parse(JSON.stringify(logbookUser)),
          data: null,
          divesData: [],
          pictures: [],
          species: [],
        };
      }
      const {
        dives, longestDive, deepestDive, pictures, species,
      } = data;
      let longestDiveName = '';
      let deepestDiveName = '';
      let divesData = [];
      const picturesData = [];
      const speciesData = [];
      if (species?.length) {
        for (let i = 0; i < species.length; i++) {
          if (i < 4) {
            // eslint-disable-next-line no-await-in-loop
            const specieSnap: DocumentSnapshot<SpeciesType> = await getDoc(species[i].specieRef);
            speciesData.push({ ...specieSnap.data(), id: specieSnap.id });
          }
        }
      }

      if (pictures?.length) {
        for (let i = 0; i < pictures.length; i++) {
          if (i < 4) {
            if (pictures[i].pictureRef.id) {
              // eslint-disable-next-line no-await-in-loop
              const pic = await firestoreGalleryService.getPicById(pictures[i].pictureRef.id);
              if (pic) {
                picturesData.push(pic.url);
              }
            }
          }
        }
      }

      if (dives?.length) {
        divesData = await firestoreLogbookService.loadDives(dives, 4);
      }
      if (longestDive && longestDive?.spot) {
        const spot: DocumentSnapshot<SpotType> = await getDoc(longestDive.spot);
        const { locationName, regionName, countryName } = spot.data();
        longestDiveName = `${locationName || ''}, ${regionName || ''} ${countryName || ''}`;
      }
      if (deepestDive && deepestDive?.spot) {
        const spot: DocumentSnapshot<SpotType> = await getDoc(longestDive.spot);
        const { locationName, regionName, countryName } = spot.data();
        deepestDiveName = `${locationName || ''}, ${regionName || ''} ${countryName || ''}`;
      }
      if (data.longestDive) {
        data.longestDive.longestDiveName = longestDiveName;
      }
      if (data.deepestDive) {
        data.deepestDive.deepestDiveName = deepestDiveName;
      }
      return {
        logbookUser: JSON.parse(JSON.stringify(logbookUser)),
        data: JSON.parse(JSON.stringify(data)),
        divesData: divesData.length ? JSON.parse(JSON.stringify(divesData)) : [],
        pictures: picturesData.length ? JSON.parse(JSON.stringify(picturesData)) : [],
        species: speciesData.length ? JSON.parse(JSON.stringify(speciesData)) : [],
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
        countryName: spotData?.location?.countryName || '',
        diveRef: ref,
        draft: dive.draft,
        publishingMode: dive.publishingMode,
        year: dive.diveData.date.getFullYear(),
      };

      let pictures = [];
      let species = [];
      let longestDive = logbookData?.longestDive;
      let deepestDive = logbookData?.deepestDive;

      if (!longestDive || longestDive.time < dive.diveData.duration) {
        longestDive = {
          diveRef: ref,
          time: dive.diveData.duration,
          spot: spotData?.ref || null,
        };
      }

      if (!deepestDive || deepestDive.depth < dive.diveData.maxDepth) {
        deepestDive = {
          diveRef: ref,
          depth: dive.diveData.maxDepth,
          spot: spotData?.ref || null,
          unitSystem: dive.unitSystem.toLowerCase(),
        };
      }

      const divePictures = dive.pictures ? Object.values(dive.pictures)
        .map((pic) => ({ diveRef: ref, pictureRef: pic })) : [];

      if (logbookData?.pictures?.length) {
        pictures = logbookData.pictures.filter((pic) => pic.diveRef !== ref);
      }
      const diveSpecies = Object.values(dive.species)
        .map((specie) => ({ diveRef: ref, specieRef: specie }));

      if (logbookData?.species?.length) {
        species = logbookData.species.filter((pic) => pic.diveRef.id !== ref.id);
      }

      if (logbookData?.pictures?.length) {
        pictures = logbookData.pictures.filter((pic) => pic.diveRef.id !== ref.id);
      }

      pictures = [...pictures, ...divePictures];
      species = [...species, ...diveSpecies];
      const dives = logbookData?.dives || [];
      const diveForUpdate = dives.findIndex((d) => d.diveRef === ref);

      const underwaterTime = logbookData.underwaterTime.map((d) => {
        if (d.diveRef.id === ref.id) {
          d.time = dive.diveData.duration;
        }
        return d;
      });

      if (diveForUpdate) {
        dives[diveForUpdate] = logbookDive;
        await setDoc(
          logbookRef,
          {
            dives, pictures, species, longestDive, deepestDive, underwaterTime,
          },
          { merge: true },
        );
      }
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
        countryName: spotData?.location?.countryName || '',
        diveRef: ref,
        draft: diveData.draft,
        publishingMode: diveData.publishingMode,
        year: diveData.diveData.date.getFullYear(),
      };
      const logbookSpecies = Object.values(diveData.species)
        .map((specie) => ({ diveRef: ref, specieRef: specie }));
      const logbookPictures = Object.values(diveData.pictures)
        .map((pic) => ({ diveRef: ref, pictureRef: pic }));

      const logbookRef = doc(db, `${PathEnum.LOGBOOK}/${userId}`);
      const logbookSnap = await getDoc(logbookRef);
      const logbookData = logbookSnap.data();
      const dives = logbookData?.dives || [];

      const species = logbookData?.species ? [...logbookData.species, ...logbookSpecies] : [];
      const pictures = logbookData?.pictures ? [...logbookData.pictures, ...logbookPictures] : [];

      let longestDive = logbookData?.longestDive;
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

      let deepestDive = logbookData?.deepestDive;
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

      dives.push(logbookDive);
      await setDoc(logbookRef, {
        dives, species, pictures, longestDive, deepestDive, underwaterTime,
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
      let dives = logbookData?.dives || [];
      let pictures = logbookData?.pictures || [];
      let species = logbookData?.species || [];
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

      dives = dives.filter((dive) => !diveIds.some((diveId) => dive.diveRef.id === diveId));

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
          dives, pictures, species, underwaterTime, longestDive, deepestDive,
        },
        { merge: true },
      );
    } catch (e) {
      throw new Error(e.message);
    }
  },

  unpublishDivesToLogbook: async (userId: string, diveIds: Array<string>) => {
    try {
      const logbookRef = doc(db, `${PathEnum.LOGBOOK}/${userId}`);
      const logbookSnap = await getDoc(logbookRef);
      const logbookData = logbookSnap.data();
      let dives = logbookData?.dives || [];

      dives = dives.map((dive) => {
        if (diveIds.some((diveId) => dive.diveRef.id === diveId)) {
          dive.draft = true;
        }
        return dive;
      });

      await setDoc(logbookRef, { dives }, { merge: true });
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
