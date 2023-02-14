import React, { FC } from 'react';
import { Icon } from '../Icons/Icon';
import styles
  from './styles.module.scss';

type Props = {
  loading: boolean;
  iconName?: string
};
export const Loader: FC<Props> = ({ loading, iconName = 'loader' }) => (
  <span>
    {loading
      && (
        <span className={styles.loader}>
          <Icon iconName={iconName} size={21} />
        </span>
      )}
  </span>
);
