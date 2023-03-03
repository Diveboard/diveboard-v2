// Shops
const shopsSegment = 'test-shops';
const shopsPath = shopsSegment;
// Guides
const guidesSegment = 'guides';
const guidesPath = `${shopsSegment}/guides`;
// Species
const speciesSegment = 'test-species';
const speciesPath = speciesSegment;

// Surveys
const surveysSegment = 'test-surveys';
const surveysPath = surveysSegment;
const DANSegment = 'DAN';
const DANPath = `${surveysPath}/${DANSegment}`;

export enum PathEnum {
  GEONAMES_ALTERNATIVE = 'geoname_alternatives',
  GEONAMES = 'geonames',

  COUNTRIES = 'countries',
  AREAS = 'areas',
  REGIONS = 'regions',
  LOCATIONS = 'locations',

  USERS = 'users',

  DIVES = 'dives',
  DIVE_DATA = 'userDives',
  DIVE_COMMENTS = 'comments',

  SPECIES = 'species',
  SPECIES_CNAMES = 'species_cnames',
  SPECIES_COORDS = 'species_coords',

  PICTURES = 'pictures',
  LOGBOOK = 'logbook_data',

  SPOTS = 'spots',
  SURVEYS = 'surveys',
  SHOPS = 'shops',
}

export const firestorePaths = {
  shops: {
    path: shopsPath,
    segment: shopsSegment,
    guides: {
      path: guidesPath,
      segment: guidesSegment,
    },
  },
  species: {
    path: speciesPath,
    segment: speciesSegment,
  },
  surveys: {
    path: surveysPath,
    segment: surveysSegment,
    DAN: {
      path: DANPath,
      segment: DANSegment,
    },
  },
} as const;
