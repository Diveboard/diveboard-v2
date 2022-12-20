import React, { FC } from 'react';

import { DivePageMobContainer } from '../DivePageMobContainer';
import { DivePageTitle } from '../DivePageTitle';

import styles from './styles.module.scss';
import { SeventhStepType } from '../../PageBlocks/LogADiveBlocks/types/stepTypes';

type Props = {
  gears: SeventhStepType['gears'],
  weight: number
};

export const GearUsed: FC<Props> = ({
  gears,
  weight,
}): JSX.Element => (
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
            {weight}
            {' '}
            kg
          </span>
        </li>
        )}
      </ul>
    </DivePageMobContainer>
  </div>
);
