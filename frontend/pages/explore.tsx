import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { AuthLayout } from '../src/layouts/AuthLayout';
import ExploreBlock from '../src/components/PageBlocks/ExploreBlock';
import { useWindowWidth } from '../src/hooks/useWindowWidth';
import { MainLayout } from '../src/layouts/MainLayout';
import { firestorePublicProfileService } from '../src/firebase/firestore/firestoreServices/firestorePublicProfileService';
import 'react-toastify/dist/ReactToastify.css';

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

  const user = await firestorePublicProfileService.getUserById(uid);

  return {
    props: {
      user,
    },
  };
};

export default Explore;
