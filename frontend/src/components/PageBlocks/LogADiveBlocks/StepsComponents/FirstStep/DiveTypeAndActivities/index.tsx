import React, { FC } from 'react';
import { Checkbox } from '../../../../../CheckBox';
import { Input } from '../../../../../Input/CommonInput';
import { FirstStepType } from '../../../types/stepTypes';
import styles from './styles.module.scss';

type Props = {
  diveActivities: Omit<FirstStepType['diveActivities'], 'other'>;
  setDiveActivities: React.Dispatch<React.SetStateAction<Omit<FirstStepType['diveActivities'], 'other'>>>;
  other: string;
  setOther: React.Dispatch<React.SetStateAction<string>>;
};

export const DiveActivities: FC<Props> = (
  {
    diveActivities,
    setDiveActivities,
    other,
    setOther,
  },
) => (
  <div className={styles.diveActivities}>
    <h2>
      Dive type and activities:
    </h2>
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <Checkbox
          name="recreational"
          onChecked={(value) => {
            setDiveActivities({
              ...diveActivities,
              recreational: value as boolean,
            });
          }}
          checked={diveActivities.recreational}
        >
          Recreational
        </Checkbox>

        <Checkbox
          name="training"
          onChecked={(value) => {
            setDiveActivities({
              ...diveActivities,
              training: value as boolean,
            });
          }}
          checked={diveActivities.training}
        >
          Training
        </Checkbox>

        <Checkbox
          name="night dive"
          onChecked={(value) => {
            setDiveActivities({
              ...diveActivities,
              nightDive: value as boolean,
            });
          }}
          checked={diveActivities.nightDive}
        >
          Night dive
        </Checkbox>

        <Checkbox
          name="deep dive"
          onChecked={(value) => {
            setDiveActivities({
              ...diveActivities,
              deepDive: value as boolean,
            });
          }}
          checked={diveActivities.deepDive}
        >
          Deep dive
        </Checkbox>

        <Checkbox
          name="drift"
          onChecked={(value) => {
            setDiveActivities({
              ...diveActivities,
              drift: value as boolean,
            });
          }}
          checked={diveActivities.drift}
        >
          Drift
        </Checkbox>

        <Checkbox
          name="wrech"
          onChecked={(value) => {
            setDiveActivities({
              ...diveActivities,
              wrech: value as boolean,
            });
          }}
          checked={diveActivities.wrech}
        >
          Wrech
        </Checkbox>
      </div>

      <div className={styles.right}>
        <Checkbox
          name="cave"
          onChecked={(value) => {
            setDiveActivities({
              ...diveActivities,
              cave: value as boolean,
            });
          }}
          checked={diveActivities.cave}
        >
          Cave
        </Checkbox>

        <Checkbox
          name="reef"
          onChecked={(value) => {
            setDiveActivities({
              ...diveActivities,
              reef: value as boolean,
            });
          }}
          checked={diveActivities.reef}
        >
          Reef
        </Checkbox>

        <Checkbox
          name="photo"
          onChecked={(value) => {
            setDiveActivities({
              ...diveActivities,
              photo: value as boolean,
            });
          }}
          checked={diveActivities.photo}
        >
          Photo
        </Checkbox>

        <Checkbox
          name="research"
          onChecked={(value) => {
            setDiveActivities({
              ...diveActivities,
              research: value as boolean,
            });
          }}
          checked={diveActivities.research}
        >
          Research
        </Checkbox>

        <div className={styles.inputWrapper}>
          <span className={styles.label}>Other (comma separated):</span>
          <Input value={other} setValue={setOther} height={48} width={244} />
        </div>

      </div>

    </div>
  </div>
);
