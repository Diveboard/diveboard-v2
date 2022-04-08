import React, { FC } from 'react';
import { Button } from '../../../../../Buttons/Button';
import styles from './styles.module.scss';
import { Icon } from '../../../../../Icons/Icon';

type Props = {
  onClick: ()=>void;
  disabled?: boolean;
  loading?: boolean;
};
export const SaveThisButton:FC<Props> = ({ disabled, loading, onClick }) => (
  <Button
    width={196}
    height={48}
    backgroundColor="#FDC90D"
    border="none"
    borderRadius={30}
    onClick={onClick}
    disable={disabled}
  >
    {loading && (
    <span className={styles.loader}>
      <Icon iconName="loader" size={21} />
    </span>
    )}
    <span className={styles.text}>Save This</span>
  </Button>
);
