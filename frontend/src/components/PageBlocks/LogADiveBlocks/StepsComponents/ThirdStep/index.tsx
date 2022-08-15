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
import { MarkerType, StepProps } from '../../types/commonTypes';
import { ThirdStepType } from '../../types/stepTypes';
import styles from './styles.module.scss';
import { useUserLocation } from '../../../../../hooks/useUserLocation';

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
  }];

export const ThirdStep: FC<StepProps> = ({
  step,
  setStep,
}) => {
  const { setStepData } = useContext(LogDiveDataContext);
  const userLocation = useUserLocation();
  const [location, setLocation] = useState({
    lat: 8.379433,
    lng: 31.16558,
  });
  const [newSpotName, setNewSpotName] = useState('');
  const [newSpotNameError, setNewSpotNameError] = useState('');

  const [markers, setMarkers] = useState<MarkerType[]>(markerPoints);

  const [newPoint, setNewPoint] = useState(false);
  const [newPointCoords, setNewPointCoords] = useState({
    lat: location.lat,
    lng: location.lng,
  });

  const buttons = useMemo(() => markers.map((item) => ({
    connectedMode: item.diveName,
    text: item.diveName,
  })), [markers]);

  const [chosenPoint, setChosenPoint] = useState<MarkerType>();

  const thirdStepData: ThirdStepType = {
    spot: chosenPoint && {
      name: chosenPoint.diveName,
      lng: chosenPoint.lng,
      lat: chosenPoint.lat,
    },
  };

  useEffect(() => {
    if (userLocation) setLocation(userLocation);
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
          zoom={4}
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
                  setNewPointHandler(newSpotName, newPointCoords);
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
