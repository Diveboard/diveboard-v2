import React, { FC, useContext } from 'react';
import { StepProps } from '../../types/commonTypes';
import styles from './styles.module.scss';
import { Button } from '../../../../Buttons/Button';
import FileInput from '../../../../Input/FileInput';
import { xml2json } from '../../../../../utils/xml2json';
import { LogDiveDataContext } from '../../LogDiveData/logDiveContext';
import { FirstStepType, SecondStepType } from '../../types/stepTypes';
import { notify } from '../../../../../utils/notify';

export const PreStep: FC<Pick<StepProps, 'setStep'>> = ({ setStep }) => {
  const { setStepData } = useContext(LogDiveDataContext);

  const handleFileInput = async (file: File) => {
    try {
      const parser = new DOMParser();
      const oDOM = parser.parseFromString(await file.text().then((value) => value), 'text/xml');
      const json = xml2json(oDOM, ' ');
      const obj = await JSON.parse(json);
      if (file.name.includes('.udcf')) {
        const dive = obj.profile?.repgroup.dive;
        const secondStepData = {
          parameters: {
            date: new Date(
              +dive.date.year,
              +dive.date.month,
              +dive.date.day,
              +dive.time.hour,
              +dive.time.minute,
            ),
            maxDepth: Math.max(...dive.samples.d.map((d) => +d)),
            duration: Math.max(...dive.samples.t.map((t) => +t)),
            // safetyStops: [],
            profileData: dive.samples.d
              .map((spot, i) => ({ id: i, depth: +spot, seconds: +dive.samples.t[i] * 60 })),
          },
          advancedParameters: {
            surfaceTemp: +dive.temperature,
            bottomTemp: +dive.temperature,
          },
          tanks: [],
        };
        await setStepData(2, secondStepData as SecondStepType);
      }
      if (file.name.includes('.uddf')) {
        const dive = obj.uddf.profiledata?.repetitiongroup.dive;
        const firstStepData = {
          overview: {
            tripName: '',
            diveNumber: +dive.divenumber,
            notes: dive.notes.text,
          },
          diveReviews: {},
          diveActivities: {},
        };
        const secondStepData = {
          parameters: {
            date: new Date(
              +dive.date.year,
              +dive.date.month,
              +dive.date.day,
              +dive.time.hour,
              +dive.time.minute,
            ),
            maxDepth: +dive.greatestdepth,
            // safetyStops: [],
            profileData: dive.samples.waypoint
              .map((spot) => (
                { id: +spot.divetime, depth: +spot.depth, period: +spot.divetime / 60 }
              )),
            duration: +dive.samples.waypoint[dive.samples.waypoint.length - 1].divetime / 60,
          },
          advancedParameters: {
            surfaceTemp: +dive.airtemperature,
            bottomTemp: +dive.lowesttemperature,
          },
          tanks: [],
        };
        await setStepData(1, firstStepData as FirstStepType);
        await setStepData(2, secondStepData as SecondStepType);
      }
      setStep(1);
    } catch (e) {
      notify(e.message);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Select the way you’d like to import your New Dive</h2>
      <p>
        To display on Diveboard the exact profile of your dive,
        you can either connect directly your dive computer,
        or select an export from another software.
      </p>
      <div className={styles.buttonGroup}>
        <div className={styles.inputWrapper}>
          <FileInput
            // @ts-ignore
            onChange={(e) => handleFileInput(e.target.files[0])}
            // @ts-ignore
            accept=".udcf, .uddf"
          />
        </div>
        <Button
          backgroundColor="transparent"
          borderRadius={30}
          width={230}
          height={48}
          border="2px solid #000345"
          onClick={() => setStep(1)}
        >
          <span>Add Manually</span>
        </Button>
      </div>
      <h3>Import from Dive computer coming soon</h3>
    </div>
  );
};
