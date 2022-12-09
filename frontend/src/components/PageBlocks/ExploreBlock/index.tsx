import React, { FC, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './styles.module.scss';
import { SearchAnimatedInput } from '../../Input/SearchAnimatedInput';
import SpotCard from './SpotCard';
import FavoritesBlock from '../../Cards/PhotoCard/FavoritesBlock';
import { Icon } from '../../Icons/Icon';
import { ExploreMap } from './ExploreMap';
import { firestoreGeoDataService } from '../../../firebase/firestore/firestoreServices/firestoreGeoDataService';
import { useDebounce } from '../../../hooks/useDebounce';
import { SearchDropdownPanel } from '../../Dropdown/SearchedItems/SearchDropdownPanel';
import { firestoreSpotsService } from '../../../firebase/firestore/firestoreServices/firestoreSpotsService';
// import { ShopCard } from '../../Cards/ShopsCard';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

// const markerPoints = [
//   {
//     id: 1,
//     divesCount: 234,
//     lat: 41.5,
//     lng: 30.33,
//     diveName: 'Aloha',
//   }, {
//     id: 2,
//     divesCount: 2,
//     lat: 41.95,
//     lng: 29.33,
//     diveName: 'Shark',
//   }, {
//     id: 3,
//     divesCount: 34,
//     lat: 41.7,
//     lng: 28.33,
//     diveName: 'YO',
//   }, {
//     id: 4,
//     divesCount: 13,
//     lat: 42.2,
//     lng: 32.33,
//     diveName: 'Miran',
//   },
// ];

// const fakeSpot = {
//   region: 'Egypt, Sharm El Shaikh',
//   spotName: 'Shark and Yolana Reef',
//   depth: '24 m',
//   imgSrc: '/TEST_IMG_THEN_DELETE/egypt.png',
//   favorite: false,
// };

// @ts-ignore
// const fakeSpots: typeof fakeSpot[] = Array.from({ length: 10 }).fill(fakeSpot);

// const fakeShop = {
//   imgSrc: '/TEST_IMG_THEN_DELETE/fish.jpg',
//   addedToFavourite: false,
//   shopName: 'Dive Africa Sharm',
//   place: 'Egypt, Sharm El Shaikh',
//   score: 2.5,
//   scoredCount: 112,
// };

// const fakeShops: typeof fakeShop[] = Array.from({ length: 10 }).fill(fakeShop);

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

// const series = [
//   {
//     name: 'series-1',
//     data: [30, 40, 45, 77, 95, 80, 63, 50, 49, 60, 70, 91],
//   },
// ];

const ExploreBlock: FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [touchStartY, setTouchStartY] = useState(null);
  // const [chosenSpot, setChosenSpot] = useState(null);

  const [inputRegion, setInputRegion] = useState(null);
  const [isFetch, setIsFetch] = useState(true);
  const [regions, setRegions] = useState([]);
  const [region, setRegion] = useState(undefined);
  const [spots, setSpots] = useState([]);
  const [markerPoints, setMarkerPoints] = useState([]);

  const [mapCoords, setMapsCoords] = useState({
    lat: 40.95,
    lng: 30.33,
  });

  const router = useRouter();

  const handleSidebar = (e): void => {
    // setChosenSpot(null);
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
      navbar.style.visibility = 'hidden';
      map.style.visibility = 'visible';
      input.style.visibility = 'visible';
    }
  };

  // const handleChoseSpot = (index: number): void => {
  //   const sidebar = document.getElementById('sidebar');
  //   const navbar = document.getElementById('navbar');
  //   navbar.style.visibility = 'hidden';
  //   sidebar.style.top = 'unset';
  //   sidebar.style.bottom = '0';
  //   sidebar.style.maxHeight = '60px';
  //   setChosenSpot(index);
  // };

  useDebounce(searchQuery, setInputRegion, 1000);

  const fetchRegions = async () => {
    if (inputRegion && isFetch) {
      const res = await firestoreGeoDataService.getRegions(inputRegion, null, 15);
      setRegions(res);
    }
  };

  useEffect(() => {
    if (inputRegion) {
      fetchRegions();
      setIsFetch(true);
    }
  }, [inputRegion]);

  const searchHandler = async (item) => {
    setRegions([]);
    setSearchQuery(item.name);
    if (item.regionId) {
      const reg = await firestoreGeoDataService.getRegionArea(item.regionId);
      setRegion(reg);
    }
    if (item?.coords?.ne) {
      setMapsCoords(item.coords?.ne);
    }
    setIsFetch(false);
    const res = await firestoreSpotsService.getSpotsByRegion(item.name);
    setMarkerPoints(res.map((s) => ({
      id: s.id,
      lat: s.lat,
      lng: s.lng,
      divesCount: s.dives?.length,
      diveName: s.name,
    })));
    setSpots(res);
  };

  const renderInput = (
    <SearchAnimatedInput
      value={searchQuery}
      setValue={(val) => {
        setSearchQuery(val);
        setActiveTab('Spots');
      }}
      withBackArrow
      onClick={() => {
        setIsFetch(true);
        fetchRegions();
      }}
    >
      {!!regions?.length && (
      <SearchDropdownPanel
        loading={false}
        onItemClick={searchHandler}
        items={regions}
      />
      )}
    </SearchAnimatedInput>
  );

  return (
    <div className={`${styles.wrapper} ${styles['min-height-wrapper']}`}>
      <div className={styles.sidebar} id="sidebar" onTouchEnd={handleSidebar}>
        {!isMobile && renderInput}
        <div
          className={styles.tabs}
          onTouchStart={(e) => setTouchStartY(e.touches[0].screenY)}
        >
          {isMobile && (
          <div
            className={styles.mobDashWrapper}
          >
            <div className={styles.mobDash} />
          </div>
          )}
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              disabled={tab === 'Shops'}
              className={activeTab === tab ? styles.active : ''}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className={styles.tab}>
          {activeTab === 'Spots' && (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <>
            {!!spots.length && spots.map((spot) => (
              <a
                key={spot.id}
                onClick={() => router.push('spot')}
              >
                <SpotCard
                  region={spot.location?.region}
                  name={spot.name}
                // Check it
                  depth={spot.stats?.averageDepth?.metric}
                  imgSrc={spot.bestPictures[0] || '/images/fish.jpg'}
                  favorite={false}
                  country={spot.location?.country}
                />
              </a>
            ))}
          </>
          )}
          {/* {activeTab === 'Shops' && fakeShops.map((shop, index) => (* /}
          {/*  <ShopCard */}
          {/*        /* eslint-disable-next-line react/no-array-index-key */}
          {/*    key={index} */}
          {/*    addedToFavourite={shop.addedToFavourite} */}
          {/*    imgSrc={shop.imgSrc} */}
          {/*    place={shop.place} */}
          {/*    score={shop.score} */}
          {/*    scoredCount={shop.scoredCount} */}
          {/*    shopName={shop.shopName} */}
          {/*  /> */}
          {/* ))} */}
          {activeTab === 'Region' && (
          <>
            <div className={styles.regionTitle}>
              <h1>{searchQuery}</h1>
              <FavoritesBlock isFavorite={false} count={0} />
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
            {region && (
            <>
              <div className={styles.subtitle}>
                <Icon iconName="attendance" size={24} />
                Attendance
              </div>
              <ReactApexChart
                options={options}
                type="bar"
                series={[{
                  name: 'series-1',
                  data: [
                    region.january,
                    region.february,
                    region.march,
                    region.april,
                    region.may,
                    region.june,
                    region.july,
                    region.august,
                    region.september,
                    region.october,
                    region.november,
                    region.december,
                  ],
                }]}
              />
            </>
            )}
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
          isMobile={isMobile}
          renderInput={renderInput}
        />
        {/* {typeof chosenSpot === 'number' && ( */}
        {/* <div className={styles.chosenSpot}> */}
        {/*  <SpotCard */}
        {/*    region={fakeSpots[chosenSpot].region} */}
        {/*    name={fakeSpots[chosenSpot].spotName} */}
        {/*    depth={fakeSpots[chosenSpot].depth} */}
        {/*    imgSrc={fakeSpots[chosenSpot].imgSrc} */}
        {/*    favorite={fakeSpots[chosenSpot].favorite} */}
        {/*  /> */}
        {/* </div> */}
        {/* )} */}
      </div>
    </div>
  );
};

export default ExploreBlock;
