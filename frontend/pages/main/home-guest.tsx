import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import {
  MainBannerBlock,
} from '../../src/components/PageBlocks/HomePageBlocks/Guest/MainBannerBlock';
import { MapBlock } from '../../src/components/PageBlocks/HomePageBlocks/Guest/MapBlock';
import {
  DestinationBlock,
} from '../../src/components/PageBlocks/HomePageBlocks/Guest/DestinationsBlock';
import {
  CollaborationBlock,
} from '../../src/components/PageBlocks/HomePageBlocks/Guest/CollaborationBlock';
import {
  PhotoDivesBlock,
} from '../../src/components/PageBlocks/HomePageBlocks/Guest/PhotoDivesBlock';
import {
  DiveInPocketBlock,
} from '../../src/components/PageBlocks/HomePageBlocks/Guest/DiveInPocketBlock';
import { AuthLayout } from '../../src/layouts/AuthLayout';
import { MainLayout } from '../../src/layouts/MainLayout';
import { firebaseAdmin } from '../../src/firebase/firebaseAdmin';

const HomeGuest:
InferGetServerSidePropsType<typeof getServerSideProps> = ({ user }) => (
  <AuthLayout user={user}>
    <MainLayout>
      <MainBannerBlock />
      <MapBlock />
      <DestinationBlock />
      <CollaborationBlock />
      <PhotoDivesBlock />
      <DiveInPocketBlock />
    </MainLayout>
  </AuthLayout>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const uid = context.req.cookies.diveBoardUserId;
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

export default HomeGuest;
