import React from 'react';
import { Icon } from '../../../Icons/Icon';
import { Loader } from '../../../Loader';

export const WaitingCache = () => (
  <div style={{
    height: '80Vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  }}
  >
    <Icon iconName="diveboard-logo" size={100} />
    <h1 style={{
      textAlign: 'center',
      color: '#000345',
    }}
    >
      Wait for caching data...
    </h1>
    <Loader loading />
  </div>
);
