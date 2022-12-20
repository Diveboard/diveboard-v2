import React, { FC } from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';
import { Icon } from '../../../../../Icons/Icon';

type Props = {
  surveyType: 'General';
  title: string;
  description: string;
  contributions: number;
  setCurrentSurvey: (survey: string)=>void;
};
export const SurveyCard: FC<Props> = ({
  surveyType, title, description, contributions, setCurrentSurvey,
}) => (
  <div className={styles.surveyCard}>
    <Image src="/images/survey.jpg" width={94} height={140} alt="survey" className={styles.img} />
    <div className={styles.contentWrapper}>

      <div className={styles.content}>
        <span className={styles.surveyType}>{surveyType}</span>
        <span className={styles.title}>{title}</span>
        <p className={styles.description}>{description}</p>
        <span className={styles.contribution}>
          Contributions:
          {' '}
          <span className={styles.contributionId}>{contributions}</span>
        </span>
      </div>

      <span className={styles.icon} onClick={() => { setCurrentSurvey(title); }}>
        <Icon iconName="back-button" size={36} />
      </span>
    </div>

  </div>
);
