import React, { FC, useEffect, useState } from 'react';
import { InitialDANFormState } from './initialDANFormState';
import { Before } from './Specific/Before';
import { BlockWrapper } from './formWrappers/BlockWrapper';
import { During } from './Specific/During';
import { After } from './Specific/After';
import { Identification } from './General/Identification';
import { Contacts } from './General/Contact';
import { Experience } from './General/Experience';
import { MedicalConditions } from './General/Medical';
import { getRequiredFields } from './helpers/getRequiredFields';
import { getProgress } from './helpers/getProgress';
import { Button } from '../../../../../../../Buttons/Button';
import { useFormSubmit } from './helpers/useFormSubmit';
import { Loader } from '../../../../../../../Loader';
import { DanSurveyType } from '../../../../../../../../types';
import { EighthStepType } from '../../../../../types/stepTypes';
import styles from './styles.module.scss';

type Props = {
  setProgress: React.Dispatch<React.SetStateAction<number>>
  setSurvey: React.Dispatch<React.SetStateAction<EighthStepType>>;
  setSurveyMode: React.Dispatch<React.SetStateAction<string>>;
};

export const DanForm: FC<Props> = ({ setProgress, setSurvey, setSurveyMode }) => {
  const [formData, setFormData] = useState<DanSurveyType>(InitialDANFormState);
  const {
    errors,
    onSaveDataHandler, loading,
  } = useFormSubmit(formData);
  const {
    divePlan,
    environment,
    thermal,
    load,
    decompression,
    problems,
    platform,
    height,
    birth,
    equipment,
    sex,
    familyName,
    givenName,
    phoneHome,
    weight,
    exposeToAltitude,
    feelSymptoms,
  } = errors;

  useEffect(() => {
    const requiredData = getRequiredFields(formData);
    const progress = getProgress(requiredData);
    setProgress(progress);
  }, [formData]);

  return (
    <div>
      <BlockWrapper title="Specific information on the dive">
        <Before before={formData.beforeDive} setFormData={setFormData} error={divePlan} />
        <During
          during={formData.duringDive}
          setFormData={setFormData}
          errors={{
            environment, thermal, load, decompression, problems, platform, equipment,
          }}
        />
        <After
          after={formData.afterDive}
          setFormData={setFormData}
          errors={{ feelSymptoms, exposeToAltitude }}
        />
      </BlockWrapper>

      <BlockWrapper
        title="General information on the diver"
        notes="Note: you should have to fill in this part of the form only once. Once you have done it once, this part will be automatically pre-filled with your answers."
      >
        <div className={styles.blockWrapper}>
          <div className={styles.blockItem}>
            <Identification
              identification={formData.identification}
              setFormData={setFormData}
              errors={{
                familyName, givenName, sex, birth,
              }}
            />
          </div>
          <div className={styles.blockItem}>
            <Contacts contacts={formData.contactInfo} setFormData={setFormData} error={phoneHome} />
          </div>
          <div className={styles.blockItem}>
            <Experience experience={formData.divingExperience} setFormData={setFormData} />
          </div>
          <div className={styles.blockItem}>
            <MedicalConditions
              medical={formData.medicalCondition}
              setFormData={setFormData}
              errors={{ weight, height }}
            />
          </div>
        </div>
      </BlockWrapper>

      <Button
        width={148}
        height={56}
        borderRadius={30}
        backgroundColor="#0059DE"
        border="none"
        onClick={async () => { await onSaveDataHandler(setSurvey, setSurveyMode); }}
        disable={loading}
      >
        <span style={
          {
            color: 'white',
            fontWeight: '600',
            fontSize: '18px',
            display: 'flex',
          }
        }
        >
          <Loader loading={loading} />
          {!loading && 'Save Data'}
        </span>
      </Button>

    </div>
  );
};
