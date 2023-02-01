import React, { FC } from 'react';
import { Title } from '../Title';
import { SurveyCard } from '../../LogADiveBlocks/StepsComponents/EighthStep/SurveyCard';
import style from './styles.module.scss';

type Props = {
  surveysNumber: number;
};

export const SurveysBlock: FC<Props> = ({ surveysNumber }) => (
  <>
    <Title title="Surveys" />
    <div className={style.blockWrapper}>
      {Array.from({ length: surveysNumber }, (_, i) => i + 1).map((survey) => (
        <SurveyCard
          key={survey}
          surveyType="General"
          title="Dan - Diver’s Alert Network"
          description="Studies the medical impact of decompression on the organism"
          contributions={123456}
        />
      ))}
    </div>
  </>

);
