import React, {
  FC, useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import { LogADiveDiveMap } from './NewDiveMap';
import { StepsNavigation } from '../../StepsNavigation';
import { LogDiveDataContext } from '../../LogDiveData/logDiveContext';
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

  const [location, setLocation] = useState(null);
  const [newSpotName, setNewSpotName] = useState('');
  const [defaultSpot, setDefaultSpot] = useState(null);
  const [bounds, setBounds] = useState<Bounds>(undefined);

  const [markers, setMarkers] = useState<MarkerType[]>([]);

  const [createSpotMode, setCreateSpotMode] = useState(false);
  const [newPointCoords, setNewPointCoords] = useState({
    lat: location?.lat,
    lng: location?.lng,
  });

  const [zoom, setZoom] = useState(9);

  const createdNewSpotId = useRef<string>();

  const buttons = useMemo(() => markers.map((item) => ({
    connectedMode: item.name,
    text: item.name,
    id: item.id,
  })), [markers]);

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
        setDefaultSpot({
          id: spotId,
          text: spot.name,
        });
        setLocation({ lat: spot.lat, lng: spot.lng });
      } else {
        setLocation({
          lat: 34.984307835835764,
          lng: 33.18749703019114,
        });
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
          setMarkers={setMarkers}
          zoom={zoom}
          setZoom={setZoom}
          newPointCoords={newPointCoords}
          newPoint={createSpotMode}
          setNewPoint={setCreateSpotMode}
          setNewPointCoords={setNewPointCoords}
          createdNewSpotId={createdNewSpotId.current}
        />
        {!createSpotMode && (
          <div className={styles.pointsBtnGroup}>
            {defaultSpot?.id && (
            <Button
              button={defaultSpot}
              onClick={() => {}}
              defaultBtnId={defaultSpot.id}
            />
            )}
            {buttons.map((btn) => (
              <Button
                button={btn}
                onClick={(button) => {
                  const newMarkers = markers.filter((item) => item.id !== button.id);
                  setMarkers(newMarkers);
                  setDefaultSpot(button);
                  setData({ spotId: button.id });
                }}
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
            }}
            setData={({ id, text }) => {
              setData({ spotId: id });
              setDefaultSpot({ id, text });
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
