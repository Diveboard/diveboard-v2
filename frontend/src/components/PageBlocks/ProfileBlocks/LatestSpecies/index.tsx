import React, { useEffect, useState } from 'react';
import { doc, DocumentReference } from '@firebase/firestore';
import { Title } from '../Title';
import styles from './styles.module.scss';
import { SpeciesCard } from '../../../Cards/SpeciesCard';
import { SpeciesType } from '../../../../firebase/firestore/models';
import { firestoreSpeciesServices } from '../../../../firebase/firestore/firestoreServices/firestoreSpeciesServices';
import { db } from '../../../../firebase/firestore/firebaseFirestore';
import { PathEnum } from '../../../../firebase/firestore/firestorePaths';
import { notify } from '../../../../utils/notify';
import { Loader } from '../../../Loader';

type Props = {
  speciesData: Array<SpeciesType>
  species: Array<{ specieRef: DocumentReference }>
};

export const LatestSpecies = ({ speciesData, species }: Props) => {
  const [speciesForRender, setSpeciesForRender] = useState(speciesData);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setSpeciesForRender(speciesData);
  }, [speciesData]);

  const loadMore = async () => {
    const refs = {};
    setLoading(true);
    species.slice(speciesForRender.length, speciesForRender.length + 8)
      .forEach(({ specieRef }) => {
        // @ts-ignore
        const segments = specieRef?._key?.path?.segments;
        const id = segments[segments.length - 1];
        refs[id] = doc(db, `${PathEnum}/${id}`);
      });
    try {
      const res = await firestoreSpeciesServices.getSpeciesByRefs(refs);
      setSpeciesForRender([...speciesForRender, ...res]);
      setLoading(false);
    } catch (e) {
      setLoading(false);

      notify(e.message);
    }
  };

  return (
    <div className={styles.latestSpeciesWrapper}>
      <Title title="Latest Species Identified" />
      <div className={styles.cardsWrapper}>
        {speciesForRender.map((fish) => (
          <SpeciesCard
            key={fish.id}
            className={styles.speciesLogbookCard}
            imgSrc={fish.imageSrc}
            speciesName={fish.sname}
            scientificName={fish.category}
          />
        ))}
      </div>
      {isLoading && <Loader loading={isLoading} />}
      {speciesForRender.length < species.length && !isLoading && (
      <span
        className={styles.viewMore}
        onClick={loadMore}
      >
        View More
      </span>
      )}
    </div>
  );
};
