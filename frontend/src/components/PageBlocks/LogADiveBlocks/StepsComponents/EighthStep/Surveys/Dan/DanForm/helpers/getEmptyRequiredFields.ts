import { RequiredFormItemsType } from './getRequiredFields';

export const getEmptyRequiredFields = (requiredFields: RequiredFormItemsType) => {
  const empty: string[] = [];

  for (const key in requiredFields) {
    if (!requiredFields[key] || requiredFields[key] === '0') {
      empty.push(key);
    }
  }
  return empty;
};
