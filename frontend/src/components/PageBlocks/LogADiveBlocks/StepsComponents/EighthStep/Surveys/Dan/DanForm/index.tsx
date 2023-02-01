import React, {
  FC, useEffect,
} from 'react';
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
import { useFormSubmit } from './helpers/useFormSubmit';
import { Loader } from '../../../../../../../Loader';
import { SurveyDanType } from '../../../../../../../../types';
import styles from './styles.module.scss';
import { Button } from '../../../../../../../Buttons/Button';

type Props = {
  setProgress: React.Dispatch<React.SetStateAction<number>>
  setSurvey: React.Dispatch<React.SetStateAction<SurveyDanType>>;
  survey: SurveyDanType;
  isLoading?: boolean;
  setSaveDAN: (val: boolean) => void;
  setSurveyMode: (val: string) => void;
};

export const DanForm: FC<Props> = ({
  setProgress, setSurvey, isLoading, survey, setSaveDAN, setSurveyMode,
}) => {
  const {
    errors, onSaveDataHandler,
  } = useFormSubmit(survey);
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
    const requiredData = getRequiredFields(survey);
    const progress = getProgress(requiredData);
    setProgress(progress);
  }, [survey]);

  return (
    <div>
      {!isLoading ? (
        <>
          { survey && (
          <BlockWrapper title="Specific information on the dive">
            <Before formData={survey} setFormData={setSurvey} error={divePlan} />
            <During
              formData={survey}
              setFormData={setSurvey}
              errors={{
                environment, thermal, load, decompression, problems, platform, equipment,
              }}
            />
            <After
              formData={survey}
              setFormData={setSurvey}
              errors={{ feelSymptoms, exposeToAltitude }}
            />
          </BlockWrapper>
          ) }

          { survey && (
          <BlockWrapper
            title="General information on the diver"
            notes="Note: you should have to fill in this part of the form only once. Once you have done it once, this part will be automatically pre-filled with your answers."
          >
            <div className={styles.blockWrapper}>
              <div className={styles.blockItem}>
                <Identification
                  formData={survey}
                  setFormData={setSurvey}
                  errors={{
                    familyName, givenName, sex, birth,
                  }}
                />
              </div>
              <div className={styles.blockItem}>
                <Contacts
                  formData={survey}
                  setFormData={setSurvey}
                  error={phoneHome}
                />
              </div>
              <div className={styles.blockItem}>
                <Experience formData={survey} setFormData={setSurvey} />
              </div>
              <div className={styles.blockItem}>
                <MedicalConditions
                  formData={survey}
                  setFormData={setSurvey}
                  errors={{ weight, height }}
                />
              </div>
            </div>
          </BlockWrapper>
          ) }

          <Button
            width={148}
            height={56}
            borderRadius={30}
            backgroundColor="#0059DE"
            border="none"
            onClick={() => onSaveDataHandler(setSaveDAN, setSurveyMode)}
          >
            <span style={{
              color: 'white',
              fontWeight: '600',
              fontSize: '18px',
              display: 'flex',
            }}
            >
              Save Data
            </span>
          </Button>
        </>
      ) : <Loader loading={isLoading} /> }
    </div>
  );
};
