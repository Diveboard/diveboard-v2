import React, { FC, useContext } from 'react';

import { DivePageMobContainer } from '../DivePageMobContainer';
import { DivePageTitle } from '../DivePageTitle';

import styles from './styles.module.scss';
import { SeventhStepType } from '../../PageBlocks/LogADiveBlocks/types/stepTypes';
import { UnitSystem } from '../../../firebase/firestore/models';
import { convertWeight } from '../../../utils/unitSystemConverter';
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

  return (
    <div className={styles.wrapper}>
      <DivePageMobContainer>
        <DivePageTitle title="Specific Gear Used" />
        <ul>
          {!!gears?.length && gears.map((gear) => (
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
          {!!weight && (
          <li>
            Weights:
            {' '}
            <span>
              {convertWeight(userAuth, diveUnitSystem, weight)}
            </span>
          </li>
          )}
        </ul>
      </DivePageMobContainer>
    </div>
  );
};
