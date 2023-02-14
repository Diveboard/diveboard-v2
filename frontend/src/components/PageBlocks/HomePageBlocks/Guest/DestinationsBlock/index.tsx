import React from 'react';
import { DestinationCard } from '../../../../Cards/DestinationCard';
import { ArrowLink } from '../../../../ArrowLink';
import styles from './styles.module.scss';

export const DestinationBlock = () => (
  <div className={styles.destinationBlock}>
    <h2 className={styles.title}>Featured Destinations</h2>
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
        destinationName="Shark and Yolanda Reef"
        rating={4}
        country="Egypt"
        divesNumber={145}
      />
      <DestinationCard
        imgSrc="/appIcons/no-photo.svg"
        destinationName="The Yongala"
        rating={4}
        country="Australia"
        divesNumber={144}
      />
      <DestinationCard
        imgSrc="/appIcons/no-photo.svg"
        destinationName="Barracuda Point"
        rating={4}
        country="Malaysia"
        divesNumber={143}
      />
    </div>
    <ArrowLink
      text="Explore Featured Destinations"
      color="#0059DE"
      link="/"
    />
  </div>
);
