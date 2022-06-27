import React, { FC } from 'react';
import { Checkbox } from '../../../../../CheckBox';
import styles from './styles.module.scss';
import { Input } from '../../../../../Input/CommonInput';

type Props = {
  recreational: boolean;
  setRecreational: React.Dispatch<React.SetStateAction<boolean>>;
  training: boolean;
  setTraining: React.Dispatch<React.SetStateAction<boolean>>;
  nightDive: boolean;
  setNightDive: React.Dispatch<React.SetStateAction<boolean>>;
  deepDive: boolean;
  setDeepDive: React.Dispatch<React.SetStateAction<boolean>>;
  drift: boolean;
  setDrift: React.Dispatch<React.SetStateAction<boolean>>;
  wrech: boolean;
  setWrech: React.Dispatch<React.SetStateAction<boolean>>;
  cave: boolean;
  setCave: React.Dispatch<React.SetStateAction<boolean>>;
  reef: boolean;
  setReef: React.Dispatch<React.SetStateAction<boolean>>;
  photo: boolean;
  setPhoto: React.Dispatch<React.SetStateAction<boolean>>;
  research: boolean;
  setResearch: React.Dispatch<React.SetStateAction<boolean>>;
  additional: string;
  setAdditional: React.Dispatch<React.SetStateAction<string>>
};

export const DiveActivities: FC<Props> = (
  {
    recreational,
    setRecreational,
    training,
    setTraining,
    nightDive,
    setNightDive,
    deepDive,
    setDeepDive,
    drift,
    setDrift,
    cave,
    setCave,
    reef,
    setReef,
    wrech,
    setWrech,
    photo,
    setPhoto,
    research,
    setResearch,
    additional,
    setAdditional,
  },
) => (
  <div className={styles.diveActivities}>
    <h2>
      Dive type and activities:
    </h2>
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <Checkbox name="recreational" onChecked={setRecreational} checked={recreational}>
          Recreational
        </Checkbox>
        <Checkbox name="training" onChecked={setTraining} checked={training}>
          Training
        </Checkbox>
        <Checkbox name="night dive" onChecked={setNightDive} checked={nightDive}>
          Night dive
        </Checkbox>
        <Checkbox name="deep dive" onChecked={setDeepDive} checked={deepDive}>
          Deep dive
        </Checkbox>
        <Checkbox name="drift" onChecked={setDrift} checked={drift}>
          Drift
        </Checkbox>
        <Checkbox name="wrech" onChecked={setWrech} checked={wrech}>
          Wrech
        </Checkbox>
      </div>

      <div className={styles.right}>
        <Checkbox name="cave" onChecked={setCave} checked={cave}>
          Cave
        </Checkbox>
        <Checkbox name="reef" onChecked={setReef} checked={reef}>
          Reef
        </Checkbox>
        <Checkbox name="photo" onChecked={setPhoto} checked={photo}>
          Photo
        </Checkbox>
        <Checkbox name="research" onChecked={setResearch} checked={research}>
          Research
        </Checkbox>

        <div className={styles.inputWrapper}>
          <span className={styles.label}>Other (comma separated):</span>
          <Input value={additional} setValue={setAdditional} height={48} width={244} />
        </div>

      </div>

    </div>
  </div>
);

export default DiveActivities;
