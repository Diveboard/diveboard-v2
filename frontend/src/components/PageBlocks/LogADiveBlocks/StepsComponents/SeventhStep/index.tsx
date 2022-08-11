import React, { FC, useContext, useState } from 'react';
import { StepProps } from '../../types/commonTypes';
import { LogDiveDataContext } from '../../LogDiveData/logDiveContext';
import styles from './styles.module.scss';
import { StepsNavigation } from '../../StepsNavigation';
import { Dropdown } from '../../../../Dropdown/Dropdawn';
import { Input } from '../../../../Input/CommonInput';
import { DatePickerInput } from '../../../../Input/DatePickerInput';
import { Checkbox } from '../../../../CheckBox';
import { Button } from '../../../../Buttons/Button';
import { Icon } from '../../../../Icons/Icon';
import { SeventhStepType } from '../../types/stepTypes';
import { useWindowWidth } from '../../../../../hooks/useWindowWidth';

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

const SeventhStep: FC<StepProps> = ({ step, setStep }) => {
  const [gearType, setGearType] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState('');
  const [dateAcquired, setDateAcquired] = useState<Date>();
  const [lastMaintenance, setLastMaintenance] = useState<Date>();
  const [saveToLocker, setSaveToLocker] = useState(false);

  const { setStepData } = useContext(LogDiveDataContext);
  const isMobile = useWindowWidth(500, 768);

  const secondStepData: SeventhStepType = {
    typeOfGear: gearType,
    manufacturer,
    model,
    dateAcquired,
    lastMaintenance,
  };

  if (step !== 7) return null;

  return (
    <>
      <div className={styles.container}>
        <h2>Gear</h2>
        <p>Track the gear that you used.</p>
        <div className={styles.inputsWrapper}>
          <Dropdown
            item="Type of gear"
            setItem={setGearType}
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
        <Checkbox
          name="locker"
          onChecked={setSaveToLocker}
          checked={saveToLocker}
        >
          <span className={styles.checkboxLabel}>Save to my locker</span>
        </Checkbox>
        <Button
          width={isMobile ? 768 : 181}
          height={48}
          border="none"
          borderRadius={30}
          backgroundColor="#0059DE"
          marginTop={14}
        >
          <Icon iconName="plus-circle-white" />
          <span className={styles.buttonLabel}>Add new</span>
        </Button>
      </div>
      <StepsNavigation
        setStep={setStep}
        setStepData={() => {
          setStepData(7, secondStepData);
        }}
      />
    </>
  );
};

export default SeventhStep;
