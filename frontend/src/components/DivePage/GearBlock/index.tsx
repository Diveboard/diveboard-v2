import React, { FC, useContext } from 'react';

import { DivePageMobContainer } from '../DivePageMobContainer';
import { DivePageTitle } from '../DivePageTitle';

import styles from './styles.module.scss';
import { SeventhStepType } from '../../PageBlocks/LogADiveBlocks/types/stepTypes';
import { UnitSystem } from '../../../firebase/firestore/models';
import { convertKgToLbs, convertLbsToKg } from '../../../utils/unitSystemConverter';
import { AuthStatusContext } from '../../../layouts/AuthLayout';

type Props = {
  gears: SeventhStepType['gears'];
  weight: number;
  diveUnitSystem: UnitSystem
};

export const GearUsed: FC<Props> = ({
  gears,
  weight,
  diveUnitSystem,
}): JSX.Element => {
  const {
    userAuth,
  } = useContext(AuthStatusContext);

  const convertWeights = () => {
    if (!userAuth) {
      return `${weight} kg`;
    }
    const userUnitSystem = userAuth.settings.preferences.unitSystem;

    if (diveUnitSystem === userUnitSystem) {
      return `${weight} ${userUnitSystem === 'METRIC' ? 'kg' : 'lbs'}`;
    }

    if (userUnitSystem === 'METRIC') {
      return `${convertLbsToKg(weight)} kg`;
    }

    return `${convertKgToLbs(weight)} lbs`;
  };
  return (
    <div className={styles.wrapper}>
      <DivePageMobContainer>
        <DivePageTitle title="Specific Gear Used" />
        <ul>
          {gears?.length && gears.map((gear) => (
            <li key={gear.id}>
              {gear?.typeOfGear}
              {' '}
              <span>
                {gear?.manufacturer}
                {' '}
                {gear?.model}
              </span>
            </li>
          ))}
          {weight && (
          <li>
            Weights:
            {' '}
            <span>
              {convertWeights()}
            </span>
          </li>
          )}
        </ul>
      </DivePageMobContainer>
    </div>
  );
};
