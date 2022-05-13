import React, { FC } from 'react';
import { Title } from '../Title';
import { DiveBuddyCard } from '../../../Cards/DiveBuddyCard';
import { ArrowLink } from '../../../ArrowLink';
import style from './styles.module.scss';

export const DiveBuddies: FC = () => (
  <div className={style.blockWrapper}>
    <Title title="Dive Buddies (45)" />
    <div className={style.cardsWrapper}>

      <DiveBuddyCard
        imgSrc="/TEST_IMG_THEN_DELETE/photo4.jpg"
        name="Nolan Franci"
        onDiveBoard={125}
        total={157}
        onSpot={4}
      />

      <DiveBuddyCard
        imgSrc="/TEST_IMG_THEN_DELETE/fish.jpg"
        name="Nolan Franci"
        onDiveBoard={125}
        total={157}
        onSpot={4}
      />

      <DiveBuddyCard
        imgSrc="/TEST_IMG_THEN_DELETE/photo5.jpg"
        name="Nolan Franci"
        onDiveBoard={125}
        total={157}
        onSpot={4}
      />

      <DiveBuddyCard
        imgSrc="/TEST_IMG_THEN_DELETE/photo6.jpg"
        name="Nolan Franci"
        onDiveBoard={125}
        total={157}
        onSpot={4}
      />
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
