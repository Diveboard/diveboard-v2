import React, { FC, useState } from 'react';
import { RadioButton } from '../../../../../RadioButton';
import { SaveThisButton } from '../SaveThisButton';
import { MarginWrapper } from '../../../../../MarginWrapper';

type Props = {
  defaultCheck: 'metric' | 'imperial';
};

export const EditedPreferencesUnitSystem: FC<Props> = ({ defaultCheck }) => {
  const [checkedRadio, setCheckedRadio] = useState(defaultCheck);
  return (
    <div>
      <MarginWrapper display="block" bottom={10}>
        <RadioButton
          name="metric"
          label="Metric System (m, ºC, bar, kg)"
          checked={checkedRadio}
          onCheck={setCheckedRadio}
        />
      </MarginWrapper>

      <MarginWrapper display="block" bottom={10}>
        <RadioButton
          name="imperial"
          label="Imperial System ( in, ºF, pounds)"
          checked={checkedRadio}
          onCheck={setCheckedRadio}
        />
      </MarginWrapper>

      <SaveThisButton onClick={() => {}} />
    </div>
  );
};
