import React, { FC, useEffect, useState } from 'react';
import KebabButton from '../../../Buttons/KebabButton';
import { Checkbox } from '../../../CheckBox';

import styles from './styles.module.scss';
import { PropertiesType } from '../../../../types';

type Props = {
  copyButtonHandler: (checkboxValues: PropertiesType) => void;
};

export const PopupCopy: FC<Props> = ({ copyButtonHandler }) => {
  const [count, setCount] = useState(0);
  const [checkboxValues, setCheckboxValues] = useState({
    'Tanks user': false,
    'Water Type': false,
    'Dive type': false,
    Visibility: false,
    Ratings: false,
    Spot: false,
    'Dive Shop': false,
    'Gear used': false,
    Buddies: false,
    Guide: false,
  });

  useEffect(() => {
    const filteredArray = Object.values(checkboxValues).filter((itm) => itm);
    setCount(filteredArray.length);
  }, [checkboxValues]);

  const renderCheckboxes = () => Object.entries(checkboxValues).map(([key, value]) => (
    <Checkbox
      className="copy"
      key={key}
      name={key}
      checked={value}
      onChecked={(val) => setCheckboxValues({ ...checkboxValues, [key]: val })}
    >
      {key}
    </Checkbox>
  ));

  return (
    <>
      <div className={styles.checkboxes}>{renderCheckboxes()}</div>

      <KebabButton
        className="popup"
        thirdClassName="popup__big"
        onClick={() => copyButtonHandler(checkboxValues)}
        disabled={count === 0 && true}
      >
        Copy Properties
        {' '}
        {count > 0 && `(${count})`}
      </KebabButton>
    </>
  );
};
