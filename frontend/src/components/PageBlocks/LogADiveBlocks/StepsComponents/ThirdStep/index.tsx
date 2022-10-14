import React, {
  FC, useContext, useEffect, useMemo, useState,
} from 'react';
import { LogADiveDiveMap } from './NewDiveMap';
import { StepsNavigation } from '../../StepsNavigation';
import { ButtonGroup } from '../../../../ButtonGroup';
import { Input } from '../../../../Input/CommonInput';
import { Button } from '../../../../Buttons/Button';
import { Icon } from '../../../../Icons/Icon';
import { LogDiveDataContext } from '../../LogDiveData/logDiveContext';
import {
  createNewSpotData,
  createNewSpotHandler,
} from './thirdStepHelpers';
import { useUserLocation } from '../../../../../hooks/useUserLocation';
import { MarkerType, StepProps } from '../../types/commonTypes';
import { ThirdStepType } from '../../types/stepTypes';
import styles from './styles.module.scss';
import {
  firestoreGeoDataService,
} from '../../../../../firebase/firestore/firestoreServices/firestoreGeoDataService';
import { SearchedItems } from '../../../../Dropdown/SearchedItems';

import { Loader } from '../../../../Loader';

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
    divesCount: 17,
    lat: 42.95,
    lng: 21.33,
    diveName: 'Super',
  }, {
    id: 4,
    divesCount: 5,
    lat: 34.95,
    lng: 34.33,
    diveName: 'some super point',
  }, {
    id: 5,
    divesCount: 1,
    lat: 60.9492599249929,
    lng: -3.882438943562335,
    diveName: 'northeast',
  }, {
    id: 6,
    divesCount: 2,
    lat: 51.91554124927487,
    lng: -21.349982931437665,
    diveName: 'southwest',
  },
];

