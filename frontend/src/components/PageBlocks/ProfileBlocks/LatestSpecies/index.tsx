import React from 'react';
import { Title } from '../Title';
import styles from './styles.module.scss';
import { SpeciesCard } from '../../../Cards/SpeciesCard';

export const LatestSpecies = () => (
  <div className={styles.latestSpeciesWrapper}>
    <Title title="Latest Species Identified" />
    <div className={styles.cardsWrapper}>
      <SpeciesCard
        imgSrc="/TEST_IMG_THEN_DELETE/shark.jpg"
        speciesName="Emperor Angelfish"
        scientificName="Pomacanthus imperator"
      />
      <SpeciesCard
        imgSrc="/TEST_IMG_THEN_DELETE/shark.jpg"
        speciesName="Emperor Angelfish"
        scientificName="Pomacanthus imperator"
      />
      <SpeciesCard
        imgSrc="/TEST_IMG_THEN_DELETE/shark.jpg"
        speciesName="Emperor Angelfish"
        scientificName="Pomacanthus imperator"
      />
      <SpeciesCard
        imgSrc="/TEST_IMG_THEN_DELETE/shark.jpg"
        speciesName="Emperor Angelfish"
        scientificName="Pomacanthus imperator"
      />
    </div>
    <span
      className={styles.viewMore}
      onClick={() => {
      }}
    >
      View More
    </span>
  </div>
);
