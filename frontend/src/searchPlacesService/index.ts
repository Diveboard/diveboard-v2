import { Coords } from '../types';

export const getPredictions = async (place: string) => {
  const res = await fetch(`/api/predictions?place=${place}`);
  return res.json();
};

export const getLocation = async (placeId: string) => {
  const res = await fetch(`/api/location?placeId=${placeId}`);
  return res.json();
};

export const getGeoDataByCoords = async (coords: Coords) => {
  // const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=AIzaSyBXXdI_5hZO2t6ZTeRTBicQRLe9d9He6os`);

  // const result = await fetch(`https://geocode.xyz/${coords.lat},${coords.lng}?json=1&auth=427160786162527501743x19638`);
  // console.log(' result', await result.json());

  // return res.json();
};
