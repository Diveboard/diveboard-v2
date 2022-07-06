import React, { FC, useEffect, useState } from 'react';
import KebabButton from '../../../Buttons/KebabButton';
import { Checkbox } from '../../../CheckBox';

import styles from './styles.module.scss';

type Props = {
  copyButtonHandler: () => void;
};

export const PopupCopy: FC<Props> = ({ copyButtonHandler }) => {
  const [count, setCount] = useState(0);
  const [checkboxValues, setCheckboxValues] = useState({
    'Tanks user': true,
    'Water Type': true,
    'Dive type': true,
    Visability: true,
    Ratings: true,
    Spot: true,
    'Dive Shop': true,
    'Gear used': true,
    Buddies: true,
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
        onClick={copyButtonHandler}
        disabled={count === 0 && true}
      >
        CopyProperty Properties
        {' '}
        {count > 0 && `( ${count} )`}
      </KebabButton>
    </>
  );
};
