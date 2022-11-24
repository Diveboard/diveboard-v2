import React, { FC } from 'react';
import { Checkbox } from '../../../../../CheckBox';
import { Input } from '../../../../../Input/CommonInput';
import { setParams } from '../../../LogDiveHelpers/setParams/setParams';
import { FirstStepType } from '../../../types/stepTypes';
import styles from './styles.module.scss';

type Props = {
  diveActivities: Omit<FirstStepType['diveActivities'], 'other'>;
  setDiveActivities: React.Dispatch<
  React.SetStateAction<Omit<FirstStepType['diveActivities'], 'other'>>
  >;
  other: string;
  setOther: React.Dispatch<React.SetStateAction<string>>;
};

export const DiveActivities: FC<Props> = ({
  diveActivities,
  setDiveActivities,
  other,
  setOther,
}) => {
  const params = setParams(diveActivities, setDiveActivities);
  return (
    <div className={styles.diveActivities}>
      <h2>Dive type and activities:</h2>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <Checkbox
            name="recreational"
            onChecked={(val) => {
              params('recreational', val as boolean);
            }}
            checked={diveActivities.recreational}
          >
            Recreational
          </Checkbox>

          <Checkbox
            name="training"
            onChecked={(val) => {
              params('training', val as boolean);
            }}
            checked={diveActivities.training}
          >
            Training
          </Checkbox>

          <Checkbox
            name="night dive"
            onChecked={(val) => {
              params('nightDive', val as boolean);
            }}
            checked={diveActivities.nightDive}
          >
            Night dive
          </Checkbox>

          <Checkbox
            name="deep dive"
            onChecked={(val) => {
              params('deepDive', val as boolean);
            }}
            checked={diveActivities.deepDive}
          >
            Deep dive
          </Checkbox>

          <Checkbox
            name="drift"
            onChecked={(val) => {
              params('drift', val as boolean);
            }}
            checked={diveActivities.drift}
          >
            Drift
          </Checkbox>

          <Checkbox
            name="wreck"
            onChecked={(val) => {
              params('wreck', val as boolean);
            }}
            checked={diveActivities.wreck}
          >
            Wreck
          </Checkbox>
        </div>

        <div className={styles.right}>
          <Checkbox
            name="cave"
            onChecked={(val) => {
              params('cave', val as boolean);
            }}
            checked={diveActivities.cave}
          >
            Cave
          </Checkbox>

          <Checkbox
            name="reef"
            onChecked={(val) => {
              params('reef', val as boolean);
            }}
            checked={diveActivities.reef}
          >
            Reef
          </Checkbox>

          <Checkbox
            name="photo"
            onChecked={(val) => {
              params('photo', val as boolean);
            }}
            checked={diveActivities.photo}
          >
            Photo
          </Checkbox>

          <Checkbox
            name="research"
            onChecked={(val) => {
              params('research', val as boolean);
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
};
