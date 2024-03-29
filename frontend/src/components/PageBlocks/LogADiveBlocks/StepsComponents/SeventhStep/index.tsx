import React, {
  FC, useContext, useEffect, useState,
} from 'react';

import { LogDiveDataContext } from '../../LogDiveData/logDiveContext';
import { StepsNavigation } from '../../StepsNavigation';
import { Checkbox } from '../../../../CheckBox';
import { Button } from '../../../../Buttons/Button';
import { Icon } from '../../../../Icons/Icon';
import { useWindowWidth } from '../../../../../hooks/useWindowWidth';
import { getGearsActions } from '../../LogDiveHelpers/getGearsActions';
import { incrementId } from '../../LogDiveHelpers/incrementId';
import { GearForm } from './GearForm';
import { StepProps } from '../../types/commonTypes';
import { SeventhStepType } from '../../types/stepTypes';
import styles from './styles.module.scss';
import { StepsIndicator } from '../../StepsIndicator';

export const SeventhStep: FC<StepProps> = ({ step, setStep }) => {
  const isMobile = useWindowWidth(500, 768);
  const { getStepData, setStepData } = useContext(LogDiveDataContext);

  const [gearItems, setGearItems] = useState<SeventhStepType['gears']>([
    {
      id: 1,
      typeOfGear: '',
      manufacturer: '',
      model: '',
      dateAcquired: undefined,
      lastMaintenance: undefined,
    },
  ]);

  const [saveToLocker, setSaveToLocker] = useState(false);

  const actions = getGearsActions(gearItems, setGearItems);

  useEffect(() => {
    const data = getStepData(7) as SeventhStepType;
    if (data.gears?.length) {
      setGearItems(data.gears);
      setSaveToLocker(data.save);
    }
  }, [step]);

  const GearsFormsComponent = gearItems.map(
    ({
      id,
      typeOfGear,
      lastMaintenance,
      manufacturer,
      model,
      dateAcquired,
    }) => {
      const parameters = actions(id);
      return (
        <GearForm
          key={id}
          typeOfGear={typeOfGear}
          setGearParameters={parameters.setGearParameters}
          id={id}
          lastMaintenance={lastMaintenance}
          model={model}
          dateAcquired={dateAcquired}
          manufacturer={manufacturer}
        />
      );
    },
  );

  const add = () => {
    setGearItems([
      ...gearItems,
      {
        id: incrementId(gearItems),
        lastMaintenance: undefined,
        dateAcquired: undefined,
        model: '',
        typeOfGear: '',
        manufacturer: '',
      },
    ]);
  };

  const seventhStepData: SeventhStepType = {
    gears: gearItems,
    save: saveToLocker,
  };

  if (step !== 7) return null;

  return (
    <>
      <StepsIndicator
        step={step}
        setStep={setStep}
        setStepData={() => setStepData(7, seventhStepData)}
      />
      <div className={styles.container}>
        <h2>Gear</h2>
        <p>Track the gear that you used.</p>
        {GearsFormsComponent}
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
          onClick={add}
        >
          <Icon iconName="plus-circle-white" />
          <span className={styles.buttonLabel}>Add new</span>
        </Button>
      </div>
      <StepsNavigation
        setStep={setStep}
        setStepData={() => setStepData(7, seventhStepData)}
      />
    </>
  );
};
