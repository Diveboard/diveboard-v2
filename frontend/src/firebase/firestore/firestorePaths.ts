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
const shopsSegment = 'shops';
const shopsPath = shopsSegment;
// Countries
const countriesSegment = 'countries';
const countriesPath = countriesSegment;

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
  shops: { path: shopsPath, segment: shopsSegment },
  countries: { path: countriesPath, segment: countriesSegment },
} as const;
