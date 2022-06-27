import React, { FC } from 'react';
import { Input } from '../../../../../Input/CommonInput';
import { InputLabelWrapper } from '../../../inputLabelWrapper';
import { SecondStepType } from '../../../types/stepTypes';
import styles from './styles.module.scss';
import { Dropdown } from '../../../../../Dropdown/Dropdawn';

type Props = {
  advancedParameters: SecondStepType['advancedParameters'];
  setAdvancedParameters: React.Dispatch<React.SetStateAction<SecondStepType['advancedParameters']>>
};

export const AdvancedParameters: FC<Props> = ({
  advancedParameters,
  setAdvancedParameters,
}) => {
  const setSurfaceTemp = (surfaceTemp: string) => {
    setAdvancedParameters({
      ...advancedParameters,
      surfaceTemp: +surfaceTemp,
    });
  };
  const setBottomTemp = (bottomTemp: string) => {
    setAdvancedParameters({
      ...advancedParameters,
      bottomTemp: +bottomTemp,
    });
  };
  const setWeights = (weights: string) => {
    setAdvancedParameters({
      ...advancedParameters,
      weights: +weights,
    });
  };

  const setWaterVisibility = (waterVisibility:
  SecondStepType['advancedParameters']['waterVisibility']) => {
    setAdvancedParameters({
      ...advancedParameters,
      waterVisibility,
    });
  };

  const setCurrent = (current:
  SecondStepType['advancedParameters']['current']) => {
    setAdvancedParameters({
      ...advancedParameters,
      current,
    });
  };

  const setAltitude = (altitude: string) => {
    setAdvancedParameters({ ...advancedParameters, altitude: +altitude });
  };

  const setWaterType = (
    waterType: SecondStepType['advancedParameters']['waterType'],
  ) => {
    setAdvancedParameters({
      ...advancedParameters,
      waterType,
    });
  };

  return (
    <div className={styles.advancedParametersWrapper}>
      <h2>Advanced parameters</h2>
      <div className={styles.content}>
        <InputLabelWrapper label="Surface temp">
          <Input
            type="number"
            value={advancedParameters.surfaceTemp ? `${advancedParameters.surfaceTemp}` : ''}
            setValue={setSurfaceTemp}
            height={48}
            width={165}
            placeholder="ºC"
          />
        </InputLabelWrapper>

        <InputLabelWrapper label="Bottom Temp">
          <Input
            type="number"
            value={advancedParameters.bottomTemp ? `${advancedParameters.bottomTemp}` : ''}
            setValue={setBottomTemp}
            height={48}
            width={165}
            placeholder="ºC"
          />
        </InputLabelWrapper>

        <InputLabelWrapper label="Weights">
          <Input
            type="number"
            value={advancedParameters.weights ? `${advancedParameters.weights}` : ''}
            setValue={setWeights}
            height={48}
            width={165}
            placeholder="kg"
          />
        </InputLabelWrapper>

        <InputLabelWrapper label="Water visibility:">
          <Dropdown
            item={advancedParameters.waterVisibility}
            setItem={setWaterVisibility}
            allItems={['bad', 'average', 'good', 'excellent']}
            width={165}
          />
        </InputLabelWrapper>

        <InputLabelWrapper label="Current">
          <Dropdown
            item={advancedParameters.current}
            setItem={
              setCurrent
            }
            allItems={['none', 'light', 'medium', ' strong', 'extreme']}
            width={165}
          />
        </InputLabelWrapper>

        <InputLabelWrapper label="Altitude">
          <Input
            type="number"
            value={advancedParameters.altitude ? `${advancedParameters.altitude}` : ''}
            setValue={setAltitude}
            height={48}
            width={165}
            placeholder="m"
          />
        </InputLabelWrapper>

        <InputLabelWrapper label="Water type">
          <Dropdown
            item={advancedParameters.waterType}
            setItem={
              setWaterType
            }
            allItems={['salt', 'fresh']}
            width={165}
          />
        </InputLabelWrapper>
      </div>

    </div>
  );
};
