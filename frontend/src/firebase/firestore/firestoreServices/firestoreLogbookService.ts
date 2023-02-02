import { firestoreDivesService } from './firestoreDivesService';
import { firestoreSpeciesServices } from './firestoreSpeciesServices';
import { firestorePublicProfileService } from './firestorePublicProfileService';
import { firestoreSurveyService } from './firestoreSurveyService';
import { firestoreSpotsService } from './firestoreSpotsService';

export const firestoreLogbookService = {
  getDive: async (userId: string, diveId: string) => {
    try {
      const data = await firestoreDivesService.getDiveData(userId as string, diveId as string);
      if (!data) {
        throw new Error('Dive is not found');
      }
      let spot = null;
      let species = [];
      let buddies = [];

      if (data?.spotId) {
        spot = await firestoreSpotsService.getSpotById(data.spotId);
      }

      if (data?.species.length) {
        species = await firestoreSpeciesServices.getSpeciesByIds(data.species);
      }

      if (data?.buddies.length) {
        buddies = await firestorePublicProfileService.getBuddiesInfo(data.buddies, data?.spotId);
      }

      const diveUser = await firestorePublicProfileService.getUserById(userId as string);
      return {
        diveUser: diveUser ? JSON.parse(JSON.stringify(diveUser)) : null,
        dive: data ? JSON.parse(JSON.stringify(data)) : null,
        spot: spot ? JSON.parse(JSON.stringify(spot)) : null,
        species: JSON.parse(JSON.stringify(species)),
        buddies: JSON.parse(JSON.stringify(buddies)),
      };
    } catch (e) {
      console.log(e.message);
      throw new Error('get logbook dive data by id error');
    }
  },
  getLogbookData: async (uid: string) => {
    try {
      const logbookUser = await firestorePublicProfileService.getUserById(uid as string);
      if (!logbookUser) {
        throw new Error('User is not found');
      }
      const data = await firestoreDivesService.getDivesByUserId(uid as string);
      let dives = [];
      let species = [];
      let buddies = [];

      if (Array.isArray(data) && data.length !== 0) {
        dives = JSON.parse(JSON.stringify(data));

        const speciesIds = data.flatMap((dive) => dive.species);

        if (speciesIds.length) {
          species = await firestoreSpeciesServices.getSpeciesByIds(Array.from(new Set(speciesIds)));
        }

        const buddiesIds = data.flatMap((dive) => dive.buddies.map((buddy) => buddy.id || buddy));

        if (buddiesIds.length) {
          const res = Array.from(new Set(buddiesIds)).map((buddy) => {
            if (buddy.name) {
              return buddy;
            }
            return { id: buddy };
          });
          buddies = await firestorePublicProfileService.getBuddiesInfo(res);
        }
      }

      const surveysNumber = await firestoreSurveyService.getUserSurveys(uid as string);
      return {
        logbookUser: logbookUser ? JSON.parse(JSON.stringify(logbookUser)) : null,
        dives,
        species: JSON.parse(JSON.stringify(species)),
        buddies: JSON.parse(JSON.stringify(buddies)),
        surveysNumber,
      };
    } catch (e) {
      console.log(e.message);
      throw new Error('get logbook data by id error');
    }
  },
};
