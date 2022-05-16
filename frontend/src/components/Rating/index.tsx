import React, { FC } from 'react';
import styles from './styles.module.scss';
import { Icon } from '../Icons/Icon';

type Props = {
  rating: number;
  mobile?: boolean;
};
export const Rating: FC<Props> = ({ rating, mobile }) => (

  <div className={styles.rating} style={{ width: !mobile ? '115px' : '100px' }}>
    <Icon
      iconName={rating >= 1 ? 'star filled in' : 'star outline'}
      size={!mobile ? 20 : 17}
    />
    <Icon
      iconName={rating >= 2 ? 'star filled in' : 'star outline'}
      size={!mobile ? 20 : 17}
    />
    <Icon
      iconName={rating >= 3 ? 'star filled in' : 'star outline'}
      size={!mobile ? 20 : 17}
    />
    <Icon
      iconName={rating >= 4 ? 'star filled in' : 'star outline'}
      size={!mobile ? 20 : 17}
    />
    <Icon
      iconName={rating >= 5 ? 'star filled in' : 'star outline'}
      size={!mobile ? 20 : 17}
    />
  </div>

);
