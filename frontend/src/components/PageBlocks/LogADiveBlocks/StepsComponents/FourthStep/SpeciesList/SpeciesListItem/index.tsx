import React, { FC } from 'react';
import { Icon } from '../../../../../../Icons/Icon';
import { Done } from '../../../../../../Icons/IconSVGComponents/Done';

import styles from './styles.module.scss';

type Props = {
  speciesType: string;
  numberSpecies: number;
  icon?: boolean
  onClick: (type: string) => void
};

export const SpeciesListItem: FC<Props> = ({
  speciesType, numberSpecies, icon, onClick,
}) => {
  const speciesTypeHandler = () => {
    onClick(speciesType);
  };

  return (
    <div className={styles.listItem} onClick={speciesTypeHandler}>
      <div className={styles.leftSide}>
        {icon && <Done />}
        {speciesType}
        {' '}
        (
        {numberSpecies}
        )
      </div>
      <Icon iconName="right-black-arrow" width={24} height={24} />
    </div>
  );
};
