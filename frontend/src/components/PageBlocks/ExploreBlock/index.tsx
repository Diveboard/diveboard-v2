import React, { FC, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import styles from './styles.module.scss';
import { SearchAnimatedInput } from '../../Input/SearchAnimatedInput';
import SpotCard from './SpotCard';
import { ShopCard } from '../../Cards/ShopsCard';
import FavoritesBlock from '../../Cards/PhotoCard/FavoritesBlock';
import { Icon } from '../../Icons/Icon';
import { ExploreMap } from './ExploreMap';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

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
  imgSrc: '/TEST_IMG_THEN_DELETE/egypt.png',
  favorite: false,
};

// @ts-ignore
const fakeSpots: typeof fakeSpot[] = Array.from({ length: 10 }).fill(fakeSpot);

const fakeShop = {
  imgSrc: '/TEST_IMG_THEN_DELETE/fish.jpg',
  addedToFavourite: false,
  shopName: 'Dive Africa Sharm',
  place: 'Egypt, Sharm El Shaikh',
  score: 2.5,
  scoredCount: 112,
};

// @ts-ignore
const fakeShops: typeof fakeShop[] = Array.from({ length: 10 }).fill(fakeShop);

const tabs = ['Spots', 'Shops', 'Region'];

const options = {
  chart: {
    id: 'attendance-chart',
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
  grid: {
    show: false,
  },
  colors: ['#FDC90D80'],
};

const series = [
  {
    name: 'series-1',
    data: [30, 40, 45, 77, 95, 80, 63, 50, 49, 60, 70, 91],
  },
];

const ExploreBlock: FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [touchStartY, setTouchStartY] = useState(null);
  const [chosenSpot, setChosenSpot] = useState(null);

  const handleSidebar = (e): void => {
    setChosenSpot(null);
    const yTouch = e.changedTouches[0].screenY;
    const sidebar = document.getElementById('sidebar');
    const navbar = document.getElementById('navbar');
    const map = document.getElementById('map');
    const input = document.getElementById('mapInput');

    const centerSidebar = () => {
      sidebar.style.top = '48%';
      sidebar.style.maxHeight = '50vh';
      sidebar.style.bottom = 'unset';
      navbar.style.visibility = 'visible';
      map.style.visibility = 'visible';
      input.style.visibility = 'visible';
    };

    if (touchStartY > yTouch) { // swipe up
      if (touchStartY > window.innerHeight - 100) {
        centerSidebar();
        return;
      }
      sidebar.style.top = '76px';
      sidebar.style.maxHeight = '88vh';
      sidebar.style.bottom = 'unset';
      navbar.style.display = 'flex';
      navbar.style.visibility = 'visible';
      map.style.visibility = 'hidden';
      input.style.visibility = 'visible';
    }
    if (touchStartY < yTouch) { // swipe down
      if (touchStartY < window.innerHeight / 2) {
        centerSidebar();
        return;
      }
      sidebar.style.top = 'calc(100% - 60px)';
      sidebar.style.bottom = '0';
      sidebar.style.maxHeight = '60px';
      navbar.style.visibility = 'hidden';
      map.style.visibility = 'visible';
      input.style.visibility = 'visible';
    }
  };

  const handleChoseSpot = (index: number): void => {
    const sidebar = document.getElementById('sidebar');
    const navbar = document.getElementById('navbar');
    navbar.style.visibility = 'hidden';
    sidebar.style.top = 'unset';
    sidebar.style.bottom = '0';
    sidebar.style.maxHeight = '60px';
    setChosenSpot(index);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar} id="sidebar" onTouchEnd={handleSidebar}>
        {!isMobile && (
        <SearchAnimatedInput
          value={searchQuery}
          setValue={setSearchQuery}
          withBackArrow
        />
        )}
        <div className={styles.tabs}>
          {isMobile && (
          <div
            className={styles.mobDashWrapper}
            onTouchStart={(e) => setTouchStartY(e.touches[0].screenY)}
          >
            <div className={styles.mobDash} />
          </div>
          )}
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
            <a
                  /* eslint-disable-next-line react/no-array-index-key */
              key={index}
              onClick={() => handleChoseSpot(index)}
            >
              <SpotCard
                region={spot.region}
                name={spot.spotName}
                depth={spot.depth}
                imgSrc={spot.imgSrc}
                favorite={spot.favorite}
              />
            </a>
          ))}
          {activeTab === 'Shops' && fakeShops.map((shop, index) => (
            <ShopCard
                  /* eslint-disable-next-line react/no-array-index-key */
              key={index}
              addedToFavourite={shop.addedToFavourite}
              imgSrc={shop.imgSrc}
              place={shop.place}
              score={shop.score}
              scoredCount={shop.scoredCount}
              shopName={shop.shopName}
            />
          ))}
          {activeTab === 'Region' && (
          <>
            <div className={styles.regionTitle}>
              <h1>Sharm El Shaikh</h1>
              <FavoritesBlock isFavorite={false} count={112} />
            </div>
            <div className={styles.subtitle}>
              <Icon iconName="stats" size={24} />
              Stats
            </div>
            <div className={styles.stats}>
              <span>
                Average depth:
                {' '}
                <b>20.78m</b>
              </span>
              <span>
                Average temperature on bottom:
                {' '}
                <b>25°C</b>
              </span>
              <span>
                Average temperature on surface:
                {' '}
                <b>27ºC</b>
              </span>
            </div>
            <div className={styles.subtitle}>
              <Icon iconName="attendance" size={24} />
              Attendance
            </div>
            <ReactApexChart options={options} type="bar" series={series} />
            <div className={styles.subtitle}>
              <Icon iconName="species-octopus" size={24} />
              Species
            </div>
            <div>
              <Image
                src="/images/Species.svg"
                layout="intrinsic"
                height={70}
                width={420}
              />
            </div>
          </>
          )}
        </div>
      </div>
      <div className={styles.map} id="map">
        <ExploreMap
          coords={mapCoords}
          zoom={7}
          points={markerPoints}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isMobile={isMobile}
        />
        {typeof chosenSpot === 'number' && (
        <div className={styles.chosenSpot}>
          <SpotCard
            region={fakeSpots[chosenSpot].region}
            name={fakeSpots[chosenSpot].spotName}
            depth={fakeSpots[chosenSpot].depth}
            imgSrc={fakeSpots[chosenSpot].imgSrc}
            favorite={fakeSpots[chosenSpot].favorite}
          />
        </div>
        )}
      </div>
    </div>
  );
};

export default ExploreBlock;
