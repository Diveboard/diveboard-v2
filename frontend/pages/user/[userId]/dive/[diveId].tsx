import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { MainLayout } from '../../../../src/layouts/MainLayout';
import { AuthLayout } from '../../../../src/layouts/AuthLayout';
import { firebaseAdmin } from '../../../../src/firebase/firebaseAdmin';
import { DivePageBlock } from '../../../../src/components/DivePage/divePageBlock';

const DiveManager: InferGetServerSidePropsType<typeof getServerSideProps> = ({
  user,
}) => {
  const router = useRouter();
  const { userId, diveId } = router.query;
  return (
    <AuthLayout user={user}>
      <MainLayout>
        <DivePageBlock diveUserId={userId as string} diveId={diveId as string} />
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
    email,
    photoURL = '',
    displayName = '',
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

export default DiveManager;
