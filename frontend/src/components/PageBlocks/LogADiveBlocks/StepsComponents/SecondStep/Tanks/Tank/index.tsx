import React, { FC } from 'react';
import { SecondStepType } from '../../../../types/stepTypes';
import styles from './styles.module.scss';
import { InputLabelWrapper } from '../../../../inputLabelWrapper';
import { Input } from '../../../../../../Input/CommonInput';
import { Dropdown } from '../../../../../../Dropdown/Dropdawn';
import { ArrayElement, SetTankParametersType, TankType } from '../../../../types/commonTypes';
import { MarginWrapper } from '../../../../../../MarginWrapper';
import { Button } from '../../../../../../Buttons/Button';

type Props = ArrayElement<SecondStepType['tanks']>
& SetTankParametersType;

export const Tank: FC<Props> = ({
  cylinder,
  material,
  mixture,
  o2,
  he,
  volumeUnit,
  volume,
  pressureStart,
  pressureEnd,
  pressureMeasures,
  setTankParameters,
}) => (
  <div className={styles.tank}>

    <InputLabelWrapper label="Cylinder">
      <div className={styles.row}>
        <Dropdown
          item={`${cylinder}x`}
          setItem={(item) => setTankParameters.setCylinder(+item as TankType['cylinder'])}
          allItems={['1', '2']}
          width={112}
        />
        <Input
          type="number"
          value={volume ? `${volume}` : ''}
          setValue={setTankParameters.setVolume}
          height={48}
          width={112}
        />

        <Dropdown
          item={volumeUnit || 'cuft'}
          setItem={(item) => {
            console.log(item);
            setTankParameters.setVolumeUnit(item as TankType['volumeUnit']);
          }}
          allItems={['L', 'cuft']}
          width={112}
        />
        <Dropdown
          item={material.toLowerCase() || 'aluminum'}
          setItem={
              setTankParameters.setMaterial
            }
          allItems={['steel', 'aluminum', 'carbon']}
          width={160}
        />
      </div>

    </InputLabelWrapper>

    <MarginWrapper top={10} display="block">
      <InputLabelWrapper label="Mixture">
        <div className={styles.mixture}>
          <Dropdown
            item={mixture.toLowerCase() || 'air'}
            setItem={
              setTankParameters.setMixture
            }
            allItems={['air', 'nitrox', 'trimix']}
            width={160}
          />
          {(mixture === 'trimix' || mixture === 'nitrox') && (
          <>
            <Input
              type="number"
              value={o2 ? `${o2}` : ''}
              setValue={setTankParameters.setO2}
              height={48}
              width={112}
              placeholder="O2"
            />
            { mixture === 'trimix' && (
            <Input
              type="number"
              value={he ? `${he}` : ''}
              setValue={setTankParameters.setHe}
              height={48}
              width={112}
              placeholder="He"
            />
            ) }
          </>
          )}
        </div>
      </InputLabelWrapper>
    </MarginWrapper>

    <MarginWrapper top={10} display="block">
      <div className={styles.contentWrapper}>
        <InputLabelWrapper label="Pressure">

          <div className={styles.row}>
            <div className={styles.labelWrapper}>
              <span className={styles.label}>Start</span>
              <Input
                type="number"
                value={pressureStart ? `${pressureStart}` : ''}
                setValue={setTankParameters.setStart}
                height={48}
                width={112}
              />
            </div>

            <div className={styles.labelWrapper}>
              <span className={styles.label}>End</span>
              <Input
                type="number"
                value={pressureEnd ? `${pressureEnd}` : ''}
                setValue={setTankParameters.setEnd}
                height={48}
                width={112}
              />
            </div>
          </div>

          <Dropdown
            item={pressureMeasures || 'psi'}
            setItem={
                setTankParameters.setMeasures
              }
            allItems={['bar', 'psi']}
            width={112}
          />

        </InputLabelWrapper>
        <div className={styles.buttonWrapper}>
          <Button
            width={149}
            height={48}
            borderRadius={30}
            backgroundColor="transparent"
            border="2px solid #000345"
            onClick={setTankParameters.deleteTank}
          >
            <span className={styles.removeButtonText}>
              Remove
            </span>
          </Button>
        </div>
      </div>

    </MarginWrapper>

  </div>
);
