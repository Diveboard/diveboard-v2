import React, {
  FC, useContext, useEffect, useState,
} from 'react';
import Script from 'next/script';
import { Input } from '../../../../Input/CommonInput';
import { StepsNavigation } from '../../StepsNavigation';
import { MarginWrapper } from '../../../../MarginWrapper';
import { RadioButton } from '../../../../RadioButton';
import { setStepErrors } from '../../LogDiveHelpers/stepsErrors/setStepErrors';
import { Popup } from '../../../../DiveManager/Popup';
import { Backdrop } from '../../../../Backdrop';
import { Button } from '../../../../Buttons/Button';
import { Checkbox } from '../../../../CheckBox';
import { useWindowWidth } from '../../../../../hooks/useWindowWidth';
import { SearchPredictions } from '../../../../Dropdown/SarchPredictions';
import { ButtonGroupMultiple } from '../../../../ButtonGroup/ButtonGroupMultiple';
import { LogDiveDataContext } from '../../LogDiveData/logDiveContext';

import { StepProps } from '../../types/commonTypes';
import { FifthStepType } from '../../types/stepTypes';
import containerStyle from '../../styles.module.scss';
import styles from './style.module.scss';

const buddies: {
  text: string;
  id: string;
  imgSrc?: string;
}[] = [{
  id: 'sdkgjsdlkgjsdfl',
  text: 'Sara',
  imgSrc: '/TEST_IMG_THEN_DELETE/shark.jpg',
},
{
  id: 'sdkgjJJJJJJsdlkgjsdfl',
  text: 'Barafdgd',
  imgSrc: '/TEST_IMG_THEN_DELETE/shark.jpg',
}, {
  id: 'HHGKsdkgjsdlkgjsdfl',
  text: 'Karakjsadkjldfs',
  imgSrc: '/TEST_IMG_THEN_DELETE/shark.jpg',
}, {
  id: 'NBBYIKMNBYsdkgjsdlkgjsdfl',
  text: 'Nar',
  imgSrc: '/TEST_IMG_THEN_DELETE/shark.jpg',
},
];

