import React, { useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { MainDonateBlock } from '../src/components/PageBlocks/DonateBlocks/MainDonateBlock';
import { MainLayout } from '../src/layouts/MainLayout';
import { AuthLayout } from '../src/layouts/AuthLayout';
import { firebaseAdmin } from '../src/firebase/firebaseAdmin';
import { DonateFormBlock } from '../src/components/PageBlocks/DonateBlocks/DonateFormBlock';
import { SuccessBlock } from '../src/components/PageBlocks/DonateBlocks/SuccessBlock';
import { ContentModeType, PlanType } from '../src/components/PageBlocks/DonateBlocks/donateTypes';

const Donate: InferGetServerSidePropsType<typeof getServerSideProps> = ({ user }) => {
  const [planMode, setPlanMode] = useState<PlanType>();
  const [contentMode, setContentMode] = useState<ContentModeType>('main');

  return (
    <AuthLayout user={user}>
      <MainLayout>
        {contentMode === 'main' && (
        <MainDonateBlock
          setContentMode={setContentMode}
          setPlanMode={setPlanMode}
        />
        )}
        {contentMode === 'plan' && (
        <DonateFormBlock
          planMode={planMode}
          setPlanMode={setPlanMode}
          setContentMode={setContentMode}
          contentMode={contentMode}
        />
        )}
        {contentMode === 'success' && <SuccessBlock />}
      </MainLayout>
    </AuthLayout>
  );
};

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

export default Donate;
