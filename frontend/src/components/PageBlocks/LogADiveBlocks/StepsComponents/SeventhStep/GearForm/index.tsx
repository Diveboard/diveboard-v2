import React, { FC } from 'react';

import { Dropdown } from '../../../../../Dropdown/Dropdawn';
import { Input } from '../../../../../Input/CommonInput';
import { DatePickerInput } from '../../../../../Input/DatePickerInput';
import { Icon } from '../../../../../Icons/Icon';
import { GearType, SetGearParametersType } from '../../../types/commonTypes';
import styles from '../styles.module.scss';

type Props = GearType & SetGearParametersType;

const gears = [
  'BCD',
  'Boots',
  'Camera',
  'Compass',
  'Computer',
  'Cylinder',
  'Dive skin',
  'Dry Suit',
  'Fins',
  'Gloves',
  'Hood',
  'Knife',
  'Lift Bag',
  'Light',
  'Mask',
  'Other',
  'Rebreather',
  'Regulator',
  'Scooter',
  'Wet suit',
];

export const GearForm: FC<Props> = ({
  typeOfGear,
  dateAcquired,
  lastMaintenance,
  model,
  manufacturer,
  setGearParameters,
}) => {
  const {
    setManufacturer,
    setTypeOfGear,
    deleteGear,
    setLastMaintenance,
    setModel,
    setDateAcquired,
  } = setGearParameters;
  return (
    <div className={styles.inputsWrapper}>
      <span onClick={deleteGear} className={styles.delete}>
        <Icon iconName="close" width={12} height={12} />
      </span>
      <Dropdown
        item={typeOfGear}
        setItem={setTypeOfGear}
        allItems={gears}
        height={48}
        width={420}
      />
      <Input
        type="text"
        value={manufacturer}
        height={48}
        width={420}
        placeholder="Manufacturer"
        setValue={setManufacturer}
      />
      <Input
        type="text"
        value={model}
        height={48}
        width={420}
        placeholder="Model"
        setValue={setModel}
      />
      <div className={styles.dateWrapper}>
        <DatePickerInput
          date={dateAcquired}
          setDate={(val) => setDateAcquired(val)}
          placeholder="Date Acquired"
        />
        <DatePickerInput
          date={lastMaintenance}
          setDate={(val) => setLastMaintenance(val)}
          placeholder="Last Maintenance"
        />
      </div>
    </div>
  );
};
