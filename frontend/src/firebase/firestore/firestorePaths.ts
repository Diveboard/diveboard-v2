// Users
const usersSegment = 'test-users'; // 'users'
const settingsSegment = 'settings';
const notificationsSegment = 'notifications';
const preferencesSegment = 'preferences';
const divesSegment = 'dives';
const extraSegment = 'extra';

const usersPath = usersSegment;
const settingsPath = `${usersPath}/${settingsSegment}`;
const notificationsPath = `${settingsPath}/${notificationsSegment}`;
const preferencesPath = `${settingsPath}/${preferencesSegment}`;
const divesPath = `${usersPath}/${divesSegment}`;
const extraPath = `${divesPath}/${extraSegment}`;
// Spots
const spotsSegment = 'test-spots';// 'spots'
const spotsPath = spotsSegment;
// Shops
const shopsSegment = 'test-shops';
const shopsPath = shopsSegment;
// Guides
const guidesSegment = 'guides';
const guidesPath = `${shopsSegment}/guides`;
// Countries
const countriesSegment = 'countries';
const countriesPath = countriesSegment;
// Geonemes core
const geonamesSegment = 'geonames_cores';
const geonamesPath = geonamesSegment;
// Regions
const regionsSegment = 'regions';
const regionsPath = regionsSegment;
// Feature code
const featureCodeSegment = 'geonames_featurecodes';
const featureCodePath = featureCodeSegment;
// Species
const speciesSegment = 'test-species';
const speciesPath = speciesSegment;

// Surveys
const surveysSegment = 'test-surveys';
const surveysPath = surveysSegment;
const DANSegment = 'DAN';
const DANPath = `${surveysPath}/${DANSegment}`;

export const firestorePaths = {
  users: {
    segment: usersSegment,
    path: usersPath,
    settings: {
      segment: settingsSegment,
      path: settingsPath,
      notifications: { path: notificationsPath, segment: notificationsSegment },
      preferences: { path: preferencesPath, segment: preferencesSegment },
    },
    dives: {
      path: divesPath,
      segment: divesSegment,
      extra: { path: extraPath, segment: extraSegment },
    },
  },
  spots: {
    path: spotsPath,
    segment: spotsSegment,
  },
  shops: {
    path: shopsPath,
    segment: shopsSegment,
    guides: {
      path: guidesPath,
      segment: guidesSegment,
    },
  },
  countries: { path: countriesPath, segment: countriesSegment },
  geonames: {
    path: geonamesPath,
    segment: geonamesSegment,
  },
  regions: {
    path: regionsPath,
    segment: regionsSegment,
  },
  featureCode: {
    path: featureCodePath,
    segment: featureCodeSegment,
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
