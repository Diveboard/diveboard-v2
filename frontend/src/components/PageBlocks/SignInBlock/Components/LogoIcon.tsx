import React, { FC } from 'react';
import { Icon } from '../../../Icons/Icon';

type Props = {
  mode:'login/signup' | 'signup' | 'login' | 'community'
};

export const LogoIcon:FC<Props> = ({ mode }) => {
  const getIconName = () => {
    if (mode === 'login/signup' || mode === 'login') {
      return 'login';
    } if (mode === 'signup') {
      return 'signup';
    } if (mode === 'community') {
      return 'community';
    }
  };
  return (
    <Icon iconName={getIconName()} size={70} />
  );
};
