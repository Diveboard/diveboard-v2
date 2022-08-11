import React, { FC, useContext, useState } from 'react';

import { ButtonGroup } from '../../../../ButtonGroup';
import { Button } from '../../../../Buttons/Button';
import { DisabledNext } from '../../StepsNavigation/DisabledNext';
import { MarginWrapper } from '../../../../MarginWrapper';
import { useWindowWidth } from '../../../../../hooks/useWindowWidth';
import { LogDiveDataContext } from '../../LogDiveData/logDiveContext';
import { StepProps } from '../../types/commonTypes';
import { NinthStepType } from '../../types/stepTypes';
import containerStyle from '../../styles.module.scss';
import styles from './styles.module.scss';

export const NinthStep: FC<StepProps> = ({
  step,
  setStep,
}) => {
  const { setStepData } = useContext(LogDiveDataContext);
  const isMobile = useWindowWidth(500, 768);
  const [publishingMode, setPublishingMode] = useState('public');
  const publishingModes = [{
    text: 'Public',
    connectedMode: 'public',
  }, {
    text: 'Private',
    connectedMode: 'private',
  }, {
    text: 'Friends Only',
    connectedMode: 'friends only',
  }];

  const ninthStepData: NinthStepType = {
    publishingMode: publishingMode as NinthStepType['publishingMode'],
  };

  if (step !== 9) {
    return null;
  }

  return (
    <>
      <div className={containerStyle.container}>
        <div className={styles.ninthStep}>
          <h2>
            Save and done!
          </h2>
          <MarginWrapper top={10}>
            <span className={styles.privacy}>
              Privacy
            </span>
          </MarginWrapper>

          <MarginWrapper top={30} bottom={20} display="block">
            <ButtonGroup
              buttons={
                publishingModes
              }
              onClick={setPublishingMode}
              contentBehavior="wrap"
              defaultChecked="public"
            />
          </MarginWrapper>

          <Button
            width={isMobile ? 768 : 124}
            height={isMobile ? 46 : 56}
            borderRadius={30}
            border="none"
            backgroundColor="#0059DE"
            onClick={
              () => { setStepData(9, ninthStepData); }
            }
          >
            <span className={styles.btnText}>
              Publish
            </span>
          </Button>
        </div>

      </div>

      <DisabledNext setStep={setStep} />
    </>
  );
};
