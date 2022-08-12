import React, {
  FC, useContext, useEffect, useState,
} from 'react';
import Script from 'next/script';
import { Input } from '../../../../Input/CommonInput';
import { StepsNavigation } from '../../StepsNavigation';
import { MarginWrapper } from '../../../../MarginWrapper';
import { ButtonGroup } from '../../../../ButtonGroup';
import { RadioButton } from '../../../../RadioButton';
import { setStepErrors } from '../../LogDiveHelpers/stepsErrors/setStepErrors';
import { LogDiveDataContext } from '../../LogDiveData/logDiveContext';
import { StepProps } from '../../types/commonTypes';
import { FifthStepType } from '../../types/stepTypes';
import containerStyle from '../../styles.module.scss';
import styles from './style.module.scss';
import usePlacesPredictions from '../../../../../hooks/usePlacesPredictions';
import { Popup } from '../../../../DiveManager/Popup';
import { Backdrop } from '../../../../Backdrop';
import { Button } from '../../../../Buttons/Button';
import { Checkbox } from '../../../../CheckBox';

const buddies: {
  text: string;
  connectedMode: string;
  imgSrc?: string;
}[] = [{
  text: 'Sara',
  connectedMode: 'Sara',
  imgSrc: '/TEST_IMG_THEN_DELETE/shark.jpg',
},
{
  text: 'Barafdgd',
  connectedMode: 'Bara',
  imgSrc: '/TEST_IMG_THEN_DELETE/shark.jpg',
}, {
  text: 'Karakjsadkjldfs',
  connectedMode: 'Kara',
  imgSrc: '/TEST_IMG_THEN_DELETE/shark.jpg',
}, {
  text: 'Nar',
  connectedMode: 'Nara',
  imgSrc: '/TEST_IMG_THEN_DELETE/shark.jpg',
},
];

export const FifthStep: FC<StepProps> = ({
  step,
  setStep,
}) => {
  const { setStepData } = useContext(LogDiveDataContext);

  const [myBuddies, setMyBuddies] = useState<{
    text: string;
    connectedMode: string;
    imgSrc?: string;
  }[]>([{ text: '', connectedMode: '', imgSrc: '' }]);

  const [diveCenter, setDiveCenter] = useState('');
  const [guideName, setGuideName] = useState('');

  const [buddyName, setBuddyName] = useState('');
  const [buddyEmail, setBuddyEmail] = useState('');
  const [buddyEmailError, setBuddyEmailError] = useState('');

  const [buddy, setBuddy] = useState('');

  const [searchType, setSearchType] = useState('diveboard');
  const [openPopup, setOpenPopup] = useState(false);
  const [checkRequestDC, setCheckRequestDC] = useState(false);
  const [address, setAddress] = useState('');

  const addressPredictions = usePlacesPredictions(address);

  const setErrors = () => setStepErrors({
    stepType: 5,
    data: buddyEmail,
    errors: buddyEmailError,
    setErrors: setBuddyEmailError,
  });

  const fifthStepData: FifthStepType = {
    diveCenter,
    guideName,
    buddy: searchType === 'diveboard' ? buddy : buddyName,
  };

  useEffect(() => {
    setMyBuddies(buddies);
  }, []);

  if (step !== 5) {
    return null;
  }

  return (
    <>
      <Script
        async
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=places`}
      />
      <div className={containerStyle.container}>
        <div className={styles.fifthStep}>
          <h2>
            People
          </h2>
          <p>
            Add your Divecenter and your dive buddies here
          </p>

          <h3>
            Dive Center
          </h3>
          <Input
            value={diveCenter}
            setValue={setDiveCenter}
            placeholder="Dive Center name"
            width={570}
            height={48}
          />
          <MarginWrapper top={10}>
            <span
              className={styles.ref}
              onClick={() => setOpenPopup(true)}
            >
              Can't find the diver center?
            </span>
          </MarginWrapper>

          <h3>
            Guide name
          </h3>
          <Input
            value={guideName}
            setValue={setGuideName}
            placeholder="Guide name"
            width={570}
            height={48}
          />

          <h3>
            Dive Buddies
          </h3>
          <p>
            Add your usual dive buddies on the Community section of
            {' '}
            <a href="/logbook" className={styles.ref}>your logbook</a>
            {' '}
            to facilitate the
            search.
            You may also manually add buddies to this dive by looking for them on :
          </p>

          <h3>
            Or search and add buddies from :
          </h3>
          <div className={styles.checkBoxWrapper}>
            <RadioButton
              name="diveboard"
              label="DiveBoard"
              checked={searchType}
              onCheck={setSearchType}
            />
            <RadioButton
              name="name/email"
              label="Name/Email"
              checked={searchType}
              onCheck={setSearchType}
            />
          </div>

          <h3>
            Add a Diveboard Buddy
          </h3>
          <Input
            value={buddyName}
            setValue={setBuddyName}
            placeholder="Name"
            width={570}
            height={48}
          />
          {searchType === 'name/email' && (
            <MarginWrapper top={10} display="block">
              <Input
                value={buddyEmail}
                setValue={setBuddyEmail}
                error={buddyEmailError}
                setError={setBuddyEmailError}
                placeholder="Email"
                width={570}
                height={48}
              />
            </MarginWrapper>
          )}

          {searchType === 'diveboard' && (
            <div className={styles.buddiesWrapper}>
              <ButtonGroup
                buttons={
                                    myBuddies
                                }
                onClick={setBuddy}
                contentBehavior="wrap"
              />
            </div>
          )}

        </div>
      </div>
      <StepsNavigation
        setStep={setStep}
        setErrors={setErrors}
        setStepData={() => {
          setStepData(5, fifthStepData);
        }}
      />
      {openPopup && (
        <Popup
          closePopup={() => setOpenPopup(false)}
          customStyles={{ width: '100%', maxWidth: '800px', top: '10vh' }}
        >
          <div className={styles.popupContainer}>
            <h1>Can't find the dive center?</h1>
            <span>Dive Center & Logbook signing</span>
            <div className={styles.inputsWrapper}>
              <Input
                value={diveCenter}
                setValue={setDiveCenter}
                placeholder="Dive Center name"
                width={720}
                height={48}
              />
              <Input
                value={diveCenter}
                setValue={setDiveCenter}
                placeholder="Dive center address"
                width={720}
                height={48}
              />
              <Input
                value={diveCenter}
                setValue={setDiveCenter}
                placeholder="URL"
                width={720}
                height={48}
              />
              <Input
                value={diveCenter}
                setValue={setDiveCenter}
                placeholder="Email"
                width={720}
                height={48}
              />
            </div>
            <div className={styles.btnGroup}>
              <Button
                width={202}
                border="none"
                backgroundColor="#F4BF00"
                borderRadius={30}
                height={48}
              >
                Confirm
              </Button>
              <Button
                width={202}
                border="2px solid #000"
                backgroundColor="#fff"
                borderRadius={30}
                height={48}
              >
                Cancel
              </Button>
            </div>
            <div className={styles.popupCheckboxBlock}>
              <span>Dive Signing:</span>
              <Checkbox
                name="request"
                onChecked={setCheckRequestDC}
                checked={checkRequestDC}
              >
                <label htmlFor="request">Request the dive center to sign this dive</label>
              </Checkbox>
            </div>
            <div className={styles.inputsWrapper}>
              <span>Guide name:</span>
              <Input
                value={diveCenter}
                setValue={setDiveCenter}
                placeholder="Guide name"
                width={720}
                height={48}
              />
            </div>
          </div>
        </Popup>
      )}
      {openPopup && <Backdrop />}
    </>
  );
};
