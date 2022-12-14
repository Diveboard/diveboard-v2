import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { Title } from '../Title';
import { DiveBuddyCard } from '../../../Cards/DiveBuddyCard';
import { ArrowLink } from '../../../ArrowLink';
import style from './styles.module.scss';

type Props = {
  buddies: Array<any>
};

export const DiveBuddies: FC<Props> = ({ buddies }) => {
  const router = useRouter();
  return (
    <div className={style.blockWrapper}>
      <Title title={`Dive Buddies (${buddies?.length || 0})`} />
      <div className={style.cardsWrapper}>
        {buddies.map((buddy) => (
          <DiveBuddyCard
            onClick={() => buddy.id && router.push(`/logbook/${buddy.id}`)}
            key={buddy.id || buddy.name}
            imgSrc={buddy.photoURL || '/TEST_IMG_THEN_DELETE/photo4.jpg'}
            name={buddy.name}
            onDiveBoard={buddy.diveTotal}
            total={buddy.diveTotal}
            onSpot={0}
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
