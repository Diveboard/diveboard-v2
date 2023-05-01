export const convertCalToFar = (celsius: number): number => +((celsius * 9) / 5 + 32).toFixed(2);

export const convertFarToCal = (fahrenheit: number): number => +(((fahrenheit - 32) * 5) / 9).toFixed(2);

export const convertBarToPsi = (bar: number): number => bar * 14.5;

export const convertPsiToBar = (psi: number): number => psi / 14.5;

export const convertMetersToFeet = (meters: number): number => +(meters * 3.2808).toFixed(2);

export const convertFeetToMeters = (feet: number): number => +(feet / 3.2808).toFixed(2);

export const convertKgToLbs = (kg: number): number => +(kg * 2.205).toFixed(1);

export const convertLbsToKg = (lbs: number): number => +(lbs / 2.205).toFixed(1);

export const convertWeight = (userAuth, diveUnitSystem, weight) => {
  const w = +weight.toFixed(2);
  if (!userAuth) {
    return `${w} kg`;
  }
  const userUnitSystem = userAuth.settings.preferences.unitSystem;

  if (diveUnitSystem.toUpperCase() === userUnitSystem) {
    return `${w} ${userUnitSystem === 'METRIC' ? 'kg' : 'lbs'}`;
  }

  if (userUnitSystem === 'METRIC') {
    return `${convertLbsToKg(w)} kg`;
  }
  return `${convertKgToLbs(w)} lbs`;
};

export const convertDepth = (userAuth, diveUnitSystem, depth) => {
  if (!userAuth) {
    return `${depth || 0} ${diveUnitSystem === 'metric' ? 'm' : 'ft'}`;
  }
  const userUnitSystem = userAuth.settings.preferences.unitSystem;

  if (diveUnitSystem.toLowerCase() === userUnitSystem.toLowerCase()) {
    return `${depth || 0} ${userUnitSystem === 'METRIC' ? 'm' : 'ft'}`;
  }
  if (userUnitSystem === 'METRIC') {
    return `${depth ? convertFeetToMeters(depth) : 0} m`;
  }
  return `${depth ? convertMetersToFeet(depth) : 0} ft`;
};

export const convertTempSystem = (userAuth, diveUnitSystem, value: number): string => {
  if (!userAuth) {
    return `${value} º${diveUnitSystem === 'metric' ? 'C' : 'F'}`;
  }
  const userUnitSystem = userAuth.settings.preferences.unitSystem;
  if (diveUnitSystem.toLowerCase() === userUnitSystem.toLowerCase()) {
    return `${value} º${userUnitSystem === 'METRIC' ? 'C' : 'F'}`;
  }
  if (userUnitSystem === 'METRIC') {
    return `${convertFarToCal(value)} ºC`;
  }
  return `${convertCalToFar(value)} ºF`;
};

export const convertExploreTempSystem = (userAuth, value: number): string => {
  if (!userAuth) {
    return `${value ? value?.toFixed(2) : 0} ºC`;
  }
  const userUnitSystem = userAuth.settings.preferences.unitSystem;
  if (userUnitSystem === 'IMPERIAL') {
    return `${value ? convertCalToFar(value)?.toFixed(2) : 0} ºF`;
  }
  return `${value ? value?.toFixed(2) : 0} ºC`;
};

export const convertExploreDepthSystem = (userAuth, value): string => {
  if (!userAuth) {
    return `${value ? value?.toFixed(2) : 0} m`;
  }
  const userUnitSystem = userAuth.settings.preferences.unitSystem;
  if (userUnitSystem === 'IMPERIAL') {
    return `${value ? convertMetersToFeet(value)?.toFixed(2) : 0} ft`;
  }
  return `${value ? value?.toFixed(2) : 0} m`;
};
