import React, {
  FC, useContext, useEffect, useRef, useState,
} from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './styles.module.scss';
import { SearchAnimatedInput } from '../../Input/SearchAnimatedInput';
import SpotCard from './SpotCard';
import { Icon } from '../../Icons/Icon';
import { ExploreMap } from './ExploreMap';
import { firestoreGeoDataService } from '../../../firebase/firestore/firestoreServices/firestoreGeoDataService';
import { useDebounce } from '../../../hooks/useDebounce';
import { SearchDropdownPanel } from '../../Dropdown/SearchedItems/SearchDropdownPanel';
import { firestoreSpotsService } from '../../../firebase/firestore/firestoreServices/firestoreSpotsService';
import { useOutsideClick } from '../../../hooks/useOutsideClick';
import { AuthStatusContext } from '../../../layouts/AuthLayout';
import { convertCalToFar, convertMetersToFeet } from '../../../utils/unitSystemConverter';
import { notify } from '../../../utils/notify';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

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
  const [bounds, setBounds] = useState(null);
  // const [chosenSpot, setChosenSpot] = useState(null);

  const [zoom, setZoom] = useState(7);
  const [inputRegion, setInputRegion] = useState(null);
  const [isFetch, setIsFetch] = useState(true);
  const [regions, setRegions] = useState([]);
  const [region, setRegion] = useState(undefined);
  const [spots, setSpots] = useState([]);
  const [markerPoints, setMarkerPoints] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const [mapCoords, setMapsCoords] = useState({
    lat: 40.95,
    lng: 30.33,
  });

  const router = useRouter();

  const { location, type } = router.query;

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

  const onMapChange = async () => {
    try {
      setLoading(true);
      const markersItems = await firestoreSpotsService
        .getAllSpotsInMapViewport(bounds);
      setMarkerPoints(markersItems.map((s) => ({
        id: s.id,
        lat: s.lat,
        lng: s.lng,
        divesCount: s.dives,
        name: s.name,
        averageDepth: s.averageDepth,
      })));
      setSpots(markersItems);
      setLoading(false);
    } catch (message) {
      setLoading(false);
      notify(message);
    }
  };

  useDebounce(searchQuery, setInputRegion, 1000);
  useDebounce(bounds, onMapChange, 1500);

  const fetchRegions = async () => {
    if (inputRegion && isFetch) {
      try {
        const res = await firestoreGeoDataService.getGeonames(inputRegion);
        setRegions(res);
      } catch (e) {
        notify('Geonames is not found');
      }
    }
  };

  useEffect(() => {
    if (inputRegion) {
      fetchRegions();
      setIsFetch(true);
    }
  }, [inputRegion]);

  const searchArea = async (geo, item) => {
    let area;

    if (item.name) {
      setRegion({ ...region, name: item.name });
    }
    if (geo.areaRef) {
      try {
        area = await firestoreGeoDataService.getAreaByRef(geo.areaRef);
        setRegion({ area, name: item.name });
      } catch (e) {
        notify('Area is not found');
      }
    }
    if (geo?.coords) {
      const { lat } = geo.coords;
      const { lng } = geo.coords;
      setMapsCoords({
        lat,
        lng,
      });
      if (!area) {
        try {
          area = await firestoreGeoDataService.getAreaByCoords(geo.coords);
        } catch (e) {
          notify('Area is not found');
        }
      }
    }
    setRegion({ area, name: item.name });
    setIsFetch(false);
  };

  const searchHandler = async (item) => {
    setSearchQuery(item.name);
    setRegions([]);
    router.push(`/explore?location=${item.geonameRef.id}&type=${activeTab}`);
  };

  useEffect(() => {
    (async () => {
      if (location && type) {
        setRegions([]);
        const tab = type as string;
        setActiveTab(tab.charAt(0).toUpperCase() + tab.slice(1));
        try {
          const res = await firestoreGeoDataService.getGeonameById(location as string);
          await searchArea(res, { name: res.name });
        } catch (e) {
          notify('Location is not found');
        }
      }
    })();
  }, [location, type]);

  const renderInput = (
    <SearchAnimatedInput
      value={searchQuery}
      setValue={(val) => {
        setSearchQuery(val);
      }}
      withBackArrow
      onClick={() => {
        setIsFetch(true);
        fetchRegions();
      }}
      onBackClick={() => router.back()}
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

  const searchRef = useRef(null);

  useOutsideClick(() => setRegions([]), searchRef);

  const {
    userAuth,
  } = useContext(AuthStatusContext);

  const convertTempSystem = (value: number): string => {
    if (!userAuth) {
      return `${value ? value?.toFixed(2) : 0} ºC`;
    }
    const userUnitSystem = userAuth.settings.preferences.unitSystem;
    if (userUnitSystem === 'IMPERIAL') {
      return `${value ? convertCalToFar(value)?.toFixed(2) : 0} ºF`;
    }
    return `${value ? value?.toFixed(2) : 0} ºC`;
  };

  const convertDepth = (value): string => {
    if (!userAuth) {
      return `${value ? value?.toFixed(2) : 0} m`;
    }
    const userUnitSystem = userAuth.settings.preferences.unitSystem;
    if (userUnitSystem === 'IMPERIAL') {
      return `${value ? convertMetersToFeet(value)?.toFixed(2) : 0} ft`;
    }
    return `${value ? value?.toFixed(2) : 0} m`;
  };

  return (
    <div className={`${styles.wrapper} ${styles['min-height-wrapper']}`}>
      <div className={styles.sidebar} id="sidebar" onTouchEnd={handleSidebar}>
        {!isMobile && <div ref={searchRef}>{renderInput}</div>}
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
              <span
                key={spot.id}
                onClick={() => router.push(`spot/${spot.id}`)}
              >
                <SpotCard
                  region={spot.location?.region}
                  name={spot.name}
                  depth={spot.averageDepth?.depth || ''}
                  imgSrc={spot.bestPictures?.length ? spot.bestPictures[0] : '/images/fish.jpg'}
                  country={spot.location?.country}
                />
              </span>
            ))}
          </>
          )}
          {/* {activeTab === 'Shops' && fakeShops.map((shop, index) => ( */}
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
              <h1>{region?.name}</h1>
              {/* <FavoritesBlock isFavorite={false} count={0} /> */}
            </div>
            { region?.area && (
            <div className={styles.subtitle}>
              <Icon iconName="stats" size={24} />
              Stats
            </div>
            ) }
            {region?.area && (
            <div className={styles.stats}>
              <span>
                Average depth:
                {' '}
                <b>{convertDepth(region.area.averageDepth)}</b>
              </span>
              <span>
                Average temperature on bottom:
                {' '}
                <b>{convertTempSystem(region.area.averageTemperatureOnBottom)}</b>
              </span>
              <span>
                Average temperature on surface:
                {' '}
                <b>{convertTempSystem(region.area.averageTemperatureOnSurface)}</b>
              </span>
            </div>
            )}
            {region?.area && (
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
                    region.area.january,
                    region.area.february,
                    region.area.march,
                    region.area.april,
                    region.area.may,
                    region.area.june,
                    region.area.july,
                    region.area.august,
                    region.area.september,
                    region.area.october,
                    region.area.november,
                    region.area.december,
                  ],
                }]}
              />
            </>
            )}
            {!!region?.area?.species?.length && (
            <>
              <div className={styles.subtitle}>
                <Icon iconName="species-octopus" size={24} />
                Species
              </div>
              <div className={styles.species}>
                {region.area.species.slice(0, 4).map((fish) => (
                  <Image
                    src={`/species/${fish.category}.svg`}
                    layout="intrinsic"
                    height={85}
                    width={75}
                  />
                ))}
              </div>
            </>
            )}
          </>
          )}
        </div>
      </div>
      <div className={styles.map} id="map">
        <ExploreMap
          coords={mapCoords}
          zoom={zoom}
          points={markerPoints}
          isMobile={isMobile}
          renderInput={<div ref={searchRef}>{renderInput}</div>}
          onMapChange={(e) => setBounds({
            ne: e.bounds.ne,
            sw: e.bounds.sw,
          })}
          isLoading={isLoading}
          setZoom={setZoom}
        />
      </div>
    </div>
  );
};

export default ExploreBlock;
