import { firestoreDivesService } from './firestoreDivesService';
import { firestoreSpeciesServices } from './firestoreSpeciesServices';
import { firestorePublicProfileService } from './firestorePublicProfileService';
import { firestoreSurveyService } from './firestoreSurveyService';

export const firestoreLogbookService = {
  getLogbookData: async (uid: string) => {
    try {
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

      const logbookUser = await firestorePublicProfileService.getUserById(uid as string);
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
