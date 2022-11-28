import React, {
  FC, useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import { LogADiveDiveMap } from './NewDiveMap';
import { StepsNavigation } from '../../StepsNavigation';
import { ButtonGroup } from '../../../../ButtonGroup';
import { LogDiveDataContext } from '../../LogDiveData/logDiveContext';
import { useUserLocation } from '../../../../../hooks/useUserLocation';
import { MarkerType, StepProps } from '../../types/commonTypes';
import { ThirdStepType } from '../../types/stepTypes';
import { CreateNewSpot } from './CreateNewSpot';
import styles from './styles.module.scss';
import { firestoreSpotsService } from '../../../../../firebase/firestore/firestoreServices/firestoreSpotsService';
import { setStepErrors } from '../../LogDiveHelpers/stepsErrors/setStepErrors';
import { ThirdStepErrors } from '../../types/errorTypes';

export const ThirdStep: FC<StepProps> = ({
  step,
  setStep,
}) => {
  const { setStepData, getStepData } = useContext(LogDiveDataContext);
  const [data, setData] = useState<ThirdStepType>(undefined);
  const userLocation = useUserLocation();
  const [location, setLocation] = useState({
    lat: 41.5,
    lng: 30.33,
  });
  const [newSpotName, setNewSpotName] = useState('');

  const [markers, setMarkers] = useState<MarkerType[]>([]);

  const [createSpotMode, setCreateSpotMode] = useState(false);
  const [newPointCoords, setNewPointCoords] = useState({
    lat: location.lat,
    lng: location.lng,
  });

  const [zoom, setZoom] = useState(5);

  const [clickedPoint, setClickedPoint] = useState('');

  const createdNewSpotId = useRef<string>();

  const buttons = useMemo(() => markers.map((item) => ({
    connectedMode: item.name,
    text: item.name,
  })), [markers]);

  useEffect(() => {
    if (userLocation) {
      setLocation(userLocation);
    }
  }, [userLocation]);

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
        setClickedPoint(spot.name);
      }
    })();
  }, [step]);

  const [spotError, setSpotError] = useState<ThirdStepErrors>({
    spotError: '',
  });

  const setErrors = () => setStepErrors({
    stepType: 3,
    data: data.spotId,
    errors: spotError,
    setErrors: setSpotError,
  });

  if (step !== 3) {
    return null;
  }

  return (
    <>
      <div className={styles.thirdStep}>
        <h2>Dive Site</h2>

        <LogADiveDiveMap
          location={location}
          setLocation={setLocation}
          markers={markers}
          setMarkers={setMarkers}
          zoom={zoom}
          setZoom={setZoom}
          newPoint={createSpotMode}
          setNewPoint={setCreateSpotMode}
          setNewPointCoords={setNewPointCoords}
          createdNewSpotId={createdNewSpotId.current}
          setChosenPointId={(res) => setData({ spotId: res })}
          setButton={setClickedPoint}
          disableError={() => setSpotError({ spotError: '' })}
        />
        {spotError.spotError && <span className="error-text">Choose spot</span>}
        {!createSpotMode && (
          <div className={styles.pointsBtnGroup}>
            <ButtonGroup
              buttons={buttons}
              onClick={(buttonName) => {
                const spot = markers.find((item) => item.name === buttonName);
                setData({ spotId: spot.id });
                setSpotError({ spotError: '' });
              }}
              defaultChecked={newSpotName || clickedPoint}
            />
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
          />
        )}
      </div>
      <StepsNavigation
        setStep={setStep}
        setErrors={setErrors}
        setStepData={() => {
          setStepData(3, data);
        }}
      />
    </>
  );
};
