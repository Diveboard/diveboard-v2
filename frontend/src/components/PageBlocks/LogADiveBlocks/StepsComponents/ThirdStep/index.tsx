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
  usePointsHandlers,
} from './thirdStepHelpers';
import { useUserLocation } from '../../../../../hooks/useUserLocation';
import { MarkerType, StepProps } from '../../types/commonTypes';
import { ThirdStepType } from '../../types/stepTypes';
import styles from './styles.module.scss';
import {
  firestoreGeoDataService,
} from '../../../../../firebase/firestore/firestoreServices/firestoreGeoDataService';
import { SearchedItems } from '../../../../Dropdown/SearchedItems';

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
    lat: 47.092,
    lng: 18.5205015,
    diveName: 'northeast',
  }, {
    id: 6,
    divesCount: 2,
    lat: 35.4929201,
    lng: 6.6267201,
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

  const [markers, setMarkers] = useState<MarkerType[]>(markerPoints);

  const [newPoint, setNewPoint] = useState(false);
  const [newPointCoords, setNewPointCoords] = useState({
    lat: location.lat,
    lng: location.lng,
  });

  const [zoom, setZoom] = useState(5);

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

  const [chosenPoint, setChosenPoint] = useState<MarkerType>();

  const thirdStepData: ThirdStepType = {
    spot: chosenPoint && {
      name: chosenPoint.diveName,
      country: newSpotCountry,
      lng: chosenPoint.lng,
      lat: chosenPoint.lat,
    },
  };

  useEffect(() => {
    if (userLocation) {
      setLocation(userLocation);
    }
  }, [userLocation]);

  // useEffect(() => {
  //   if (!newPoint) {
  //     // get coords // todo
  //     // get points
  //     setCoords(mapCoords);
  //   }
  // }, [region, newPoint]);

  const {
    setPointHandler,
    setNewPointHandler,
  } = usePointsHandlers(
    markers,
    setChosenPoint,
    setMarkers,
    setNewPoint,
    setNewSpotNameError,
    setNewSpotCountryError,
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
          newPoint={newPoint}
          setNewPoint={setNewPoint}
          setNewPointCoords={setNewPointCoords}
        />

        {!newPoint && (
          <div className={styles.pointsBtnGroup}>
            <ButtonGroup
              buttons={
                buttons
              }
              onClick={setPointHandler}
              defaultChecked={newSpotName}
            />
          </div>
        )}

        {newPoint && (
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
                onClick={() => {
                  setNewPointHandler(newSpotName, newSpotCountry, newPointCoords);
                }}
              >
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
