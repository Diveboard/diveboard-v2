export const convertMinutes = (num: number): string => {
  const d = Math.floor(num / 1440);
  const h = Math.floor((num - (d * 1440)) / 60);
  const m = Math.round(num % 60);
  if (d > 0) {
    return `${d} days, ${h} hours, ${m} minutes`;
  }
  if (h > 0) {
    return `${h} hours, ${m} minutes`;
  }
  return `${m} minutes`;
};
