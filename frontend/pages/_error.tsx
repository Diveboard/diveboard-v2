import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { AuthLayout } from '../src/layouts/AuthLayout';
import { MainLayout } from '../src/layouts/MainLayout';
import { Icon } from '../src/components/Icons/Icon';
import { firebaseAdmin } from '../src/firebase/firebaseAdmin';

const Error: InferGetServerSidePropsType<typeof getServerSideProps> = ({ user }) => (
  <AuthLayout user={user}>
    <MainLayout>
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

export default Error;
