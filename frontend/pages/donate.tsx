import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { MainDonateBlock } from '../src/components/PageBlocks/DonateBlocks/MainDonateBlock';
import { DonateFormBlock } from '../src/components/PageBlocks/DonateBlocks/DonateFormBlock';
import { SuccessBlock } from '../src/components/PageBlocks/DonateBlocks/SuccessBlock';
import { ContentModeType, PlanType } from '../src/components/PageBlocks/DonateBlocks/donateTypes';
import pageRoutes from '../src/routes/pagesRoutes.json';

const Donate = () => {
  const [planMode, setPlanMode] = useState<PlanType>();
  const [contentMode, setContentMode] = useState<ContentModeType>('main');

  return (
    <>
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
    </>
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
  return { props: {} };
};

export default Donate;
