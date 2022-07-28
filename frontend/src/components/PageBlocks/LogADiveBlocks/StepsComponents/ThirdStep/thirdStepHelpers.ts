import React from 'react';
import { MarkerType } from '../../types/commonTypes';

const hasNewPointChanged = (
  currentMarkers: MarkerType[],
  currentNewMarker: MarkerType,
) => currentMarkers[currentMarkers.length - 1].diveName !== currentNewMarker.diveName
  && currentMarkers[currentMarkers.length - 1].lat !== currentNewMarker.lat
  && currentMarkers[currentMarkers.length - 1].lng !== currentNewMarker.lng;

const hasNewPointCoordsChanged = (
  currentMarkers: MarkerType[],
  currentNewMarker: MarkerType,
) => currentMarkers[currentMarkers.length - 1].diveName === currentNewMarker.diveName
  && currentMarkers[currentMarkers.length - 1].lat !== currentNewMarker.lat
  && currentMarkers[currentMarkers.length - 1].lng !== currentNewMarker.lng;

export const usePointsHandlers = (
  markers: MarkerType[],
  setChosenPoint: React.Dispatch<React.SetStateAction<MarkerType>>,
  setMarkers: React.Dispatch<React.SetStateAction<MarkerType[]>>,
  setNewPoint: React.Dispatch<React.SetStateAction<boolean>>,
  setNewSpotNameError: React.Dispatch<React.SetStateAction<string>>,
) => ({
  setPointHandler: (value: string) => {
    const point = markers.find((item) => item.diveName === value);
    setChosenPoint(point);
  },

  setNewPointHandler: (newSpotName: string, newPointCoords: { lat: number, lng: number }) => {
    if (newSpotName.length >= 5) {
      const newMarker = {
        id: markers[markers.length - 1].id + 1,
        divesCount: 1,
        lat: newPointCoords.lat,
        lng: newPointCoords.lng,
        diveName: newSpotName,
      };

      if (hasNewPointChanged(markers, newMarker)) {
        setMarkers([...markers, newMarker]);
        setChosenPoint(newMarker);
      } else if (hasNewPointCoordsChanged(markers, newMarker)) {
        const newMarkers = [...markers];
        newMarkers[newMarkers.length - 1] = newMarker;
        setMarkers([...newMarkers]);
        setChosenPoint(newMarker);
      }
      setNewPoint(false);
    } else {
      setNewSpotNameError('fill spot name, please');
    }
  },
});
