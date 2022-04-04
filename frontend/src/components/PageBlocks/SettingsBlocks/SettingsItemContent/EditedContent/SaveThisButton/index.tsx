import React, { FC } from 'react';
import { Button } from '../../../../../Buttons/Button';
import styles from './styles.module.scss';

type Props = {
  onClick: ()=>void;
  disabled: boolean;
};
export const SaveThisButton:FC<Props> = ({ disabled, onClick }) => (
  <Button
    width={196}
    height={48}
    backgroundColor="#FDC90D"
    border="none"
    borderRadius={30}
    onClick={onClick}
    disable={disabled}
  >
    <span className={styles.text}>Save This</span>
  </Button>
);
