import { FirstStepType } from '../types/stepTypes';

export const convertDiveActivities = (diveActivities: FirstStepType['diveActivities']) => {
  let activities: string[] = [];
  // eslint-disable-next-line guard-for-in
  for (const key in diveActivities) {
    if (key === 'other') {
      const upperOtherActivities = diveActivities[key].map((item) => item.charAt(0)
        .toUpperCase() + item.slice(1));
      activities = [...activities, ...upperOtherActivities];
    } else if (diveActivities[key]) {
      const activity = key.charAt(0)
        .toUpperCase() + key.slice(1);
      activities.push(activity);
    }
  }
  return activities;
};
