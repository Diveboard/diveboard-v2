import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { AuthLayout } from '../src/layouts/AuthLayout';
import { MainLayout } from '../src/layouts/MainLayout';
import { firebaseAdmin } from '../src/firebase/firebaseAdmin';
import pageRoutes from '../src/routes/pagesRoutes.json';
import { Title } from '../src/components/PageBlocks/SignInBlock/Components/Title';
import { LogoIcon } from '../src/components/PageBlocks/SignInBlock/Components/LogoIcon';

const Community: InferGetServerSidePropsType<typeof getServerSideProps> = ({ user }) => (
  <AuthLayout user={user}>
    <MainLayout>
      <div className="community-wrapper">
        <LogoIcon mode="community" />
        <Title mode="community" />
        <p>
          Join our world’s biggest divers community to log your dives and find your next dive spot
        </p>
        <a href="https://discord.gg/rmqJajR7" target="_blank" rel="noreferrer">
          <div className="community-btn">
            Join on Discord
          </div>
        </a>
      </div>
    </MainLayout>
  </AuthLayout>
);

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
export default Community;
