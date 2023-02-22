import React, {
  FC, useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import { LogADiveDiveMap } from './NewDiveMap';
import { StepsNavigation } from '../../StepsNavigation';
import { LogDiveDataContext } from '../../LogDiveData/logDiveContext';
import { useUserLocation } from '../../../../../hooks/useUserLocation';
import { MarkerType, StepProps } from '../../types/commonTypes';
import { ThirdStepType } from '../../types/stepTypes';
import { CreateNewSpot } from './CreateNewSpot';
import styles from './styles.module.scss';
import { firestoreSpotsService } from '../../../../../firebase/firestore/firestoreServices/firestoreSpotsService';
import { StepsIndicator } from '../../StepsIndicator';
import { Bounds } from '../../../../../types';
import { Button } from '../../../../ButtonGroup/Button';

export const ThirdStep: FC<StepProps> = ({
  step,
  setStep,
}) => {
  const { setStepData, getStepData } = useContext(LogDiveDataContext);
  const [data, setData] = useState<ThirdStepType>(null);
  const userLocation = useUserLocation();
  const [location, setLocation] = useState({
    lat: 41.5,
    lng: 30.33,
  });
  const [newSpotName, setNewSpotName] = useState('');
  const [bounds, setBounds] = useState<Bounds>(undefined);

  const [markers, setMarkers] = useState<MarkerType[]>([]);

  const [createSpotMode, setCreateSpotMode] = useState(false);
  const [newPointCoords, setNewPointCoords] = useState({
    lat: location.lat,
    lng: location.lng,
  });

  const [zoom, setZoom] = useState(5);

  // const [clickedPoint, setClickedPoint] = useState('');

  const createdNewSpotId = useRef<string>();

  const buttons = useMemo(() => markers.map((item) => ({
    connectedMode: item.name,
    text: item.name,
    id: item.id,
  })), [markers]);

  useEffect(() => {
    if (userLocation && !data?.spotId) {
      setLocation(userLocation);
    }
  }, [userLocation, data]);

  useEffect(() => {
    if (!createSpotMode && newSpotName && markers.length) {
      const spot = markers.find((item) => item.name === newSpotName);
      if (spot) {
        setData({ spotId: spot.id });
      }
    }
  }, [createSpotMode, step, markers]);

  useEffect(() => {
    const { spotId } = getStepData(3) as ThirdStepType;
    setData({ spotId });
    (async () => {
      if (spotId) {
        const spot = await firestoreSpotsService.getSpotById(
          spotId,
        );
        setLocation({ lat: spot.lat, lng: spot.lng });
        // setClickedPoint(spot.name);
      }
    })();
  }, [step]);

  if (step !== 3) {
    return null;
  }

  return (
    <>
      <StepsIndicator
        step={step}
        setStep={setStep}
        setStepData={() => setStepData(3, data)}
      />
      <div className={styles.thirdStep}>
        <h2>Dive Site</h2>

        <LogADiveDiveMap
          boundsCoors={bounds}
          location={location}
          setLocation={setLocation}
          // markers={markers}
          setMarkers={setMarkers}
          zoom={zoom}
          setZoom={setZoom}
          newPointCoords={newPointCoords}
          newPoint={createSpotMode}
          setNewPoint={setCreateSpotMode}
          setNewPointCoords={setNewPointCoords}
          createdNewSpotId={createdNewSpotId.current}
          // setChosenPointId={(res) => setData({ spotId: res })}
          // setButton={setClickedPoint}
        />
        {!createSpotMode && (
          <div className={styles.pointsBtnGroup}>
            {buttons.map((btn) => (
              <Button
                button={btn}
                onClick={(button) => {
                  const spot = markers.find((item) => item.id === button);
                  setData({ spotId: spot.id });
                }}
                defaultBtnId={data.spotId}
              />
            ))}
          </div>
        )}

        {createSpotMode && (
          <CreateNewSpot
            setNewSpotName={setNewSpotName}
            newSpotName={newSpotName}
            createdNewSpotId={createdNewSpotId}
            setCreateSpotMode={setCreateSpotMode}
            newPointCoords={newPointCoords}
            zoom={zoom}
            setBounds={setBounds}
            setLocation={(loc) => {
              setNewPointCoords(loc);
              setLocation(loc);
              // setClickedPoint(newSpotName);
            }}
            setData={(id) => {
              setData({ spotId: id });
            }}
          />
        )}
      </div>
      <StepsNavigation
        setStep={setStep}
        setStepData={() => setStepData(3, data)}
      />
    </>
  );
};
