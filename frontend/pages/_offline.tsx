import React from 'react';
import { AuthLayout } from '../src/layouts/AuthLayout';
import { MainLayout } from '../src/layouts/MainLayout';
import { Icon } from '../src/components/Icons/Icon';

const Offline = () => (
  <AuthLayout user={null}>
    <MainLayout>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '70vh',
      }}
      >
        <div>
          <Icon iconName="diveboard-logo" size={100} />
          <h1 style={{
            textAlign: 'center',
            color: '#000345',
          }}
          >
            You are offline!!!
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
    </MainLayout>
  </AuthLayout>
);

export default Offline;
