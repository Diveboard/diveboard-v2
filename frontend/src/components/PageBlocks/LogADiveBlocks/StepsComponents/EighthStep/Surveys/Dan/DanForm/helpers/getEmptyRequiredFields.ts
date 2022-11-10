import { RequiredFormItemsType } from './getRequiredFields';

export const getEmptyRequiredFields = (requiredFields: RequiredFormItemsType) => {
  const empty: string[] = [];

  for (const key in requiredFields) {
    if (!requiredFields[key]) {
      empty.push(key);
    }
  }
  return empty;
};
