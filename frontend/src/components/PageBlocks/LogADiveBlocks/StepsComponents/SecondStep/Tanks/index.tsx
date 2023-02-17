import React, { FC } from 'react';
import { getTankActions } from '../../../LogDiveHelpers/getTankActions';
import { incrementId } from '../../../LogDiveHelpers/incrementId';
import { Tank } from './Tank';
import { SecondStepType } from '../../../types/stepTypes';
import styles from './styles.module.scss';

type Props = {
  setTanks: (res: SecondStepType['tanks']) => void;
  tanks: SecondStepType['tanks'],
};

export const Tanks:FC<Props> = ({ tanks, setTanks }) => {
  const actions = getTankActions(tanks, setTanks);

  const add = () => {
    setTanks([...tanks, {
      id: incrementId(tanks),
      cylinder: 1,
      volume: 80.1,
      volumeUnit: 'cuft',
      material: 'aluminum',
      mixture: 'air',
      pressureStart: 3000,
      pressureEnd: 5000,
      pressureMeasures: 'psi',
      o2: 21,
      he: 0,
    }]);
  };
  console.log(tanks)
  const tanksComponents = tanks.map(({
    id,
    cylinder,
    volume,
    volumeUnit,
    material,
    mixture,
    o2,
    he,
    pressureStart,
    pressureEnd,
    pressureMeasures,
  }) => {
    const parameters = actions(id);
    return (
      <Tank
        key={id}
        id={id}
        cylinder={cylinder}
        volume={volume}
        volumeUnit={volumeUnit}
        material={material}
        o2={o2}
        he={he}
        mixture={mixture}
        pressureStart={pressureStart}
        pressureEnd={pressureEnd}
        pressureMeasures={pressureMeasures}
        setTankParameters={parameters.setTankParameters}
      />
    );
  });

  return (
    <div className={styles.tanksWrapper}>
      <h2>Tanks & gas mix</h2>
      {tanksComponents}
      <span className={styles.addStyle} onClick={add}>Add Tank</span>
    </div>
  );
};
