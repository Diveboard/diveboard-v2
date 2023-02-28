import React from 'react';
import { Icon } from '../src/components/Icons/Icon';

const Error = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100vh - 238px)',
  }}
  >
    <div>
      <Icon iconName="diveboard-logo" size={100} />
      <h1 style={{
        textAlign: 'center',
        color: '#000345',
      }}
      >
        This page is not found
      </h1>
    </div>
  </div>
);

export default Error;
