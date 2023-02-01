import React, { FC, useRef, useState } from 'react';
import styles from '../styles.module.scss';
import { Icon } from '../../../../../Icons/Icon';
import { Input } from '../../../../../Input/CommonInput';
import { SearchedItems } from '../../../../../Dropdown/SearchedItems';
import {
  firestoreGeoDataService,
} from '../../../../../../firebase/firestore/firestoreServices/firestoreGeoDataService';
import { Button } from '../../../../../Buttons/Button';
import { createNewSpotData, createNewSpotHandler } from '../thirdStepHelpers';
import { Loader } from '../../../../../Loader';
import { Bounds, Coords } from '../../../../../../types';

type Props = {
  newSpotName: string;
  setNewSpotName: React.Dispatch<React.SetStateAction<string>>;
  setCreateSpotMode: React.Dispatch<React.SetStateAction<boolean>>;
  createdNewSpotId: React.MutableRefObject<string>
  newPointCoords: { lat: number, lng: number };
  zoom: number;
  setBounds?: (bounds: Bounds) => void;
  setLocation?: (bounds: Coords) => void;
  setData: (id: string) => void;
};

export const CreateNewSpot: FC<Props> = ({
  newSpotName,
  setNewSpotName,
  setCreateSpotMode,
  newPointCoords,
  zoom,
  createdNewSpotId,
  setBounds,
  setLocation,
  setData,
}) => {
  const [newSpotNameError, setNewSpotNameError] = useState('');

  const [newSpotCountry, setNewSpotCountry] = useState('');
  const [newSpotCountryError, setNewSpotCountryError] = useState('');

  const [newSpotRegion, setNewSpotRegion] = useState('');
  const [newSpotRegionError, setNewSpotRegionError] = useState('');

  const [newSpotLocation, setNewSpotLocation] = useState('');
  const [newSpotLocationError, setNewSpotLocationError] = useState('');

  const [loading, setLoading] = useState(false);

  const newSpotHandler = createNewSpotHandler(
    setNewSpotNameError,
    setNewSpotCountryError,
    setNewSpotRegionError,
    setNewSpotLocationError,
    setLoading,
    setCreateSpotMode,
  );
  const countryDropdownRef = useRef(null);
  const regionDropdownRef = useRef(null);
  const locationDropdownRef = useRef(null);

  return (
    <div>
      <div className={styles.newSpotGroup}>
        <span className={styles.backButton} onClick={() => { setCreateSpotMode(false); }}>
          <Icon iconName="left-arrow" />
          back
        </span>

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
          <div className={styles.countryInputWrapper} ref={countryDropdownRef}>
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
              setBounds={setBounds}
              searchRef={countryDropdownRef}
            />
          </div>
          <div className={styles.countryInputWrapper} ref={regionDropdownRef}>
            <Input
              value={newSpotRegion}
              setValue={setNewSpotRegion}
              placeholder="Region"
              height={48}
              width={720}
              error={newSpotRegionError}
              setError={setNewSpotRegionError}
            />

            <SearchedItems
              searchRef={regionDropdownRef}
              value={newSpotRegion}
              setValue={setNewSpotRegion}
              onSearchHandler={firestoreGeoDataService.getRegions}
              setBounds={setBounds}
            />
          </div>
          <div className={styles.countryInputWrapper} ref={locationDropdownRef}>
            <Input
              value={newSpotLocation}
              setValue={setNewSpotLocation}
              placeholder="Location"
              height={48}
              width={720}
              error={newSpotLocationError}
              setError={setNewSpotLocationError}
            />

            <SearchedItems
              searchRef={locationDropdownRef}
              value={newSpotLocation}
              setValue={setNewSpotLocation}
              onSearchHandler={firestoreGeoDataService.getGeonames}
              setLocation={setLocation}
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
            onClick={async () => {
              if (!newSpotName) {
                setNewSpotNameError('This field is required');
              }
              if (!newSpotCountry) {
                setNewSpotCountryError('This field is required');
              }
              if (!newSpotLocation) {
                setNewSpotLocationError('This field is required');
              }
              if (!newSpotRegion) {
                setNewSpotRegionError('This field is required');
              }
              if (newSpotName
                  && newSpotCountry
                  && newSpotLocation
                  && newSpotRegion
                  && newPointCoords
              ) {
                createdNewSpotId.current = await newSpotHandler(
                  createNewSpotData(
                    newSpotName,
                    newSpotCountry,
                    newSpotRegion,
                    newSpotLocation,
                    newPointCoords,
                    zoom,
                  ),
                );
                setData(createdNewSpotId.current);
                setNewSpotName('');
              }
            }}
          >
            <Loader loading={loading} />
            <span className={styles.saveBtn}>Save</span>
          </Button>
        </div>

      </div>
    </div>
  );
};
