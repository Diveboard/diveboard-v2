import React, { FC, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import { Checkbox } from '../../CheckBox';
import DiveInfo from '../DiveInfo';
import { DummyDataObj } from '../DUMMY_DATA_OBJ';

import styles from './styles.module.scss';

type Props = {
  itm: DummyDataObj;
  isSelectAll: boolean;
  changeIsSelectAll: () => void;
  isChange: boolean;
};

export const DiveItem: FC<Props> = ({
  itm,
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
  const [checkboxItem, setCheckboxItem] = useState(false);
  const [isShow, setShow] = useState(true);

  useEffect(() => {
    if (isChange) {
      setCheckboxItem(isSelectAll);
    }
  }, [isSelectAll]);

  const checkboxHandler = () => {
    setCheckboxItem(() => !checkboxItem);
    if (isSelectAll) {
      changeIsSelectAll();
    }
  };

  const showHandler = () => {
    setShow(() => !isShow);
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
        <div className={styles.date}>{date}</div>
      </div>
      <div className={styles.subwrapper}>
        <div className={styles.spot}>{spot}</div>
        <Checkbox
          name="name"
          className="column"
          checked={checkboxItem}
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
