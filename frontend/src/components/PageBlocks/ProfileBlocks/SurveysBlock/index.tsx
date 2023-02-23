import React, { FC } from 'react';
import { DocumentReference } from '@firebase/firestore';
import { Title } from '../Title';
import { SurveyCard } from '../../LogADiveBlocks/StepsComponents/EighthStep/SurveyCard';
import style from './styles.module.scss';

type Props = {
  surveys: Array<DocumentReference>;
};

export const SurveysBlock: FC<Props> = ({ surveys }) => (
  <>
    <Title title={`Surveys (${surveys.length})`} />
    <div className={style.blockWrapper}>
      {surveys.map((survey, idx) => (
        <SurveyCard
          // eslint-disable-next-line react/no-array-index-key
          key={idx}
          surveyType="General"
          title="Dan - Diver’s Alert Network"
          description="Studies the medical impact of decompression on the organism"
          contributions={123456}
        />
      ))}
    </div>
  </>

);
