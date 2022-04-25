import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { firebaseAdmin } from '../src/firebase/firebaseAdmin';
import { AuthLayout } from '../src/layouts/AuthLayout';
import { MainLayout } from '../src/layouts/MainLayout';

const About: InferGetServerSidePropsType<typeof getServerSideProps> = ({ user }) => (
  <AuthLayout user={user}>
    <MainLayout>
      About
    </MainLayout>
  </AuthLayout>

);
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const uid = context.req.cookies.diveBoardUserId;

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
export default About;
