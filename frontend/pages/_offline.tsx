import React from 'react';
import { Icon } from '../src/components/Icons/Icon';

const Offline = () => (
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
        You are offline!
      </h1>
      <h2 style={{
        textAlign: 'center',
        color: '#FDC90D',
      }}
      >
        please try later
      </h2>
    </div>
  </div>
);

export default Offline;
