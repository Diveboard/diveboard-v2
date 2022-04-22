import React, { FC } from 'react';
import styles from '../styles.module.scss';

type Props = {
  mode:'login/signup' | 'signup' | 'login' | 'community'
};

export const Title:FC<Props> = ({ mode }) => {
  const setTitle = () => {
    if (mode === 'login/signup') { return 'Login /Signup'; }
    if (mode === 'signup') { return 'Signup'; }
    if (mode === 'login') { return 'Login'; }
    return 'Join our Community on Discord';
  };
  return (
    <h1 className={styles.title}>{setTitle()}</h1>
  );
};
