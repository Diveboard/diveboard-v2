import React, {
  FC, useContext, useEffect, useState,
} from 'react';
import Script from 'next/script';
import { doc } from '@firebase/firestore';
import { Input } from '../../../../Input/CommonInput';
import { StepsNavigation } from '../../StepsNavigation';
import { MarginWrapper } from '../../../../MarginWrapper';
import { Popup } from '../../../../DiveManager/Popup';
import { Backdrop } from '../../../../Backdrop';
import { SearchAndAddBuddies } from './SearchAndAddBuddies';
import { Checkbox } from '../../../../CheckBox';
import { SearchPredictions } from '../../../../Dropdown/SarchPredictions';
import { Button } from '../../../../Buttons/Button';
import { useWindowWidth } from '../../../../../hooks/useWindowWidth';
import { SearchBlock } from './SearchBlock';
import { useGetShops } from './hooks/useGetShops';
import { LogDiveDataContext } from '../../LogDiveData/logDiveContext';
import { StepProps } from '../../types/commonTypes';
import { FifthStepType } from '../../types/stepTypes';
import containerStyle from '../../styles.module.scss';
import styles from './style.module.scss';
import { StepsIndicator } from '../../StepsIndicator';
import { AuthStatusContext } from '../../../../../layouts/AuthLayout';
import { BuddiesType } from '../../../../../firebase/firestore/models';
import { notify } from '../../../../../utils/notify';
import {
  firestorePublicProfileService,
} from '../../../../../firebase/firestore/firestoreServices/firestorePublicProfileService';
import { db } from '../../../../../firebase/firestore/firebaseFirestore';

export const FifthStep: FC<StepProps> = ({
  step,
  setStep,
}) => {
  const {
    setStepData, getStepData,
  } = useContext(LogDiveDataContext);
  const isMobile = useWindowWidth(500, 769);
  const { userAuth } = useContext(AuthStatusContext);
  const [diveCenter, setDiveCenter] = useState('');
  const [guideName, setGuideName] = useState('');

  // const [selectedDiveCenter, setSelectedDiveCenter] = useState('');
  // const [selectedGuide, setSelectedGuide] = useState('');

  const [selectedBuddies, setSelectedBuddies] = useState<BuddiesType[]>([]);

  const [openPopup, setOpenPopup] = useState(false);
  const [checkRequestDC, setCheckRequestDC] = useState(false);
  // const [notifyBuddy, setNotifyBuddy] = useState(false);
  const [address, setAddress] = useState('');
  const [url, setUrl] = useState('');
  const [centerEmail, setCenterEmail] = useState('');

  const { shops, guides } = useGetShops();

  const fifthStepData: FifthStepType = {
    buddies: selectedBuddies,
  };

  useEffect(() => {
    const data = getStepData(5) as FifthStepType;
    (async () => {
      try {
        if (data?.buddies?.length) {
          const diveBuddies: Array<BuddiesType> = [];
          data.buddies.forEach((buddy) => {
            if (buddy.userRef) {
              // @ts-ignore
              const segments = buddy.userRef?._key?.path?.segments;
              const id = segments[segments.length - 1];
              diveBuddies.push({
                ...buddy,
                userRef: doc(db, `users/${id}`),
              });
            } else {
              diveBuddies.push(buddy);
            }
          });
          const buddies = await firestorePublicProfileService.getBuddiesInfo(diveBuddies);
          setSelectedBuddies(buddies);
        }
      } catch (e) {
        notify(e.message);
      }
    })();
  }, [step]);

  if (step !== 5) {
    return null;
  }

  return (
    <>
      <Script
        async
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=places`}
      />
      <StepsIndicator
        step={step}
        setStep={setStep}
        setStepData={() => setStepData(5, fifthStepData)}
      />
      <div className={containerStyle.container}>
        <div className={styles.fifthStep}>
          <h2>
            People
          </h2>
          <p>
            Add your Divecenter and your dive buddies here
          </p>

          <SearchBlock
            title="Dive Center"
            inputValue={diveCenter}
            setInputValue={setDiveCenter}
            recommendedItems={shops}
            disabled
            // @ts-ignore
            // onSearchHandler={firestoreShopsService.getShopsByName}
            onSearchHandler={() => {}}
          />

          <MarginWrapper top={10}>
            <span
              className={styles.ref}
              onClick={() => setOpenPopup(true)}
            >
              Can't find the diver center?
            </span>
          </MarginWrapper>

          <SearchBlock
            title="Guide name"
            inputValue={guideName}
            setInputValue={setGuideName}
            recommendedItems={guides}
            disabled
            // @ts-ignore
            // onSearchHandler={firestoreGuidesService.getGuidesByGuideName}
            onSearchHandler={() => {}}
          />

          <h3>
            Dive Buddies
          </h3>
          <p>
            Add your usual dive buddies on the Community section of
            {' '}
            <a href={`/logbook/${userAuth.uid}`} className={styles.ref}>your logbook</a>
            {' '}
            to facilitate the
            search.
            You may also manually add buddies to this dive by looking for them on :
          </p>

          <SearchAndAddBuddies
            selectedBuddies={selectedBuddies}
            setSelectedBuddies={setSelectedBuddies}
          />

        </div>
      </div>
      <StepsNavigation
        setStep={setStep}
        setStepData={() => setStepData(5, fifthStepData)}
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
                {/* <div className={styles.inputsWrapper}> */}
                {/*   <span>Guide name:</span> */}
                {/*   <Input */}
                {/*     value={guideName} */}
                {/*     setValue={setGuideName} */}
                {/*     placeholder="Guide name" */}
                {/*     width={720} */}
                {/*     height={48} */}
                {/*   /> */}
                {/* </div> */}
                {/* <b>Dive buddies: NONE</b> */}
                {/* <p> */}
                {/*   Add your usual dive buddies on the Community section */}
                {/*   of your logbook to facilitate the search. */}
                {/*   You may also manually add buddies to this dive by looking for them on */}
                {/* </p> */}
                {/* <div className={styles.inputsWrapper}> */}
                {/*   <span>Add diveboard buddy:</span> */}
                {/*   <Input */}
                {/*     value={buddyName} */}
                {/*     setValue={setBuddyName} */}
                {/*     placeholder="Add diveboard buddy" */}
                {/*     width={720} */}
                {/*     height={48} */}
                {/*   /> */}
                {/*   <Checkbox */}
                {/*     name="buddy" */}
                {/*     onChecked={setNotifyBuddy} */}
                {/*     checked={notifyBuddy} */}
                {/*   > */}
                {/*     <label htmlFor="buddy">Notify your buddy</label> */}
                {/*   </Checkbox> */}
                {/* </div> */}
              </>
            )}
          </div>
        </Popup>
      )}
      {openPopup && <Backdrop />}
    </>
  );
};
