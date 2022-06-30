import React from 'react';
import { SecondStepType } from './stepTypes';

export type StepType = 0 | 1 | 2 | 3 | 4 | 5 |
6 | 7 | 8 | 9;

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
