import React, { FC } from 'react';
import styles from './styles.module.scss';
import { Icon } from '../../../Icons/Icon';

type Props = {
  isFavorite: boolean;
  count: number;
};

const FavoritesBlock: FC<Props> = ({ isFavorite, count }) => (
  <span className={styles.favouritesBlock}>
    <span>{count}</span>
    <span>Saves</span>

    <Icon
      iconName={isFavorite ? 'heart filled in' : 'heart'}
      size={16}
    />
  </span>
);

export default FavoritesBlock;
