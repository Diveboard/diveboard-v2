import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ToastContainer } from 'react-toastify';
import { MainLayout } from '../../src/layouts/MainLayout';
import { AuthLayout } from '../../src/layouts/AuthLayout';
import { LogDiveBlock } from '../../src/components/PageBlocks/LogADiveBlocks';
import { LogDiveProvider } from '../../src/components/PageBlocks/LogADiveBlocks/LogDiveData/LogDiveProvider';
import pageRoutes from '../../src/routes/pagesRoutes.json';
import { firestoreDivesService } from '../../src/firebase/firestore/firestoreServices/firestoreDivesService';
import {
  firestorePublicProfileService,
} from '../../src/firebase/firestore/firestoreServices/firestorePublicProfileService';
import 'react-toastify/dist/ReactToastify.css';
import { firestoreGalleryService } from '../../src/firebase/firestore/firestoreServices/firestoreGalleryService';

const Dive: InferGetServerSidePropsType<typeof getServerSideProps> = ({
  user,
  dive,
  diveId,
  mediaUrls,
}) => (
  <AuthLayout user={user}>
    <MainLayout>
      <LogDiveProvider>
        <ToastContainer />
        <LogDiveBlock diveId={diveId} dive={dive} userId={user.uid} mediaUrls={mediaUrls} />
      </LogDiveProvider>
    </MainLayout>
  </AuthLayout>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const uid = context.req.cookies.__session;
    const diveId = context.query?.id;

    if (!uid) {
      return {
        redirect: {
          destination: pageRoutes.authPageRout,
          permanent: false,
        },
      };
    }

    // const {
    //   email,
    //   photoURL = '',
    //   displayName = '',
    // } = await firebaseAdmin.auth().getUser(uid);

    if (!diveId) {
      throw new Error('no dive');
    }

    const user = await firestorePublicProfileService.getUserById(uid);

    const dive = await firestoreDivesService.getDiveData(uid, diveId as string, true);
    let mediaUrls;
    if (dive?.pictures) {
      mediaUrls = await firestoreGalleryService.getMediaUrls(dive.pictures);
    }
    if (!dive) {
      throw new Error('no dive');
    }
    return {
      props: {
        user,
        diveId,
        dive: JSON.parse(JSON.stringify(dive)),
        mediaUrls: JSON.parse(JSON.stringify(mediaUrls)),
      },
    };
  } catch (e) {
    return {
      redirect: {
        destination: '/_error',
        permanent: false,
      },
    };
  }
};
export default Dive;
