import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { doc } from '@firebase/firestore';
import styles from './styles.module.scss';
import { BuddiesType } from '../../../firebase/firestore/models';
import { DiveBuddyCard } from '../../Cards/DiveBuddyCard';
import { db } from '../../../firebase/firestore/firebaseFirestore';
import { notify } from '../../../utils/notify';
import {
  firestorePublicProfileService,
} from '../../../firebase/firestore/firestoreServices/firestorePublicProfileService';
import { Loader } from '../../Loader';

type Props = {
  buddiesData: Array<BuddiesType>
  buddies: Array<BuddiesType>
};

export const BuddiesBlock: FC<Props> = ({
  buddiesData, buddies,
}): JSX.Element => {
  const router = useRouter();
  const [buddiesForRender, setBuddiesForRender] = useState(buddiesData);
  const [isLoading, setLoading] = useState(false);

  const loadMore = async () => {
    setLoading(true);
    const buds = buddies.slice(buddiesForRender.length, buddiesForRender.length + 4)
      .map((buddy) => {
        if (buddy.userRef) {
          // @ts-ignore
          const segments = buddy.userRef?._key?.path?.segments;
          const id = segments[segments.length - 1];
          buddy.userRef = doc(db, `users/${id}`);
        }
        return buddy;
      });
    try {
      const res = await firestorePublicProfileService.getBuddiesInfo(buds);
      setBuddiesForRender([...buddiesForRender, ...res]);
      setLoading(false);
    } catch (e) {
      notify(e.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    setBuddiesForRender(buddiesData);
  }, [buddiesData]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.buddiesBlock}>
        {buddiesForRender.map((buddy) => (
          <DiveBuddyCard
            onClick={() => buddy.type === 'internal' && router.push(`/logbook/${buddy.id}`)}
            key={buddy.id}
            imgSrc={buddy?.photoUrl || '/appIcons/no-photo.svg'}
            name={buddy?.name || ''}
            onDiveBoard={buddy?.diveTotal}
          />
        ))}
      </div>
      {buddiesForRender.length < buddies.length
          && <div onClick={loadMore} className={styles.viewMore}>View More</div>}
      {isLoading && <Loader loading={isLoading} /> }
    </div>

  );
};
