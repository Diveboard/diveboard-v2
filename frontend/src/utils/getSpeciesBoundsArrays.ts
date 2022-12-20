import { Coords } from '../types';

export const getSpeciesBoundsArrays = (coords: Coords) => {
  const boundsNumber = 3;
  const roundedCoords = {
    lat: Math.trunc(coords.lat),
    lng: Math.trunc(coords.lng),
  };
  const boundsArray: { lat: number, lng: number }[] = [];

  boundsArray.push({ lat: roundedCoords.lat, lng: roundedCoords.lng });

  // left up
  for (let i = 0; i < boundsNumber + 1; i++) {
    for (let j = 0; j < boundsNumber + 1; j++) {
      if (i !== 0 || j !== 0) {
        boundsArray.push({
          lat: roundedCoords.lat + i,
          lng: roundedCoords.lng + (j * -1),
        });
      }
    }
  }

  // right up
  for (let i = 0; i < boundsNumber + 1; i++) {
    for (let j = 0; j < boundsNumber + 1; j++) {
      if (i !== 0 && j !== 0) {
        boundsArray.push({
          lat: roundedCoords.lat + i,
          lng: roundedCoords.lng + j,
        });
      }
    }
  }

  // left down
  for (let i = 0; i < boundsNumber + 1; i++) {
    for (let j = 0; j < boundsNumber + 1; j++) {
      if (i !== 0 && j !== 0) {
        boundsArray.push({
          lat: roundedCoords.lat + (i * -1),
          lng: roundedCoords.lng + (j * -1),
        });
      }
    }
  }

  // right down
  for (let i = 0; i < boundsNumber + 1; i++) {
    for (let j = 0; j < boundsNumber + 1; j++) {
      if (i !== 0 || j !== 0) {
        boundsArray.push({
          lat: roundedCoords.lat + (i * -1),
          lng: roundedCoords.lng + j,
        });
      }
    }
  }
  const first = boundsArray.slice(0, 10);
  const second = boundsArray.slice(10, 20);
  const third = boundsArray.slice(20, 30);
  const forth = boundsArray.slice(30, 40);
  const fifth = boundsArray.slice(40, 49);
  return [first, second, third, forth, fifth];
};
