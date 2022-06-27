import React, { FC } from 'react';
import { SecondStepType } from '../../../types/stepTypes';
import styles from './styles.module.scss';
import { getTankActions } from '../../../LogDiveHelpers/getTankActions';
import { incrementId } from '../../../LogDiveHelpers/incrementId';
import { Tank } from './Tank';

type Props = {
  setTanks: React.Dispatch<React.SetStateAction<SecondStepType['tanks']>>,
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
      pressureStart: undefined,
      pressureEnd: undefined,
      pressureMeasures: undefined,
    }]);
  };

  const tanksComponents = tanks.map(({
    id,
    cylinder,
    volume,
    size,
    material,
    mixture,
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
        mixture={mixture}
        pressureStart={pressureStart}
        pressureEnd={pressureEnd}
        pressureMeasures={pressureMeasures}
        setTankParameters={parameters.setTankParameters}
      />
    );
  });

  return (
    <div>
      <h2>Tanks & gas mix</h2>
      {tanksComponents}
      <span className={styles.addStyle} onClick={add}>Add Tank</span>
    </div>
  );
};
