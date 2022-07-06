import React from 'react';
import { SecondStepType } from '../types/stepTypes';
import { SetTankParametersType, TankType } from '../types/commonTypes';

export const getTankActions = (
  tanks: SecondStepType['tanks'],
  setTanks: React.Dispatch<React.SetStateAction<SecondStepType['tanks']>>,
) => (
  id: number,
): SetTankParametersType => {
  const setParameters = (
    parameterType: keyof TankType,
    value: unknown,
  ) => tanks.map((tankItem) => {
    if (tankItem.id === id) {
      // eslint-disable-next-line no-param-reassign
      tankItem[parameterType as string] = value;
      return tankItem;
    }
    return tankItem;
  });
  return {
    setTankParameters: {
      setCylinder: (cylinder) => {
        setTanks(setParameters('cylinder', cylinder));
      },
      setVolume: (volume) => {
        setTanks(setParameters('volume', +volume));
      },
      setSize: (size) => {
        setTanks(setParameters('size', size));
      },
      setMaterial: (material) => {
        setTanks(setParameters('material', material));
      },
      setMixture: (mixture) => {
        setTanks(setParameters('mixture', mixture));
      },
      setStart: (start) => {
        setTanks(setParameters('pressureStart', +start));
      },
      setEnd: (end) => {
        setTanks(setParameters('pressureEnd', +end));
      },
      setMeasures: (measures) => {
        setTanks(setParameters('pressureMeasures', measures));
      },
      deleteTank: () => {
        const newTanks = tanks.filter((tankItem) => tankItem.id !== id);
        setTanks(newTanks);
      },
    },
  };
};
