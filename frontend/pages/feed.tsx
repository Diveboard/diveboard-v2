import React from 'react';
import { Icon } from '../src/components/Icons/Icon';

const Feed = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100vh - 238px)',
    margin: '0 40px',
  }}
  >
    <div>
      <Icon iconName="diveboard-logo" size={100} />
      <h1 style={{
        textAlign: 'center',
        color: '#000345',
      }}
      >
        Feed page is coming soon
      </h1>
    </div>
  </div>
);

export default Feed;
