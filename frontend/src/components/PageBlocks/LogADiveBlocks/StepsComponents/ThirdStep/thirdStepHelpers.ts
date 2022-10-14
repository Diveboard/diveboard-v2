import React from 'react';
import { SpotType } from '../../../../../firebase/firestore/models';
import {
  firestoreSpotsService,
} from '../../../../../firebase/firestore/firestoreServices/firestoreSpotsService';
import { Coords } from '../../../../../types';

export const createNewSpotHandler = (
  setNewSpotNameError: React.Dispatch<React.SetStateAction<string>>,
  setNewSpotCountryError: React.Dispatch<React.SetStateAction<string>>,
  setNewSpotRegionError: React.Dispatch<React.SetStateAction<string>>,
  setNewSpotLocationError: React.Dispatch<React.SetStateAction<string>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setCreateSpotMode: React.Dispatch<React.SetStateAction<boolean>>,
) => async (newSpotData: SpotType) => {
  let error = false;
  const {
    name,
    location: {
      country,
      region,
      location,
    },
  } = newSpotData;
  if (name.length < 3) {
    error = true;
    setNewSpotNameError('fill spot name more than 3 letters');
  }
  if (!country.length) {
    error = true;
    setNewSpotCountryError('fill spot country');
  }
  if (!region.length) {
    error = true;
    setNewSpotRegionError('fill spot region');
  }
  if (!location.length) {
    error = true;
    setNewSpotLocationError('fill spot location');
  }

  if (!error) {
    setLoading(true);
    await firestoreSpotsService.setNewSpot(newSpotData);
    setLoading(false);
    setCreateSpotMode(false);
  }
};

export const createNewSpotData = (
  name: string,
  country: string,
  region: string,
  location: string,
  coords: Coords,
  zoom: number,
) => ({
  oldId: null,
  name,
  location: {
    lat: coords.lat,
    lng: coords.lng,
    zoom,
    location,
    region,
    country,
  },
  bestPictures: [],
  description: '',
  dives: [],
  score: 0,
  shops: [],
  species: [],
  stats: {
    averageDepth: {
      imperial: 0,
      metric: 0,
    },
    visibility: '',
    averageCurrent: '',
    averageTemperatureOnSurface: {
      imperial: 0,
      metric: 0,
    },
    averageTemperatureOnBottom: {
      imperial: 0,
      metric: 0,
    },
    divesLogged: 0,
    divers: 0,
  },
});
