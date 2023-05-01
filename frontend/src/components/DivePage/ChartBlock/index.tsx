import React, { FC } from 'react';

import { DepthChart } from '../../DepthChart/depthChart';
import { DivePageMobContainer } from '../DivePageMobContainer';
import { DivePageTitle } from '../DivePageTitle';

import styles from './styles.module.scss';
import { SafetySpot } from '../../PageBlocks/LogADiveBlocks/types/commonTypes';
import { SecondStepType, Tank } from '../../PageBlocks/LogADiveBlocks/types/stepTypes';

type Props = {
  diveData: {
    points: SafetySpot[];
    tanks: SecondStepType['tanks'],
    characteristics?: {
      typeFillingBalon: string;
      ballon: string;
      sac: number;
      rmv: number;
    };
  };
  maxDepth: number;
  duration: number;
  profileData: Array<{ seconds: number, depth: number }>
};

export const ChartBlock: FC<Props> = ({
  diveData: {
    points,
    tanks,
    // characteristics,
  },
  duration,
  profileData, maxDepth,
}): JSX.Element => {
  const calculateAverageDepth = () => {
    if (!points?.length) {
      return 0;
    }
    const sumAllDepth = points.reduce((acc, itm) => acc + itm.depth, 0);
    return (sumAllDepth / points.length).toFixed(2);
  };

  const convertTankName = (tank: Tank) => {
    const material = tank?.material ? tank.material.charAt(0).toUpperCase() + tank.material.slice(1) : '';
    return `${tank?.volume || ''} ${tank?.volumeUnit || ''} ${material} ${tank?.pressureStart || ''} -> ${tank?.pressureEnd || ''} ${tank?.pressureMeasures || ''}`;
  };

  return (
    <div className={styles.chartWrapper}>
      <DivePageMobContainer>
        <DivePageTitle title="Dive Profile" />
      </DivePageMobContainer>
      <div className={styles.depthChartMargin} id="no_border_radius">
        <DepthChart
          points={points}
          maxDepth={maxDepth}
          duration={duration}
          profileData={profileData}
        />
      </div>
      {!!tanks?.length && (
      <DivePageMobContainer>
        <div className={styles.chartInfo}>
          {tanks.map((tank) => (
            <div key={tank.id}>
              <div className={styles.typeFillingBalon}>{tank.mixture}</div>
              <div className={styles.characteristics}>
                <ul>
                  <li>
                    {convertTankName(tank)}
                  </li>
                  <li>
                    Average depth:
                    {' '}
                    <span>
                      {calculateAverageDepth()}
                      {' '}
                      m
                    </span>
                  </li>
                  {/* <li> */}
                  {/*  SAC: */}
                  {/*  {' '} */}
                  {/*  <span> */}
                  {/*    sac */}
                  {/*    {' '} */}
                  {/*    bar/min */}
                  {/*  </span> */}
                  {/* </li> */}
                  {/* <li> */}
                  {/*  RMV: */}
                  {/*  {' '} */}
                  {/*  <span> */}
                  {/*    rmv */}
                  {/*    {' '} */}
                  {/*    L/min */}
                  {/*  </span> */}
                  {/* </li> */}
                </ul>
                {' '}
              </div>
            </div>
          ))}

        </div>
      </DivePageMobContainer>
      )}
    </div>
  );
};
