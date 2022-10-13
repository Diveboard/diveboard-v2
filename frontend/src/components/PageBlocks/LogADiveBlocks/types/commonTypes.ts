import React from 'react';
import { FirstStepType, SecondStepType, SeventhStepType } from './stepTypes';

export type StepType = 0 | 1 | 2 | 3 | 4 | 5 |
6 | 7 | 8 | 9 | 10;

export type ScoreType = 0 | 1 | 2 | 3 | 4 | 5;

export type StepProps = {
  step: StepType
  setStep: React.Dispatch<React.SetStateAction<StepType>>
};

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type TankType = ArrayElement<SecondStepType['tanks']>;

type CylinderType = TankType['cylinder'];
type SizeType = TankType['size'];
type MaterialType = TankType['material'];
type MixtureType = TankType['mixture'];
type MeasuresType = TankType['pressureMeasures'];

export type SetTankParametersType = {
  setTankParameters: {
    setCylinder: (cylinder: CylinderType) => void
    setVolume: (volume: string) => void
    setSize: (size: SizeType) => void
    setMaterial:(material: MaterialType) => void
    setMixture: (mixture:MixtureType)=>void
    setStart: (start: string)=>void
    setEnd: (end: string)=>void
    setMeasures: (measures: MeasuresType)=>void
    deleteTank:()=>void;
  }
};

export type GearsVariantsType = 'BCD' |
'Boots' |
'Camera' |
'Compass' |
'Computer' |
'Cylinder' |
'Dive skin' |
'Dry Suit' |
'Fins' |
'Gloves' |
'Hood' |
'Knife' |
'Lift Bag' |
'Light' |
'Mask' |
'Other' |
'Rebreather' |
'Regulator' |
'Scooter' |
'Wet suit' |
'';

export type GearType = ArrayElement<SeventhStepType['gears']>;

export type SetGearParametersType = {
  setGearParameters:{
    deleteGear: () => void,
    setTypeOfGear: (gearType: GearsVariantsType) => void,
    setManufacturer: (manufacture: string) => void,
    setModel: (model: string) => void,
    setDateAcquired: (date: Date) => void,
    setLastMaintenance: (date: Date) => void,
  }
};

// type Spot = ThirdStepType['spot'];
export type Buddy = {
  id?: string,
  name: string,
  email?: string,
  imgSrc?: string,
};

export type MarkerType = {
  id: number,
  divesCount: number,
  lat: number,
  lng: number,
  diveName: string
};

export type SafetySpot = {
  id: number;
  depth: number;
  period: number;
};

export type DiveReviews = FirstStepType['diveReviews'];
