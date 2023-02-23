import React, {
  FC, useContext, useEffect, useState,
} from 'react';
import { CSSTransition } from 'react-transition-group';
import { parseDate } from '../../../utils/parseDate';
import { DiveType, UnitSystem } from '../../../firebase/firestore/models';
import DiveInfo from '../DiveInfo';
import { Checkbox } from '../../CheckBox';
import styles from './styles.module.scss';
import { convertFeetToMeters, convertMetersToFeet } from '../../../utils/unitSystemConverter';
import { AuthStatusContext } from '../../../layouts/AuthLayout';

type Props = {
  itm: DiveType & { spotName?: string, spot: string, date: Date | null };
  isSelectAll: boolean;
  checked: boolean;
  setChecked: (val: boolean) => void;
  changeIsSelectAll: () => void;
  isChange: boolean;
  onClick: () => void;
};

export const DiveItem: FC<Props> = ({
  itm,
  checked,
  setChecked,
  isSelectAll,
  changeIsSelectAll,
  isChange,
  onClick,
}) => {
  const [isShow, setShow] = useState(true);

  const {
    userAuth,
  } = useContext(AuthStatusContext);

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

  const convertDepth = (dive): string => {
    const userUnitSystem = userAuth.settings.preferences.unitSystem;
    if (dive.unitSystem === userUnitSystem) {
      return `${dive.diveData?.maxDepth || 0} ${userUnitSystem === 'METRIC' ? 'm' : 'ft'}`;
    }
    if (userUnitSystem === 'METRIC') {
      return `${dive.diveData?.maxDepth ? convertFeetToMeters(dive.diveData?.maxDepth) : 0} m`;
    }
    return `${dive.diveData?.maxDepth ? convertMetersToFeet(dive.diveData?.maxDepth) : 0} ft`;
  };

  const convertAltitude = (diveUnitSystem: UnitSystem, value: number): number => {
    const userUnitSystem = userAuth.settings.preferences.unitSystem;
    if (diveUnitSystem === userUnitSystem) {
      return value;
    }
    if (userUnitSystem === 'METRIC') {
      return convertFeetToMeters(value);
    }
    return convertMetersToFeet(value);
  };

  return (
    <div
      className={
        !isShow
          ? `${styles.wrapper} ${styles.wrapper__higher} `
          : styles.wrapper
      }
    >
      <div className={styles.info} onClick={onClick}>
        <div className={styles.number}>
          #
          {itm.aboutDive?.diveNumber}
        </div>
        <div className={styles.date}>{parseDate(itm.date)}</div>
      </div>
      <div className={styles.subwrapper}>
        <div className={styles.spot}>{itm.spotName}</div>
        <Checkbox
          name="name"
          className="column"
          checked={checked}
          onChecked={checkboxHandler}
        />
      </div>
      <div className={styles.infowrapper}>
        <DiveInfo
          diveTime={itm.diveData?.duration || 0}
          deepness={convertDepth(itm)}
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
              <span>{convertAltitude(itm.unitSystem, itm.diveData?.altitude)}</span>
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
