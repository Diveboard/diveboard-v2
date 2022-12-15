import React, { useState } from 'react';
import { Title } from '../Title';
import styles from './styles.module.scss';
import { SpeciesCard } from '../../../Cards/SpeciesCard';
import { SpeciesType } from '../../../../firebase/firestore/models';
import { useWindowWidth } from '../../../../hooks/useWindowWidth';

type Props = {
  species: Array<SpeciesType>
};

export const LatestSpecies = ({ species }: Props) => {
  const [isMoreClicked, setShowMoreClicked] = useState(false);
  const isMobile = useWindowWidth(500, 769);
  const [speciesForRender, setSpeciesForRender] = useState(
    isMobile ? species : species?.slice(0, 4),
  );

  return (
    <div className={styles.latestSpeciesWrapper}>
      <Title title="Latest Species Identified" />
      <div className={styles.cardsWrapper}>
        {speciesForRender.map((fish) => (
          <SpeciesCard
            className={styles.speciesLogbookCard}
            key={fish.id}
            imgSrc={fish.imgSrc || '/TEST_IMG_THEN_DELETE/photo2.jpg'}
            speciesName={fish.sname}
            scientificName={fish.category}
          />
        ))}
      </div>
      {!isMobile && species.length > 4 && (
      <span
        className={styles.viewMore}
        onClick={() => {
          const isClicked = !isMoreClicked;
          setShowMoreClicked(isClicked);
          setSpeciesForRender(isClicked ? species : species?.slice(0, 4));
        }}
      >
        {`View ${isMoreClicked ? 'Less' : 'More'}`}
      </span>
      )}
    </div>
  );
};
