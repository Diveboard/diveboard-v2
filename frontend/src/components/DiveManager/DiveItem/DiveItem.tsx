import React, { FC, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import { Checkbox } from '../../CheckBox';
import DiveInfo from '../DiveInfo/DiveInfo';
import { DummyDataObj } from '../DUMMY_DATA_OBJ';

import classes from './DiveItem.module.scss';

type Props = {
  itm: DummyDataObj;
  isSelectAll: boolean;
  changeIsSelectAll: () => void;
  isChange: boolean;
};

const DiveItem: FC<Props> = ({
  itm,
  isSelectAll,
  changeIsSelectAll,
  isChange,
}) => {
  const {
    number,
    date,
    divedPlace,
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

  // const classNameDefinition = (classtitle: string) =>
  // className
  //   ? `${styles[className]} ${styles[classtitle]} `
  //   : styles[classtitle];

  return (
    <div
      className={
        !isShow
          ? `${classes.wrapper} ${classes.wrapper__higher} `
          : classes.wrapper
      }
    >
      <div className={classes.info}>
        <div className={classes.number}>#{number}</div>
        <div className={classes.date}>{date}</div>
      </div>
      <div className={classes.subwrapper}>
        <div className={classes.title}>{divedPlace}</div>
        <Checkbox
          name="name"
          className="column"
          checked={checkboxItem}
          onChecked={checkboxHandler}
        />
      </div>
      <div className={classes.infowrapper}>
        <DiveInfo
          diveTime={divetime}
          deepness={depth}
          diversCount={diversCount}
        />

        {isShow && (
          <span className={classes.switch} onClick={showHandler}>
            More
          </span>
        )}
      </div>

      <CSSTransition
        in={!isShow}
        timeout={200}
        classNames={{
          enterActive: classes.enterActive,
          exitActive: classes.exitActive,
        }}
        mountOnEnter
        unmountOnExit
      >
        <div className={classes.more}>
          <ul>
            <li>
              Trip: <span>{trip}</span>
            </li>
            <li>
              Dive shop: <span>{diveShop}</span>
            </li>
            <li>
              Water: <span>{water}</span>
            </li>
            <li>
              Visibility: <span>{visibility}</span>
            </li>
            <li>
              Altitude: <span>{altitude}</span>
            </li>
            <li>
              Featured gear: <span>{featuredGear}</span>
            </li>
          </ul>
          <span className={classes.switch} onClick={showHandler}>
            Less
          </span>
        </div>
      </CSSTransition>
    </div>
  );
};

export default DiveItem;
