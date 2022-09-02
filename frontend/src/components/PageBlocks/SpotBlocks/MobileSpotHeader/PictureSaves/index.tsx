import React, { FC } from 'react';
import { Icon } from '../../../../Icons/Icon';
import styles from './styles.module.scss';

type Props = {
  saved: boolean;
  count: number;
};

export const PictureSaves: FC<Props> = ({
  saved,
  count,
}) => (
  <span className={styles.favouritesBlock}>
    <span>{count}</span>
    <span>Saves</span>

    <Icon
      iconName={saved ? 'heart filled in' : 'heart'}
      size={16}
    />
  </span>
);

export default PictureSaves;
