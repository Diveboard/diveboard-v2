import React, { FC } from 'react';
import { Input } from '../../../../../Input/CommonInput';
import { InputLabelWrapper } from '../../../inputLabelWrapper';
import { Dropdown } from '../../../../../Dropdown/Dropdawn';
import { setParams } from '../../../LogDiveHelpers/setParams/setParams';
import { SecondStepType } from '../../../types/stepTypes';
import styles from './styles.module.scss';

type Props = {
  advancedParameters: SecondStepType['advancedParameters'];
  setAdvancedParameters: React.Dispatch<React.SetStateAction<SecondStepType['advancedParameters']>>
};

export const AdvancedParameters: FC<Props> = ({
  advancedParameters,
  setAdvancedParameters,
}) => {
  const params = setParams(
    advancedParameters,
    setAdvancedParameters,
  );

  return (
    <div className={styles.advancedParametersWrapper}>
      <h2>Advanced parameters</h2>
      <div className={styles.content}>
        <InputLabelWrapper label="Surface temp">
          <Input
            type="number"
            value={advancedParameters.surfaceTemp ? `${advancedParameters.surfaceTemp}` : ''}
            setValue={(val) => params('surfaceTemp', +(val as string))}
            height={48}
            width={165}
            placeholder="ºC"
          />
        </InputLabelWrapper>

        <InputLabelWrapper label="Bottom Temp">
          <Input
            type="number"
            value={advancedParameters.bottomTemp ? `${advancedParameters.bottomTemp}` : ''}
            setValue={(val) => params('bottomTemp', +(val as string))}
            height={48}
            width={165}
            placeholder="ºC"
          />
        </InputLabelWrapper>

        <InputLabelWrapper label="Weights">
          <Input
            type="number"
            value={advancedParameters.weights ? `${advancedParameters.weights}` : ''}
            setValue={(val) => params('weights', +(val as string))}
            height={48}
            width={165}
            placeholder="kg"
          />
        </InputLabelWrapper>

        <InputLabelWrapper label="Water visibility:">
          <Dropdown
            item={advancedParameters.waterVisibility}
            setItem={(val) => params(
              'waterVisibility',
              val as typeof advancedParameters.waterVisibility,
            )}
            allItems={['bad', 'average', 'good', 'excellent']}
            width={165}
          />
        </InputLabelWrapper>

        <InputLabelWrapper label="Current">
          <Dropdown
            item={advancedParameters.current}
            setItem={
              (val) => params(
                'current',
                val as typeof advancedParameters.current,
              )
            }
            allItems={['none', 'light', 'medium', ' strong', 'extreme']}
            width={165}
          />
        </InputLabelWrapper>

        <InputLabelWrapper label="Altitude">
          <Input
            type="number"
            value={advancedParameters.altitude ? `${advancedParameters.altitude}` : ''}
            setValue={(val) => params(
              'altitude',
              +(val as string),
            )}
            height={48}
            width={165}
            placeholder="m"
          />
        </InputLabelWrapper>

        <InputLabelWrapper label="Water type">
          <Dropdown
            item={advancedParameters.waterType}
            setItem={
              (val) => params(
                'waterType',
                val as typeof advancedParameters.waterType,
              )
            }
            allItems={['salt', 'fresh']}
            width={165}
          />
        </InputLabelWrapper>
      </div>

    </div>
  );
};
