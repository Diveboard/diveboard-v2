export const convertCalToFar = (celsius: number): number => +((celsius * 9) / 5 + 32).toFixed(2);

export const convertFarToCal = (fahrenheit: number): number => +(((fahrenheit - 32) * 5) / 9).toFixed(2);

export const convertBarToPsi = (bar: number): number => bar * 14.5;

export const convertPsiToBar = (psi: number): number => psi / 14.5;

export const convertMetersToFeet = (meters: number): number => +(meters * 3.2808).toFixed(2);

export const convertFeetToMeters = (feet: number): number => +(feet / 3.2808).toFixed(2);

export const convertKgToLbs = (kg: number): number => +(kg * 2.205).toFixed(1);

export const convertLbsToKg = (lbs: number): number => +(lbs / 2.205).toFixed(1);
