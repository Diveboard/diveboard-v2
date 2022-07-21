import React, { FC } from 'react';

import { DivePageMobContainer } from '../DivePageMobContainer';
import { DivePageTitle } from '../DivePageTitle';

import styles from './styles.module.scss';

type Props = {
  gearUsed: {
    bcd: string;
    computer: string;
    fins: string;
    regulator: string;
    wetSult: string;
    weights: number;
  };
};

export const GearUsed: FC<Props> = ({
  gearUsed: {
    bcd, computer, fins, regulator, wetSult, weights,
  },
}): JSX.Element => (
  <div className={styles.wrapper}>
    <DivePageMobContainer>
      <DivePageTitle title="Specific Gear Used" />
      <ul>
        <li>
          BCD:
          {' '}
          <span>{bcd}</span>
        </li>
        <li>
          Computer:
          {' '}
          <span>{computer}</span>
        </li>
        <li>
          Fins:
          {' '}
          <span>{fins}</span>
        </li>
        <li>
          Regulator:
          {' '}
          <span>{regulator}</span>
        </li>
        <li>
          Wet Suit:
          {' '}
          <span>{wetSult}</span>
        </li>
        <li>
          Weights:
          {' '}
          <span>
            {weights}
            {' '}
            kg
          </span>
        </li>
      </ul>
    </DivePageMobContainer>
  </div>
);
