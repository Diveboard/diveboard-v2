import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { doc } from '@firebase/firestore';
import { Title } from '../Title';
import { DiveBuddyCard } from '../../../Cards/DiveBuddyCard';
import style from './styles.module.scss';
import { BuddiesType } from '../../../../firebase/firestore/models';
import { db } from '../../../../firebase/firestore/firebaseFirestore';
import { notify } from '../../../../utils/notify';
import {
  firestorePublicProfileService,
} from '../../../../firebase/firestore/firestoreServices/firestorePublicProfileService';
import { Loader } from '../../../Loader';

type Props = {
  buddies: Array<BuddiesType>
  buddiesData: Array<BuddiesType>
};

export const DiveBuddies: FC<Props> = ({ buddiesData, buddies }) => {
  const router = useRouter();
  const [buddiesForRender, setBuddiesForRender] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const filterUniqBuddies = (arr: Array<BuddiesType>) => {
    const uniqueIds = [];
    return arr.filter((element) => {
      const isDuplicate = uniqueIds.some((el) => el.name === element.name);
      if (!isDuplicate) {
        uniqueIds.push(element);
        return true;
      }
      return false;
    });
  };
  const unics = filterUniqBuddies(buddies);

  useEffect(() => {
    setBuddiesForRender(filterUniqBuddies(buddiesData));
  }, [buddiesData]);

  const loadMore = async () => {
    setLoading(true);
    const buds = unics.slice(buddiesForRender.length, buddiesForRender.length + 4)
      .map((buddy) => {
        const newBuddy = { ...buddy };
        if (newBuddy.userRef) {
          // @ts-ignore
          const segments = newBuddy.userRef?._key?.path?.segments;
          const id = segments[segments.length - 1];
          newBuddy.userRef = doc(db, `users/${id}`);
        }
        return newBuddy;
      });
    try {
      const res = await firestorePublicProfileService.getBuddiesInfo(buds);
      setBuddiesForRender(filterUniqBuddies([...buddiesForRender, ...res]));
      setLoading(false);
    } catch (e) {
      setLoading(false);
      notify(e.message);
    }
  };

  return (
    <div className={style.blockWrapper}>
      <Title title={`Dive Buddies (${buddies?.length ? unics.length : 0})`} />
      <div className={style.cardsWrapper}>
        {buddiesForRender.map((buddy, key) => (
          <DiveBuddyCard
            // eslint-disable-next-line react/no-array-index-key
            key={key}
            onClick={() => buddy.userRef && router.push(`/logbook/${buddy.id}`)}
            imgSrc={buddy.photoUrl || '/appIcons/no-photo.svg'}
            name={buddy.name}
            onDiveBoard={buddy.diveTotal}
          />
        ))}
      </div>
      {buddiesForRender.length < unics.length
            && <div onClick={loadMore} className={style.arrowLinkWrapper}>View More</div>}
      {isLoading && <Loader loading={isLoading} /> }

    </div>
  );
};
