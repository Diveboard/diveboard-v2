import React, { useState } from 'react';
import { SmallDiveCard } from '../../../Cards/SmallDiveCard';
import styles from './styles.module.scss';
import viewMoreStyles from '../viewMore.module.scss';
import { useWindowWidth } from '../../../../hooks/useWindowWidth';
import { DiveType } from '../../../../firebase/firestore/models';
import { convertTimestampDate } from '../../../../utils/convertTimestampDate';

type Props = {
  dives: Array<DiveType>
};

export const DivesInSpot = ({ dives }: Props) => {
  const isMobile = useWindowWidth(500, 768);
  const [isMoreClicked, setMoreClicked] = useState(false);
  return (
    <div className={styles.divesInSpot}>
      {isMobile === false && !!dives?.length && <h2>Dives</h2>}
      <div className={styles.divesInSpotWrapper}>
        {!!dives?.length && dives.map((dive) => (
          <SmallDiveCard
            diverName={dive.aboutDive?.tripName}
            imgSrc={dive.externalImgsUrls[0]}
            date={convertTimestampDate(dive.diveData?.date)}
            diveTime={dive.diveData?.time}
            deepness={dive.diveData?.maxDepth}
            diversCount={dive.buddies?.length}
            diveUnitSystem={dive.unitSystem}
          />
        ))}
      </div>
      {dives?.length > 6 && (
      <span className={viewMoreStyles.viewMore} onClick={() => setMoreClicked(!isMoreClicked)}>
        {`View ${!isMoreClicked ? 'More' : 'Less'} Dives`}
      </span>
      )}
    </div>
  );
};
