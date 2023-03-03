import React, { FC, useEffect, useState } from 'react';
import { DocumentReference } from '@firebase/firestore';
import { Title } from '../Title';
import { SurveyCard } from '../../LogADiveBlocks/StepsComponents/EighthStep/SurveyCard';
import style from './styles.module.scss';

type Props = {
  surveys: Array<DocumentReference>;
};

export const SurveysBlock: FC<Props> = ({ surveys }) => {
  const [viewMore, setViewMore] = useState(true);
  const [surveysForRender, setSurveysForRender] = useState(surveys);

  useEffect(() => {
    setSurveysForRender(surveys.slice(0, 4));
  }, [surveys]);

  const setMoreSurveys = () => {
    setSurveysForRender(viewMore ? surveys : surveys.slice(0, 4));
    setViewMore(!viewMore);
  };

  return (
    <>
      <Title title={`Surveys (${surveys.length})`} />
      <div className={style.blockWrapper}>
        {surveysForRender.map((survey, idx) => (
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
      <div
        className={style.viewMore}
        onClick={setMoreSurveys}
      >
        {`View ${viewMore ? 'More' : 'Less'}`}
      </div>
    </>
  );
};
