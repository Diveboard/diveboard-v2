import React from 'react';
import { SeventhStepType } from '../types/stepTypes';
import { GearType, SetGearParametersType } from '../types/commonTypes';

export const getGearsActions = (
  gears: SeventhStepType['gears'],
  setGears: React.Dispatch<SeventhStepType['gears']>,
) => (id: number | string):SetGearParametersType => {
  const setParameters = (
    parameterType: keyof GearType,
    value: unknown,
  ) => gears.map((gearItem) => {
    if (gearItem.id === id) {
      // eslint-disable-next-line no-param-reassign
      gearItem[parameterType as string] = value;
      return gearItem;
    }
    return gearItem;
  });

  return {
    setGearParameters: {
      deleteGear: () => {
        const newGears = gears.filter((gearItem) => gearItem.id !== id);
        setGears(newGears);
      },
      setTypeOfGear: (gearType) => {
        setGears(setParameters('typeOfGear', gearType));
      },
      setManufacturer: (manufacture) => {
        setGears(setParameters('manufacturer', manufacture));
      },
      setModel: (model) => {
        setGears(setParameters('model', model));
      },
      setDateAcquired: (date) => {
        setGears(setParameters('dateAcquired', date));
      },
      setLastMaintenance: (date) => {
        setGears(setParameters('lastMaintenance', date));
      },
    },
  };
};
