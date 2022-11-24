import React, { FC, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import { Checkbox } from '../../CheckBox';
import DiveInfo from '../DiveInfo';

import styles from './styles.module.scss';
import { month } from '../../../utils/date';

// eslint-disable-next-line @typescript-eslint/naming-convention
type diveType = {
  id: number;
  number: number;
  date: Date;
  spot: string;
  divetime: number;
  depth: number;
  diversCount: number;
  trip: string;
  diveShop: string;
  water: string;
  visibility: string;
  altitude: number;
  featuredGear: string;
};

type Props = {
  itm: diveType;
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
  const {
    number,
    date,
    spot,
    divetime,
    depth,
    diversCount,
    trip,
    diveShop,
    water,
    visibility,
    altitude,
    featuredGear,
  } = itm;
  // const [checkboxItem, setCheckboxItem] = useState(false);
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
    return `${month[newDate.getMonth() - 1]} ${newDate.getDate()}, ${newDate.getFullYear()}`;
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
          {number}
        </div>
        <div className={styles.date}>{parseDate(date)}</div>
      </div>
      <div className={styles.subwrapper}>
        <div className={styles.spot}>{spot}</div>
        <Checkbox
          name="name"
          className="column"
          checked={checked}
          onChecked={checkboxHandler}
        />
      </div>
      <div className={styles.infowrapper}>
        <DiveInfo
          diveTime={divetime}
          deepness={depth}
          diversCount={diversCount}
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
              <span>{trip}</span>
            </li>
            <li>
              Dive shop:
              {' '}
              <span>{diveShop}</span>
            </li>
            <li>
              Water:
              {' '}
              <span>{water}</span>
            </li>
            <li>
              Visibility:
              {' '}
              <span>{visibility}</span>
            </li>
            <li>
              Altitude:
              {' '}
              <span>{altitude}</span>
            </li>
            <li>
              Featured gear:
              {' '}
              <span>{featuredGear}</span>
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
