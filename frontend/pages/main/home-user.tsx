import React, { useEffect } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { MainLayout } from '../../src/layouts/MainLayout';
import { AuthLayout } from '../../src/layouts/AuthLayout';
import { firebaseAdmin } from '../../src/firebase/firebaseAdmin';
import {
  firestoreCommentsService,
} from '../../src/firebase/firestore/firestoreServices/sirestoreCommentsService';

const HomeUser: InferGetServerSidePropsType<typeof getServerSideProps> = ({ user }) => {
  console.log({ user });
  useEffect(() => {
    firestoreCommentsService.getComments('user_id_1', 'dive_id_1').then((data) => {
      console.log({ data });
    });
  }, []);
  return (
    <AuthLayout user={user}>
      <MainLayout>
        <div style={{
          height: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        >
          USER
        </div>
      </MainLayout>
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const uid = context.req.cookies.__session;

    if (!uid) {
      throw new Error('no user uid');
    }

    const {
      email, photoURL = '', displayName = '',
    } = await firebaseAdmin.auth().getUser(uid);

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
  } catch (e) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }
};

export default HomeUser;
