import React, { FC, useContext, useState } from 'react';
import { StepProps } from '../../types/commonTypes';
import styles from './styles.module.scss';
import { Button } from '../../../../Buttons/Button';
import FileInput from '../../../../Input/FileInput';
import { xml2json } from '../../../../../utils/xml2json';
import { DiveObj } from '../../types/file2ObjType';
import { LogDiveDataContext } from '../../LogDiveData/logDiveContext';
import { FirstStepType, SecondStepType } from '../../types/stepTypes';

export const PreStep: FC<Pick<StepProps, 'setStep'>> = ({ setStep }) => {
  const [fileError, setFileError] = useState(false);
  const { setStepData } = useContext(LogDiveDataContext);

  const handleFileInput = async (file: File) => {
    try {
      if (!file.name.includes('.uddf')) {
        setFileError(true);
        return null;
      }
      const parser = new DOMParser();
      const oDOM = parser.parseFromString(await file.text().then((value) => value), 'text/xml');
      const json = xml2json(oDOM, ' ');
      const obj: DiveObj = await JSON.parse(json);
      // eslint-disable-next-line no-unsafe-optional-chaining
      const { dive } = obj?.uddf?.profiledata?.repetitiongroup;
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
          safetyStops: dive.samples.waypoint
            .map((spot) => ({ id: +spot.divetime, depth: +spot.depth, period: +spot.divetime })),
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
      setFileError(false);
      setStep(1);
    } catch (e) {
      setFileError(true);
      console.log(e.message);
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
            accept=".uddf"
          />
          {fileError && <span className={styles.fileError}>Invalid file. Use *.uddf files</span>}
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
