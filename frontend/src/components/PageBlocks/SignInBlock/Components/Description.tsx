import React, { FC } from 'react';
import styles from '../styles.module.scss';

type Props = {
  mode:'login/signup' | 'signup' | 'login' | 'community'
};

export const Description: FC<Props> = ({ mode }) => (

  <p className={styles.text}>
    {(mode === 'login/signup' || mode === 'signup')
      ? 'Here you can log all of you dives. Please, register to track your dives and share your experience with others'
      : 'Join our world’s biggest divers community to log your dives and find your next dive spot'}
  </p>

);