export const FifthStep: FC<StepProps> = ({
  step,
  setStep,
}) => {
  const { setStepData } = useContext(LogDiveDataContext);
  const isMobile = useWindowWidth(500, 769);

  const [myBuddies, setMyBuddies] = useState<{
    text: string;
    id: string;
    imgSrc?: string;
  }[]>([]);

  const [diveCenter, setDiveCenter] = useState('');
  const [guideName, setGuideName] = useState('');

  const [searchedBuddyName, setSearchedBuddyName] = useState('');

  const [buddyName, setBuddyName] = useState('');
  const [buddyNameError, setBuddyNameError] = useState('');
  const [buddyEmail, setBuddyEmail] = useState('');
  const [buddyEmailError, setBuddyEmailError] = useState('');

  const [mode, setMode] = useState<string[]>([]);
  const [selectedBuddies, setSelectedBuddies] = useState<{ id: string, name: string }[]>([]);

  const [searchType, setSearchType] = useState('diveboard');
  const [openPopup, setOpenPopup] = useState(false);
  const [checkRequestDC, setCheckRequestDC] = useState(false);
  const [notifyBuddy, setNotifyBuddy] = useState(false);
  const [address, setAddress] = useState('');
  const [url, setUrl] = useState('');
  const [centerEmail, setCenterEmail] = useState('');

  const setErrors = () => setStepErrors({
    stepType: 5,
    data: buddyEmail,
    errors: buddyEmailError,
    setErrors: setBuddyEmailError,
  });

  const clickBuddyHandler = (clickedBuddy: {
    text: string;
    id: string;
    imgSrc?: string;
  }) => {
    setSelectedBuddies((prev) => {
      const b = prev.find((item) => item.id === clickedBuddy.id);
      if (b) {
        return prev.filter((item) => item.id !== clickedBuddy.id);
      }
      return [...prev, {
        id: clickedBuddy.id,
        name: clickedBuddy.text,
      }];
    });
  };

  const addBuddyHandler = () => {
    if (buddyName) {
      const duplicate = myBuddies.find((item) => item.text === buddyName);
      if (!duplicate) {
        setMyBuddies(
          (prevState) => [...prevState,
            {
              text: buddyName,
              id: '',
              imgSrc: '',
            }],
        );
        setSelectedBuddies([...selectedBuddies, { id: '', name: buddyName }]);
        setMode([...mode, buddyName]);
        setSearchType('diveboard');
      } else {
        setBuddyNameError('you have already added buddy with those name ');
      }
    } else {
      setSearchType('diveboard');
    }
  };

  const fifthStepData: FifthStepType = {
    diveCenter,
    guideName,
    buddies: selectedBuddies,
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
          {searchType === 'diveboard' && (
          <Input
            value={searchedBuddyName}
            setValue={setSearchedBuddyName}
            error={buddyNameError}
            setError={setBuddyNameError}
            placeholder="Name"
            width={570}
            height={48}
          />
          )}

          {searchType === 'name/email' && (
            <>
              <Input
                value={buddyName}
                setValue={setBuddyName}
                error={buddyNameError}
                setError={setBuddyNameError}
                placeholder="New Buddy Name"
                width={570}
                height={48}
              />
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
              <MarginWrapper top={20} display="block">
                <Button
                  width={200}
                  height={54}
                  border="none"
                  backgroundColor="#FDC90D"
                  borderRadius={30}
                  onClick={addBuddyHandler}
                >
                  <span className={styles.addBuddyText}>
                    Add buddy
                  </span>
                </Button>
              </MarginWrapper>
            </>

          )}

          {searchType === 'diveboard' && (
            <div className={styles.buddiesWrapper}>

              <ButtonGroupMultiple
                items={myBuddies}
                onClick={clickBuddyHandler}
                mode={mode}
                setMode={setMode}
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
          customStyles={{
            width: '100%',
            maxWidth: '800px',
            top: '10vh',
          }}
        >
          <div className={styles.popupContainer}>
            {isMobile ? (
              <>
                <h2>Add a Dive Center</h2>
                <p>Don’t have your dive center at Diveboard? Add it to our database</p>
                <div className={styles.inputsWrapper}>
                  <Input
                    value={diveCenter}
                    setValue={setDiveCenter}
                    placeholder="Dive Center name"
                    width={720}
                    height={48}
                  />
                  <div style={{ position: 'relative' }}>
                    <Input
                      value={address}
                      setValue={setAddress}
                      placeholder="Dive center address"
                      width={720}
                      height={48}
                      iconName="dropdown-arrow"
                      iconPosition="right"
                    />
                    <SearchPredictions region={address} setRegion={setAddress} noMap />
                  </div>
                  <Input
                    value={url}
                    setValue={setUrl}
                    placeholder="URL"
                    width={720}
                    height={48}
                  />
                  <Input
                    value={centerEmail}
                    setValue={setCenterEmail}
                    placeholder="Email"
                    width={720}
                    height={48}
                  />
                </div>
                <Button
                  border="none"
                  backgroundColor="#F4BF00"
                  borderRadius={30}
                  height={48}
                >
                  Add a Dive Center
                </Button>
              </>
            ) : (
              <>
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
                  <div style={{ position: 'relative' }}>
                    <Input
                      value={address}
                      setValue={setAddress}
                      placeholder="Dive center address"
                      width={720}
                      height={48}
                      iconName="dropdown-arrow"
                      iconPosition="right"
                    />
                    <SearchPredictions region={address} setRegion={setAddress} noMap />
                  </div>
                  <Input
                    value={url}
                    setValue={setUrl}
                    placeholder="URL"
                    width={720}
                    height={48}
                  />
                  <Input
                    value={centerEmail}
                    setValue={setCenterEmail}
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
                    value={guideName}
                    setValue={setGuideName}
                    placeholder="Guide name"
                    width={720}
                    height={48}
                  />
                </div>
                <b>Dive buddies: NONE</b>
                <p>
                  Add your usual dive buddies on the Community section
                  of your logbook to facilitate the search.
                  You may also manually add buddies to this dive by looking for them on
                </p>
                <div className={styles.inputsWrapper}>
                  <span>Add diveboard buddy:</span>
                  <Input
                    value={buddyName}
                    setValue={setBuddyName}
                    placeholder="Add diveboard buddy"
                    width={720}
                    height={48}
                  />
                  <Checkbox
                    name="buddy"
                    onChecked={setNotifyBuddy}
                    checked={notifyBuddy}
                  >
                    <label htmlFor="buddy">Notify your buddy</label>
                  </Checkbox>
                </div>
              </>
            )}
          </div>
        </Popup>
      )}
      {openPopup && <Backdrop />}
    </>
  );
};
