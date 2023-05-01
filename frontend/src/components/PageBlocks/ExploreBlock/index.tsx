import React, {
  FC, useContext, useEffect, useRef, useState,
} from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import supercluster from 'points-cluster';
import styles from './styles.module.scss';
import { SearchAnimatedInput } from '../../Input/SearchAnimatedInput';
import SpotCard from './SpotCard';
import { Icon } from '../../Icons/Icon';
import { ExploreMap } from './ExploreMap';
import { firestoreGeoDataService } from '../../../firebase/firestore/firestoreServices/firestoreGeoDataService';
import { useDebounce } from '../../../hooks/useDebounce';
import { SearchDropdownPanel } from '../../Dropdown/SearchedItems/SearchDropdownPanel';
import { useOutsideClick } from '../../../hooks/useOutsideClick';
import { AuthStatusContext } from '../../../layouts/AuthLayout';
import {
  convertExploreDepthSystem,
  convertExploreTempSystem,
} from '../../../utils/unitSystemConverter';
import { notify } from '../../../utils/notify';
import { firestoreSpotsService } from '../../../firebase/firestore/firestoreServices/firestoreSpotsService';

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

const mapCoordsArr = [
  { lat: -21.7, lng: 145.2, zoom: 5 },
  { lat: 20.29, lng: -156.56, zoom: 8 },
  { lat: 27.82, lng: -81.43, zoom: 6 },
  { lat: 14.94, lng: -65.62, zoom: 6 },
  { lat: 18.48, lng: -85.96, zoom: 7 },
  { lat: 27.13, lng: 33.79, zoom: 7 },
];

const ExploreBlock: FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [touchStartY, setTouchStartY] = useState(null);
  const [bounds, setBounds] = useState(null);
  const [clusters, setClusters] = useState([]);

  const [zoom, setZoom] = useState(11);
  const [inputRegion, setInputRegion] = useState(null);
  const [isFetch, setIsFetch] = useState(true);
  const [regions, setRegions] = useState([]);
  const [region, setRegion] = useState(undefined);
  const [spots, setSpots] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const [mapCoords, setMapsCoords] = useState<{ lat: number, lng: number }>(mapCoordsArr[0]);

  useEffect(() => {
    const { lat, lng, zoom: initZoom } = mapCoordsArr[
      Math.floor(Math.random() * mapCoordsArr.length)
    ];
    setMapsCoords({ lat, lng });
    setZoom(initZoom);
  }, []);

  const router = useRouter();

  const { location, type } = router.query;

  const handleSidebar = (e): void => {
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

  const getClusters = (props, markersItems) => {
    const superClusters = supercluster(markersItems, {
      minZoom: 0,
      maxZoom: 16,
      radius: 50,
    });
    return superClusters({ bounds: props.bounds, zoom: props.zoom });
  };

  const onMapChange = async (e) => {
    try {
      setLoading(true);
      if (zoom < e.zoom) {
        setClusters(getClusters(e, spots));
      } else {
        const markersItems = await firestoreSpotsService
          .getAllSpotsInMapViewport(e.bounds, 3000);
        const { lat, lng } = e.center;
        const area = await firestoreGeoDataService.getAreaByCoords({ lat, lng });
        setRegion(() => ({ area, name: area?.regionName }));
        setSpots(() => markersItems);
        setClusters(getClusters(e, markersItems));
      }
      setZoom(e.zoom);
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

  const searchArea = async (geo) => {
    if (geo?.coords) {
      const { lat } = geo.coords;
      const { lng } = geo.coords;
      setMapsCoords({
        lat,
        lng,
      });
    }
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
          await searchArea(res);
        } catch (e) {
          notify(e.message);
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
                  imgSrc={Object.keys(spot.bestPictures)[0] || null}
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
                <b>{convertExploreDepthSystem(userAuth, region.area.averageDepth)}</b>
              </span>
              <span>
                Average temperature on bottom:
                {' '}
                <b>{convertExploreTempSystem(userAuth, region.area.averageTemperatureOnBottom)}</b>
              </span>
              <span>
                Average temperature on surface:
                {' '}
                <b>{convertExploreTempSystem(userAuth, region.area.averageTemperatureOnSurface)}</b>
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
          isMobile={isMobile}
          renderInput={<div ref={searchRef}>{renderInput}</div>}
          onMapChange={setBounds}
          clusters={clusters}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default ExploreBlock;
