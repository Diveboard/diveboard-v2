import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { firebaseAdmin } from '../src/firebase/firebaseAdmin';
import { AuthLayout } from '../src/layouts/AuthLayout';
import ExploreBlock from '../src/components/PageBlocks/ExploreBlock';
import { useWindowWidth } from '../src/hooks/useWindowWidth';
import { MainLayout } from '../src/layouts/MainLayout';

const Explore: InferGetServerSidePropsType<typeof getServerSideProps> = ({ user }) => {
  const isMobile = useWindowWidth(500, 769);
  return (
    <AuthLayout user={user}>
      <MainLayout isHideMobileHeader>
        <ExploreBlock isMobile={isMobile} />
      </MainLayout>
    </AuthLayout>
  );
};

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
};

export default Explore;