export const ThirdStep: FC<StepProps> = ({
  step,
  setStep,
}) => {
  const { setStepData } = useContext(LogDiveDataContext);
  const userLocation = useUserLocation();
  const [location, setLocation] = useState({
    lat: 41.5,
    lng: 30.33,
  });
  const [newSpotName, setNewSpotName] = useState('');
  const [newSpotNameError, setNewSpotNameError] = useState('');

  const [newSpotCountry, setNewSpotCountry] = useState('');
  const [newSpotCountryError, setNewSpotCountryError] = useState('');

  const [newSpotRegion, setNewSpotRegion] = useState('');
  const [newSpotRegionError, setNewSpotRegionError] = useState('');

  const [newSpotLocation, setNewSpotLocation] = useState('');
  const [newSpotLocationError, setNewSpotLocationError] = useState('');

  const [markers, setMarkers] = useState<MarkerType[]>(markerPoints);

  const [createSpotMode, setCreateSpotMode] = useState(false);
  const [newPointCoords, setNewPointCoords] = useState({
    lat: location.lat,
    lng: location.lng,
  });

  const [zoom, setZoom] = useState(5);
  const [loading, setLoading] = useState(false);
  console.log({ zoom });
  // useEffect(() => {
  //   (async () => {
  //     const res = await getGeoDataByCoords(newPointCoords);
  //     console.log('GEO RES', res);
  //     // const loc = await getLocation('ChIJ9f-dgJ14AHARMp45pd8HMhs');
  //     // console.log('GEO Loc', loc);
  //   })();
  // }, [newPointCoords]);

  const buttons = useMemo(() => markers.map((item) => ({
    connectedMode: item.diveName,
    text: item.diveName,
  })), [markers]);

  const [chosenPointId, setChosenPointId] = useState<string>(null);

  const thirdStepData: ThirdStepType = {
    spotId: '',
  };

  useEffect(() => {
    if (userLocation) {
      setLocation(userLocation);
    }
  }, [userLocation]);

  // useEffect(() => {
  //   (async () => {
  //     const res = await firestoreGeoDataService.getCountryByCoordinates(newPointCoords);
  //     console.log('coontries', { res });
  //   })();
  // }, [newPointCoords]);

  // useEffect(() => {
  //   if (!newPoint) {
  //     // get coords // todo
  //     // get points
  //     setCoords(mapCoords);
  //   }
  // }, [region, newPoint]);

  const newSpotHandler = createNewSpotHandler(
    setNewSpotNameError,
    setNewSpotCountryError,
    setNewSpotRegionError,
    setNewSpotLocationError,
    setLoading,
    setCreateSpotMode,
  );

  if (step !== 3) {
    return null;
  }

  return (
    <>
      <div className={styles.thirdStep}>
        <h2>
          Dive Site
        </h2>

        <LogADiveDiveMap
          location={location}
          setLocation={setLocation}
          points={markers}
          zoom={zoom}
          setZoom={setZoom}
          newPoint={createSpotMode}
          setNewPoint={setCreateSpotMode}
          setNewPointCoords={setNewPointCoords}
        />

        {!createSpotMode && (
          <div className={styles.pointsBtnGroup}>
            <ButtonGroup
              buttons={
                buttons
              }
              onClick={() => {
              }}
              defaultChecked={newSpotName}
            />
          </div>
        )}

        {createSpotMode && (
          <div className={styles.newSpotGroup}>
            <h2>
              New Spot
            </h2>

            <div className={styles.newSpotInputWrapper}>
              <Input
                value={newSpotName}
                setValue={setNewSpotName}
                placeholder="Spot Name"
                height={48}
                width={720}
                error={newSpotNameError}
                setError={setNewSpotNameError}
              />
              <div className={styles.countryInputWrapper}>
                <Input
                  value={newSpotCountry}
                  setValue={setNewSpotCountry}
                  placeholder="Country"
                  height={48}
                  width={720}
                  error={newSpotCountryError}
                  setError={setNewSpotCountryError}
                />

                <SearchedItems
                  value={newSpotCountry}
                  setValue={setNewSpotCountry}
                  onSearchHandler={firestoreGeoDataService.getCountries}
                />
              </div>
              <div className={styles.countryInputWrapper}>
                <Input
                  value={newSpotRegion}
                  setValue={setNewSpotRegion}
                  placeholder="Region"
                  height={48}
                  width={720}
                  error={newSpotRegionError}
                  setError={setNewSpotRegionError}
                />

                {/* <SearchedItems */}
                {/*   value={newSpotRegion} */}
                {/*   setValue={setNewSpotRegion} */}
                {/*   onSearchHandler={firestoreGeoDataService.getCountries} */}
                {/* /> */}
              </div>
              <div className={styles.countryInputWrapper}>
                <Input
                  value={newSpotLocation}
                  setValue={setNewSpotLocation}
                  placeholder="Location"
                  height={48}
                  width={720}
                  error={newSpotLocationError}
                  setError={setNewSpotLocationError}
                />

                {/* <SearchedItems */}
                {/*   value={newSpotCountry} */}
                {/*   setValue={setNewSpotCountry} */}
                {/*   onSearchHandler={firestoreGeoDataService.getCountries} */}
                {/* /> */}
              </div>

            </div>
            <span className={styles.explanationText}>
              Drag the on
              {' '}
              <Icon iconName="new-point" size={24} />
              {' '}
              the map to the right location.
            </span>
            <div className={styles.buttonWrapper}>
              <Button
                width={250}
                height={56}
                borderRadius={30}
                backgroundColor="#F4BF00"
                border="none"
                onClick={async () => {
                  await newSpotHandler(
                    createNewSpotData(
                      newSpotName,
                      newSpotCountry,
                      newSpotRegion,
                      newSpotLocation,
                      newPointCoords,
                      zoom,
                    ),
                  );
                  setNewSpotName('');
                  setNewSpotCountry('');
                  setNewSpotRegion('');
                  setNewSpotLocation('');
                }}
              >
                <Loader loading={loading} />
                <span className={styles.saveBtn}>Save</span>

              </Button>
            </div>

          </div>
        )}
      </div>
      <StepsNavigation
        setStep={setStep}
        setStepData={() => {
          setStepData(3, thirdStepData);
        }}
      />
    </>
  );
};
