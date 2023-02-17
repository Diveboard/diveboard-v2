import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { DocumentReference } from '@firebase/firestore';
import { Title } from '../Title';
import { DiveBuddyCard } from '../../../Cards/DiveBuddyCard';
import { ArrowLink } from '../../../ArrowLink';
import style from './styles.module.scss';

type Props = {
  buddies: Array<{
    email: string | null,
    name: string | null,
    diveRef: DocumentReference | null,
    userRef: DocumentReference | null,
  }>
};

export const DiveBuddies: FC<Props> = ({ buddies }) => {
  const router = useRouter();
  // const set = new Set(buddies.map((buddy) => buddy.name));
  return (
    <div className={style.blockWrapper}>
      <Title title={`Dive Buddies (${buddies?.length || 0})`} />
      <div className={style.cardsWrapper}>
        {buddies.map((buddy, key) => (
          <DiveBuddyCard
            // eslint-disable-next-line react/no-array-index-key
            key={key}
            onClick={() => buddy.userRef?.id && router.push(`/logbook/${buddy.userRef.id}`)}
            imgSrc="/appIcons/no-photo.svg"
            name={buddy.name}
            onDiveBoard={0}
          />
        ))}
      </div>

      <div className={style.arrowLinkWrapper}>
        <ArrowLink
          text="View Buddies"
          color="#0059DE"
          link="/"
        />
      </div>

    </div>
  );
};
