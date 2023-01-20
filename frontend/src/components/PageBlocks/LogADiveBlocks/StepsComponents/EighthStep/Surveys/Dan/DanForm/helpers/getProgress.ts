import { RequiredFormItemsType } from './getRequiredFields';

export const getProgress = (requiredFields: RequiredFormItemsType) => {
  let progress = 0;

  // eslint-disable-next-line guard-for-in
  for (const key in requiredFields) {
    if (requiredFields[key] && requiredFields[key] !== '0') {
      progress += 6;
    } else {
      // console.log({ key });
    }
  }

  return progress > 100 ? 100 : progress;
};
