import React, { useState } from 'react';
import styles from './styles.module.scss';
import { DivesMap } from '../ProfileBlocks/DivesMap';
import { SearchAnimatedInput } from '../../Input/SearchAnimatedInput';
import SpotCard from './SpotCard';

const mapCoords = {
  lat: 40.95,
  lng: 30.33,
};

const markerPoints = [
  {
    id: 1,
    divesCount: 234,
    lat: 41.5,
    lng: 30.33,
    diveName: 'Aloha',
  }, {
    id: 2,
    divesCount: 2,
    lat: 41.95,
    lng: 29.33,
    diveName: 'Shark',
  }, {
    id: 3,
    divesCount: 34,
    lat: 41.7,
    lng: 28.33,
    diveName: 'YO',
  }, {
    id: 4,
    divesCount: 13,
    lat: 42.2,
    lng: 32.33,
    diveName: 'Miran',
  },
];

const fakeSpot = {
  region: 'Egypt, Sharm El Shaikh',
  spotName: 'Shark and Yolana Reef',
  depth: '24 m',
};

// @ts-ignore
const fakeSpots: typeof fakeSpot[] = Array.from({ length: 10 }).fill(fakeSpot);

const tabs = ['Spots', 'Shops', 'Region'];

const ExploreBlock = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(tabs[0]);
  console.log(fakeSpots);
  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        <SearchAnimatedInput
          value={searchQuery}
          setValue={setSearchQuery}
          withBackArrow
        />
        <div className={styles.tabs}>
          {tabs.map((tab, index) => (
            <span
                /* eslint-disable-next-line react/no-array-index-key */
              key={index}
              onClick={() => setActiveTab(tab)}
              className={activeTab === tab ? styles.active : ''}
            >
              {tab}
            </span>
          ))}
        </div>
        <div className={styles.tab}>
          {activeTab === 'Spots' && fakeSpots.map((spot, index) => (
            <SpotCard
                /* eslint-disable-next-line react/no-array-index-key */
              key={index}
              region={spot.region}
              name={spot.spotName}
              depth={spot.depth}
            />
          ))}
        </div>
      </div>
      <div className={styles.map}>
        <DivesMap coords={mapCoords} zoom={7} points={markerPoints} />
      </div>
    </div>
  );
};

export default ExploreBlock;
