import React from 'react';
import { Title } from '../Title';
import { DestinationCard } from '../../../Cards/DestinationCard';
import { ArrowLink } from '../../../ArrowLink';
import styles from './styles.module.scss';

export const CentersVisitedBlock = () => (
  <div className={styles.centersWrapper}>
    <Title title="Dive Centers Visited" />
    <div className={styles.cardWrapper}>
      <DestinationCard
        imgSrc="/appIcons/no-photo.svg"
        destinationName="Koh Bida Nai"
        rating={4}
        country="Thailand"
        divesNumber={146}
      />
      <DestinationCard
        imgSrc="/appIcons/no-photo.svg"
        destinationName="Koh Bida Nai"
        rating={4}
        country="Thailand"
        divesNumber={146}
      />
      <DestinationCard
        imgSrc="/appIcons/no-photo.svg"
        destinationName="Koh Bida Nai"
        rating={4}
        country="Thailand"
        divesNumber={146}
      />
      <DestinationCard
        imgSrc="/appIcons/no-photo.svg"
        destinationName="Koh Bida Nai"
        rating={4}
        country="Thailand"
        divesNumber={146}
      />
    </div>
    <ArrowLink
      text="View More"
      color="#0059DE"
      link="/"
    />
  </div>
);
