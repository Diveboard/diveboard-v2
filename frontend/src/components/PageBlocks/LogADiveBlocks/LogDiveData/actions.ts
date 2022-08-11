import {
  FirstStepType,
  FifthStepType,
  SecondStepType,
  SixthStepType,
  ThirdStepType,
  SeventhStepType,
  EighthStepType,
  NinthStepType,
} from '../types/stepTypes';

import { StepType } from '../types/commonTypes';

export const diveDataActions = {
  setStep: (step: StepType) => ({
    type: 'set-step',
    payload: { step },
  } as const),

};

export const diveStepDataActions = {
  setFirstStepData: (firstStepData: FirstStepType) => ({
    type: 'set-first-step-data',
    payload: { firstStepData },
  } as const),
  setSecondStepData: (secondStepData: SecondStepType) => ({
    type: 'set-second-step-data',
    payload: { secondStepData },
  } as const),
  setThirdStepData: (thirdStepData: ThirdStepType) => ({
    type: 'set-third-step-data',
    payload: { thirdStepData },
  } as const),
  setFifthStepData: (fifthStepData: FifthStepType) => ({
    type: 'set-fifth-step-data',
    payload: { fifthStepData },
  } as const),
  setSixthStepData: (sixthStepData: SixthStepType) => ({
    type: 'set-sixth-step-data',
    payload: { sixthStepData },
  } as const),
  setSeventhStepData: (seventhStepData: SeventhStepType) => ({
    type: 'set-seventh-step-data',
    payload: { seventhStepData },
  } as const),
  setEighthStepData: (eighthStepData: EighthStepType) => ({
    type: 'set-eighth-step-data',
    payload: { eighthStepData },
  } as const),
  setNinthStepData: (ninthStepData: NinthStepType) => ({
    type: 'set-ninth-step-data',
    payload: { ninthStepData },
  } as const),
};

export type ActionsType = typeof diveDataActions & typeof diveStepDataActions;
