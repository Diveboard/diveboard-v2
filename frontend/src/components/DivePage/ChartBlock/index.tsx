import React, { FC } from 'react';

import { DepthChart } from '../../DepthChart/depthChart';
import { DivePageMobContainer } from '../DivePageMobContainer';
import { DivePageTitle } from '../DivePageTitle';

import styles from './styles.module.scss';

type Props = {
  diveData: {
    points: {
      depth: number;
      diveTime: number;
      temperature: number;
    }[];
    characteristics: {
      typeFillingBalon: string;
      ballon: string;
      sac: number;
      rmv: number;
    };
  };
};

export const ChartBlock: FC<Props> = ({
  diveData: {
    points,
    characteristics: {
      typeFillingBalon, ballon, sac, rmv,
    },
  },
}): JSX.Element => {
  // calculate avarage depth
  const avarageDepth = () => {
    let summAllDepth = 0;
    points.forEach((itm) => {
      summAllDepth += itm.depth;
    });
    return summAllDepth / points.length;
  };

  return (
    <div className={styles.chartWrapper}>
      <DivePageMobContainer>
        <DivePageTitle title="Dive Profile" />
      </DivePageMobContainer>
      <div className={styles.depthChartMargin} id="no_border_radius">
        <DepthChart points={points} />
      </div>
      <DivePageMobContainer>
        <div className={styles.chartInfo}>
          <div className={styles.typeFillingBalon}>{typeFillingBalon}</div>
          <div className={styles.characteristics}>
            <ul>
              <li>{ballon}</li>
              <li>
                Avarage depth:
                {' '}
                <span>
                  {avarageDepth()}
                  {' '}
                  m
                </span>
              </li>
              <li>
                SAC:
                {' '}
                <span>
                  {sac}
                  {' '}
                  bar/min
                </span>
              </li>
              <li>
                RMV:
                {' '}
                <span>
                  {rmv}
                  {' '}
                  L/min
                </span>
              </li>
            </ul>
            {' '}
          </div>
        </div>
      </DivePageMobContainer>
    </div>
  );
};
