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
      cylinder: undefined,
      volume: undefined,
      size: undefined,
      material: undefined,
      mixture: undefined,
      pressureStart: 0,
      pressureEnd: undefined,
      pressureMeasures: undefined,
      o2: undefined,
      he: undefined,
    }]);
  };

  const tanksComponents = tanks.map(({
    id,
    cylinder,
    volume,
    size,
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
        size={size}
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
