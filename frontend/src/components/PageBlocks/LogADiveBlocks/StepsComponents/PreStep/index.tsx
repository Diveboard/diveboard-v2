import React, { FC, useContext } from 'react';
import { StepProps } from '../../types/commonTypes';
import styles from './styles.module.scss';
import { Button } from '../../../../Buttons/Button';
import FileInput from '../../../../Input/FileInput';
import { xml2json } from '../../../../../utils/xml2json';
import { DiveObj } from '../../types/file2ObjType';
import { LogDiveDataContext } from '../../LogDiveData/logDiveContext';

const PreStep: FC<Pick<StepProps, 'setStep'>> = ({ setStep }) => {
  const { setStepData } = useContext(LogDiveDataContext);

  const handleFileInput = async (file: File) => {
    const parser = new DOMParser();
    const oDOM = parser.parseFromString(await file.text().then((value) => value), 'text/xml');
    const json = xml2json(oDOM, ' ');
    const obj: DiveObj = await JSON.parse(json);
    const { dive } = obj.uddf.profiledata.repetitiongroup;
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
        safetySpots: dive.samples.waypoint
          .map((spot) => ({ id: +spot.divetime, depth: +spot.depth, period: +spot.divetime })),
        time: `${dive.time.hour} : ${dive.time.minute}`,
        duration: +dive.samples.waypoint[dive.samples.waypoint.length - 1].divetime / 60,
      },
      advancedParameters: {
        surfaceTemp: +dive.airtemperature,
        bottomTemp: +dive.lowesttemperature,
      },
      tanks: [],
    };
    await setStepData(1, firstStepData);
    await setStepData(2, secondStepData);
    setStep(1);
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
        {/* @ts-ignore */}
        <FileInput onChange={(e) => handleFileInput(e.target.files[0])} />
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

export default PreStep;
