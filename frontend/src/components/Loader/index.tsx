import React, { FC } from 'react';
import { Icon } from '../Icons/Icon';
import styles
  from './styles.module.scss';

type Props = {
  loading: boolean
};
export const Loader: FC<Props> = ({ loading }) => (
  <span>
    {loading
      && (
        <span className={styles.loader}>
          <Icon iconName="loader" size={21} />
        </span>
      )}
  </span>
);
