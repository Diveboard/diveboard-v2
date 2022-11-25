import React, { FC, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import { Checkbox } from '../../CheckBox';
import DiveInfo from '../DiveInfo';

import styles from './styles.module.scss';
import { month } from '../../../utils/date';
import { DiveType } from '../../../firebase/firestore/models';

type Props = {
  itm: DiveType & { spot: string, date: Date | null };
  isSelectAll: boolean;
  checked: boolean;
  setChecked: (val: boolean) => void;
  changeIsSelectAll: () => void;
  isChange: boolean;
};

export const DiveItem: FC<Props> = ({
  itm,
  checked,
  setChecked,
  isSelectAll,
  changeIsSelectAll,
  isChange,
}) => {
  const [isShow, setShow] = useState(true);

  useEffect(() => {
    if (isChange) {
      setChecked(isSelectAll);
    }
  }, [isSelectAll]);

  const checkboxHandler = (val) => {
    setChecked(val);
    if (isSelectAll) {
      changeIsSelectAll();
    }
  };

  const showHandler = () => {
    setShow(() => !isShow);
  };

  const parseDate = (isoDate: Date): string => {
    if (!isoDate) {
      return '';
    }
    const newDate = new Date(isoDate);
    return `${month[newDate.getMonth()]} ${newDate.getDate()}, ${newDate.getFullYear()}`;
  };

  return (
    <div
      className={
        !isShow
          ? `${styles.wrapper} ${styles.wrapper__higher} `
          : styles.wrapper
      }
    >
      <div className={styles.info}>
        <div className={styles.number}>
          #
          {itm.aboutDive.diveNumber}
        </div>
        <div className={styles.date}>{parseDate(itm.date)}</div>
      </div>
      <div className={styles.subwrapper}>
        <div className={styles.spot}>{itm.spot}</div>
        <Checkbox
          name="name"
          className="column"
          checked={checked}
          onChecked={checkboxHandler}
        />
      </div>
      <div className={styles.infowrapper}>
        <DiveInfo
          diveTime={itm.diveData.duration}
          deepness={itm.diveData.maxDepth}
          diversCount={itm.buddies?.length}
        />

        {isShow && (
          <span className={styles.switch} onClick={showHandler}>
            More
          </span>
        )}
      </div>

      <CSSTransition
        in={!isShow}
        timeout={200}
        classNames={{
          enterActive: styles.enterActive,
          exitActive: styles.exitActive,
        }}
        mountOnEnter
        unmountOnExit
      >
        <div className={styles.more}>
          <ul>
            <li>
              Trip:
              {' '}
              <span>{itm.aboutDive?.tripName}</span>
            </li>
            <li>
              Dive shop:
              {' '}
              <span>{itm.diveCenter?.id}</span>
            </li>
            <li>
              Water:
              {' '}
              <span>{itm.diveData?.waterType}</span>
            </li>
            <li>
              Visibility:
              {' '}
              <span>{itm.diveData?.waterVisibility}</span>
            </li>
            <li>
              Altitude:
              {' '}
              <span>{itm.diveData?.altitude}</span>
            </li>
            <li>
              Featured gear:
              {' '}
              <span>{itm.gears?.map((gear) => gear?.typeOfGear)?.toString()}</span>
            </li>
          </ul>
          <span className={styles.switch} onClick={showHandler}>
            Less
          </span>
        </div>
      </CSSTransition>
    </div>
  );
};
