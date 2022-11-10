import { RequiredFormItemsType } from './getRequiredFields';

export const getProgress = (requiredFields: RequiredFormItemsType) => {
  let progress = 0;

  for (const key in requiredFields) {
    if (requiredFields[key]) {
      progress += 6;
    } else {
      // console.log({ key });
    }
  }

  return progress > 100 ? 100 : progress;
};
