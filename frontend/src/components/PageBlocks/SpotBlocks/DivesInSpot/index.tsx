import React, { useEffect, useState } from 'react';
import { doc, DocumentReference } from '@firebase/firestore';
import { SmallDiveCard } from '../../../Cards/SmallDiveCard';
import styles from './styles.module.scss';
import viewMoreStyles from '../viewMore.module.scss';
import { useWindowWidth } from '../../../../hooks/useWindowWidth';
import { DiveType } from '../../../../firebase/firestore/models';
import { convertTimestampDate } from '../../../../utils/convertTimestampDate';
import { firestoreDivesService } from '../../../../firebase/firestore/firestoreServices/firestoreDivesService';
import { notify } from '../../../../utils/notify';
import { Loader } from '../../../Loader';
import { db } from '../../../../firebase/firestore/firebaseFirestore';

type Props = {
  dives: Array<DiveType>
  spotDivesIds: { [key: string]: DocumentReference }
};

export const DivesInSpot = ({ dives, spotDivesIds }: Props) => {
  const isMobile = useWindowWidth(500, 768);
  const [isMoreClicked, setMoreClicked] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [fetchedDives, setFetchedDives] = useState(dives);

  useEffect(() => {
    setFetchedDives(dives);
  }, [dives]);

  const fetchMoreDives = async () => {
    try {
      setLoading(true);
      setMoreClicked(!isMoreClicked);

      // convert custom ref to document ref
      const resIds = Object.fromEntries(Object.entries(spotDivesIds)
        .slice(fetchedDives.length, fetchedDives.length + 8)
        .map(([key, value]) => {
          // @ts-ignore
          const segments = value?._key?.path?.segments;
          return [key, doc(db, `${segments.slice(segments.length - 4).join('/')}`)];
        }));

      const newDives = await firestoreDivesService.getDivesByRefs(resIds);
      setFetchedDives([...fetchedDives, ...newDives]);
      setLoading(false);
    } catch (ev) {
      notify(ev.message);
      setLoading(false);
    }
  };

  return (
    <div className={styles.divesInSpot}>
      {isMobile === false && !!dives?.length && <h2>Dives</h2>}
      <div className={styles.divesInSpotWrapper}>
        {!!fetchedDives?.length && fetchedDives.map((dive) => (
          <SmallDiveCard
            key={dive.id}
            diveRef={dive.ref}
            diverName={dive.aboutDive?.tripName}
            imgSrc={dive.pictures[0]?.url}
            date={convertTimestampDate(dive.diveData?.date)}
            diveTime={dive.diveData?.time}
            deepness={dive.diveData?.maxDepth}
            diversCount={dive.buddies?.length}
            diveUnitSystem={dive.unitSystem}
          />
        ))}
      </div>
      {isLoading ? <Loader loading={isLoading} /> : (
        <div>
          {dives?.length !== Object.entries(spotDivesIds).length && (
          <span className={viewMoreStyles.viewMore} onClick={fetchMoreDives}>
            {`View ${dives?.length < Object.entries(spotDivesIds).length ? 'More' : 'Less'} Dives`}
          </span>
          )}
        </div>
      )}
    </div>
  );
};
