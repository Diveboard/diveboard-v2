import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { AuthLayout } from '../src/layouts/AuthLayout';
import { MainLayout } from '../src/layouts/MainLayout';
import { Icon } from '../src/components/Icons/Icon';
import { firebaseAdmin } from '../src/firebase/firebaseAdmin';

const Offline: InferGetServerSidePropsType<typeof getServerSideProps> = ({ user }) => (
  <AuthLayout user={user}>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const uid = context.req.cookies.__session;

  if (!uid) {
    return {
      props: {
        user: null,
      },
    };
  }

  const {
    email,
    photoURL = '',
    displayName = '',
  } = await firebaseAdmin.auth()
    .getUser(uid);

  return {
    props: {
      user: {
        uid,
        email,
        photoURL,
        name: displayName,
      },
    },
  };
};

export default Offline;
