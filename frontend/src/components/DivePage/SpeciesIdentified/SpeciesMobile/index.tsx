import React, { FC, useEffect, useState } from 'react';

import { doc, DocumentReference } from '@firebase/firestore';
import { SpeciesCard } from '../../../Cards/SpeciesCard';
import { SpeciesType } from '../../../../firebase/firestore/models';
import { db } from '../../../../firebase/firestore/firebaseFirestore';
import { notify } from '../../../../utils/notify';
import { firestoreSpeciesServices } from '../../../../firebase/firestore/firestoreServices/firestoreSpeciesServices';
import styles from '../../../PhotoGroup/mobilePhotoGroup/styles.module.scss';
import { Loader } from '../../../Loader';

type Props = {
  speciesList: Array<SpeciesType>
  species?: Array<{
    specieRef: DocumentReference
  }>
};

export const SpeciesMobile:FC <Props> = ({ speciesList, species }) => {
  const [speciesForRender, setSpeciesForRender] = useState(speciesList);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setSpeciesForRender(speciesList);
  }, [speciesList]);

  const loadMore = async () => {
    const refs = {};
    setLoading(true);
    species.slice(speciesForRender.length, speciesForRender.length + 2)
      .forEach(({ specieRef }) => {
        // @ts-ignore
        const segments = specieRef?._key?.path?.segments;
        const id = segments[segments.length - 1];
        refs[id] = doc(db, `species/${id}`);
      });
    try {
      const res = await firestoreSpeciesServices.getSpeciesByRefs(refs);
      setSpeciesForRender([...speciesForRender, ...res]);
      setLoading(false);
    } catch (e) {
      notify(e.message);
      setLoading(false);
    }
  };
  return (
    <div className={styles.speciesBlock}>
      <div className={styles.scrollWrapper}>
        {speciesForRender.map((itm) => (
          <SpeciesCard
            key={itm.id}
            imgSrc={itm?.imageSrc}
            speciesName={itm?.sname}
            scientificName={itm?.category}
            className="smallCard"
          />
        ))}
      </div>
      {species.length > speciesForRender.length && (
      <span
        className={styles.viewMore}
        onClick={loadMore}
      >
        View More
      </span>
      )}
      <Loader loading={isLoading} />
    </div>
  );
};
