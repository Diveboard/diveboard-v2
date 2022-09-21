import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import pageRoutes from '../src/routes/pagesRoutes.json';
import { firebaseAdmin } from '../src/firebase/firebaseAdmin';
import { AuthLayout } from '../src/layouts/AuthLayout';
import ExploreBlock from '../src/components/PageBlocks/ExploreBlock';
import { useWindowWidth } from '../src/hooks/useWindowWidth';
import { UserHeader } from '../src/components/Header/DesktopHeader';
import { Footer } from '../src/components/Footer/DesktopFooter';
import { MobileNavBar } from '../src/components/MobileNavBar';

const Explore: InferGetServerSidePropsType<typeof getServerSideProps> = ({ user }) => {
  const isMobile = useWindowWidth(500, 769);
  return (
    <AuthLayout user={user}>
      {!isMobile && <UserHeader />}
      <ExploreBlock isMobile={isMobile} />
      {!isMobile ? <Footer /> : <MobileNavBar loggedIn={!!user} />}
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const uid = context.req.cookies.__session;

  if (!uid) {
    return {
      redirect: {
        destination: pageRoutes.authPageRout,
        permanent: false,
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
