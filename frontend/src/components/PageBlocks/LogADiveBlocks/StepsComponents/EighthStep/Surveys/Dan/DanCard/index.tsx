import React, {
  FC, useContext, useEffect, useState,
} from 'react';
import styles from './styles.module.scss';
import { LogDiveDataContext } from '../../../../../LogDiveData/logDiveContext';
import { StepType } from '../../../../../types/commonTypes';
import MissingItems from './MissingItems';
import { Progress } from '../Progress';
import { Checkbox } from '../../../../../../../CheckBox';
import { SurveyDanType } from '../../../../../../../../types';
import { CurrentVariants } from '../../../../SecondStep/dropdownItems';

type Props = {
  progress: number
  setStep: React.Dispatch<React.SetStateAction<StepType>>
  isSentToDAN: boolean;
  sendToDAN: boolean;
  setSendTODAN: (val: boolean) => void;
  survey: SurveyDanType;
  setSurvey: (val: SurveyDanType) => void;
};

export const DanCard: FC<Props> = ({
  progress, setStep, sendToDAN, setSendTODAN, isSentToDAN, setSurvey, survey,
}) => {
  const { getAllStepsData } = useContext(LogDiveDataContext);
  const [missingFields, setMissingFields] = useState([]);
  const data = getAllStepsData();
  const {
    parameters,
    tanks,
    advancedParameters,
  } = data.secondStep;
  const { gears } = data.seventhStep;

  useEffect(() => {
    const missed = [];
    if (!parameters || !parameters.duration) {
      missed.push({
        title: 'Dive duration',
        step: 2,
        text: 'duration of the dive',
        block: 'Profile',
      });
    }

    if (!tanks || !tanks.length) {
      missed.push({
        title: 'Tank used',
        step: 2,
        text: 'type of gas used',
        block: 'Profile',
      });
    }
    let dress = '5';
    if (!gears.length
        || (gears.length >= 1 && !gears.some((gear) => gear.typeOfGear === 'Dive skin' || gear.typeOfGear === 'Wet suit' || gear.typeOfGear === 'Dry Suit'))
    ) {
      missed.push({
        title: 'Kind of suit used',
        step: 7,
        text: 'dive skin, a wet suit or a dry suit item',
        block: 'Gear',
      });
    } else {
      const gear = gears.findIndex((g) => g.typeOfGear === 'Dive skin' || g.typeOfGear === 'Wet suit' || g.typeOfGear === 'Dry Suit');
      if (gears[gear].typeOfGear === 'Dive skin') {
        dress = '1';
      } else if (gears[gear].typeOfGear === 'Wet suit') {
        dress = '2';
      } else if (gears[gear].typeOfGear === 'Dry Suit') {
        dress = '3';
      }
    }

    const current = CurrentVariants.findIndex((v) => v === advancedParameters?.current);

    let visibility = 0;
    if (advancedParameters?.waterVisibility === 'bad') {
      visibility = 5;
    } else if (advancedParameters?.waterVisibility === 'average') {
      visibility = 10;
    } else if (advancedParameters?.waterVisibility === 'good') {
      visibility = 25;
    } else if (advancedParameters.waterVisibility === 'excellent') {
      visibility = 50;
    }

    let gases = [];
    if (tanks.length === 1) {
      gases.push(`<1><><undefined><><${parameters.duration}>`);
    } else {
      gases = tanks.map((tank, idx) => {
        if (idx === 0) {
          return '<1><><undefined><><undefined>';
        }
        if (idx === tanks.length - 1) {
          return `<undefined><><undefined><><${parameters.duration}>`;
        }
        return '<undefined><><undefined><><undefined>';
      });
    }
    setSurvey({
      ...survey,
      dive: {
        ...survey.dive,
        dress,
        gases_number: tanks?.length || 0,
        bottom_gas: tanks.findIndex((t) => t.mixture === 'air') ? '1' : '0',
        gases,
        visibility,
        current: current || 0,
      },
    });
    setMissingFields(missed);
  }, [data]);

  const missingItemsComponents = missingFields.map((item) => (
    <MissingItems
      key={item.title}
      title={item.title}
      step={item.step}
      text={item.text}
      block={item.block}
      setStep={setStep}
    />
  ));
  useEffect(() => {
    if (progress < 100 || missingFields.length > 0) {
      setSendTODAN(false);
    }
  }, [progress, missingFields]);

  return (
    <div className={styles.card}>

      <div className={styles.topLine} style={{ borderRadius: !missingFields.length || isSentToDAN ? '20px' : '20px 20px 0 0' }}>
        <div className={styles.wrapper}>
          <span className={styles.title}>
            {isSentToDAN
              ? 'The data for this dive has been sent to DAN. Thanks for your cooperation!'
              : 'Mandatory field completion rate:'}
          </span>
          {!isSentToDAN && <Progress progress={progress} /> }
        </div>
        {!isSentToDAN && (
          <div>
            {(progress < 100 || missingFields.length > 0) ? (
              <span className={styles.text}>
                Once all mandatory fields are filled-in you will
                have the ability to send the form to DAN.
              </span>
            ) : (
              <Checkbox name="sendToDan" onChecked={setSendTODAN} checked={sendToDAN}>
                <span className={styles.text}>Send this form to DAN when saving this dive</span>
              </Checkbox>
            )}
          </div>
        )}
      </div>
      {!!missingFields.length && !isSentToDAN && (
      <div className={styles.bottomLine}>
        <span className={styles.title}>Missing fields:</span>
        {missingItemsComponents}
      </div>
      )}
    </div>
  );
};
