import React, { FC } from 'react';
import styles from './styles.module.scss';
import { Title } from '../Title';

type Props = {
  certifications: {
    certificateName: string;
    obtainingDate: string;
  }[]
};

export const CertificationBlock: FC<Props> = ({ certifications }) => {
  const certificationsElements = certifications.map((cert) => (
    <span className={styles.certificateItem} key={cert.certificateName}>
      <span className={styles.cert}>{cert.certificateName}</span>
      <span className={styles.date}>{cert.obtainingDate}</span>
    </span>
  ));

  return (
    <div className={styles.certificationWrapper}>
      <Title title="Certifications" />
      <div className={styles.certificates}>
        {
          certificationsElements
        }
      </div>
    </div>
  );
};
