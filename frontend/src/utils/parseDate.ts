import { month } from './date';

export const parseDate = (isoDate: Date): string => {
  if (!isoDate) {
    return '';
  }
  const newDate = new Date(isoDate);
  return `${month[newDate.getMonth()]} ${newDate.getDate()}, ${newDate.getFullYear()}`;
};
