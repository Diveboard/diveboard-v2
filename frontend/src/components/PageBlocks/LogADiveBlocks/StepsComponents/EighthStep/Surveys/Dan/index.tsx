import React, {
  FC, useContext, useEffect, useRef, useState,
} from 'react';
import Image from 'next/image';
import { doc, DocumentReference } from '@firebase/firestore';
import styles from './styles.module.scss';
import { DanCard } from './DanCard';
import { StepType } from '../../../../types/commonTypes';
import { DanForm } from './DanForm';
import { useIsInViewport } from '../../../../../../../hooks/useInViewport';
import { Progress } from './Progress';
import { SurveyDanType } from '../../../../../../../types';
import { LogDiveDataContext } from '../../../../LogDiveData/logDiveContext';
import { EighthStepType } from '../../../../types/stepTypes';
import { firestoreSurveyService } from '../../../../../../../firebase/firestore/firestoreServices/firestoreSurveyService';
import { AuthStatusContext } from '../../../../../../../layouts/AuthLayout';
import { notify } from '../../../../../../../utils/notify';
import { db } from '../../../../../../../firebase/firestore/firebaseFirestore';

type Props = {
  setSurvey: React.Dispatch<React.SetStateAction<SurveyDanType>>;
  setStep: React.Dispatch<React.SetStateAction<StepType>>
  surveyRef?: DocumentReference;
  sendToDAN: boolean;
  setSendTODAN: (val: boolean) => void;
  survey: SurveyDanType;
  setSaveDAN: (val: boolean) => void;
  setSurveyMode: (val: string) => void;
};

export const DanSurvey: FC<Props> = ({
  survey, setSurvey, setStep, surveyRef, sendToDAN, setSendTODAN, setSaveDAN,
  setSurveyMode,
}) => {
  const [progress, setProgress] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useIsInViewport(cardRef);
  const [isLoading, setLoading] = useState<boolean>(false);
  const { userAuth } = useContext(AuthStatusContext);

  const { getStepData } = useContext(LogDiveDataContext);

  useEffect(() => {
    (async () => {
      try {
        const data = getStepData(8) as EighthStepType;
        if (surveyRef && !data.danSurvey) {
          setLoading(true);
          // @ts-ignore
          const segments = surveyRef?._key?.path?.segments;
          const ref = doc(db, `${segments.slice(segments.length - 4).join('/')}`);
          const danSurvey = await firestoreSurveyService.getSurveyById(userAuth.uid, ref);
          // const danSurveys = await firestoreSurveyService.getUserSurveys(userAuth.uid);
          if (danSurvey) {
            setSurvey(danSurvey as SurveyDanType);
          }
          setLoading(false);
        }
      } catch (e) {
        setLoading(false);
        notify(e.message);
      }
    })();
  }, []);

  return (
    <div className={styles.survey}>
      {!inView && (
      <div className={styles.progressBlock}>
        <Progress progress={progress} />
      </div>
      )}
      <div ref={cardRef}>
        <div className={styles.header}>
          <Image src="/images/survey-big.jpg" width={269} height={198} />
          <div className={styles.title}>
            <span className={styles.general}>General</span>
            <h1>Dan - Diver’s Alert Network</h1>
            <span className={styles.contributors}>
              Contributors:
              {' '}
              <span className={styles.count}>{12345}</span>
            </span>
          </div>
        </div>

        <div className={styles.descriptionWrapper}>
          <div className={styles.description}>
            <p>
              The
              <a
                href="https://dan.org/research/projects/pde/index.asp"
              >
                {' '}
                Project Dive Exploration
                {' '}
              </a>
              is an observational research study designed to
              {' '}
              <span className={styles.bold}>collect dive profile data</span>
              {' '}
              on recreational
              dives and to compile information on the behavioral and health aspects of divers.
              Using Dive profiles recorded by dive computers,
              the study analyzes data for the
              {' '}
              <span className={styles.bold}>risk of decompression illness.</span>
            </p>
            <p>
              <span className={styles.bold}>You can find more about the project on</span>
              <a
                href="https://dan.org/research/projects/pde/index.asp"
              >
                {' '}
                DAN's website
              </a>
              .
            </p>
            <p>
              Dive profile data are of limited value without information about
              {' '}
              <span className={styles.bold}>
                the diver and the
                medical outcome
              </span>
              {' '}
              of the dives.
              The form below helps DAN to capture this information.
            </p>
            <p>
              This information remains
              {' '}
              <span className={styles.bold}>private</span>
              {' '}
              on Diveboard and is only disclosed to
              DAN for the purpose of this study.
            </p>
          </div>
          <div className={styles.surveyLogo}>
            <Image src="/images/DAN.jpg" width={257} height={79} />
          </div>
        </div>

        <DanCard
          progress={progress}
          setStep={setStep}
          isSentToDAN={survey?.sent || false}
          sendToDAN={sendToDAN}
          setSendTODAN={setSendTODAN}
          survey={survey}
          setSurvey={setSurvey}
        />
      </div>

      <DanForm
        setProgress={setProgress}
        setSurvey={setSurvey}
        survey={survey}
        setSaveDAN={setSaveDAN}
        isLoading={isLoading}
        setSurveyMode={setSurveyMode}
      />

    </div>
  );
};
