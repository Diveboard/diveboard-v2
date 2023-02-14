import React from 'react';
import viewMoreStyles from '../viewMore.module.scss';
import { ShopCard } from '../../../Cards/ShopsCard';
import styles from './styles.module.scss';
import { useWindowWidth } from '../../../../hooks/useWindowWidth';

export const ShopsInSpot = () => {
  const isMobile = useWindowWidth(500, 768);
  return (
    <div className={styles.shops}>
      {!isMobile && <h2>Shops</h2>}
      <div className={styles.shopsWrapper}>
        <ShopCard
          addedToFavourite={false}
          imgSrc="/appIcons/no-photo.svg"
          place="Egypt, Sharm El Shaikh"
          score={2.5}
          scoredCount={112}
          shopName="Dive Africa Sharm"
        />
        <ShopCard
          addedToFavourite
          imgSrc="/appIcons/no-photo.svg"
          place="Egypt, Sharm El Shaikh"
          score={1.5}
          scoredCount={112}
          shopName="Dive Africa Sharm"
        />
        <ShopCard
          addedToFavourite={false}
          imgSrc="/appIcons/no-photo.svg"
          place="Egypt, Sharm El Shaikh"
          score={2.5}
          scoredCount={112}
          shopName="Dive Africa Sharm"
        />
        <ShopCard
          addedToFavourite
          imgSrc="/appIcons/no-photo.svg"
          place="Egypt, Sharm El Shaikh"
          score={4.5}
          scoredCount={112}
          shopName="Dive Africa Sharm"
        />
      </div>
      <span className={viewMoreStyles.viewMore}>View More Shops</span>
    </div>
  );
};
