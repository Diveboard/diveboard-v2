import React, { FC, useEffect, useState } from 'react';
import { RadioButton } from '../../../../RadioButton';
import { Input } from '../../../../Input/CommonInput';
import { MarginWrapper } from '../../../../MarginWrapper';
import { Button } from '../../../../Buttons/Button';
import { ButtonGroupMultiple } from '../../../../ButtonGroup/ButtonGroupMultiple';
import {
  firestorePublicProfileService,
} from '../../../../../firebase/firestore/firestoreServices/firestorePublicProfileService';
import { BuddyItemType } from './index';
import styles from './style.module.scss';

type Props = {
  selectedBuddies: BuddyItemType[];
  setSelectedBuddies: React.Dispatch<
  React.SetStateAction<BuddyItemType[]>>
};

export const SearchAndAddBuddies: FC<Props> = ({
  selectedBuddies,
  setSelectedBuddies,
}) => {
  const [myBuddies, setMyBuddies] = useState<BuddyItemType[]>([]);
  const [searchType, setSearchType] = useState('diveboard');
  const [buddyNameError, setBuddyNameError] = useState('');
  const [searchedBuddyName, setSearchedBuddyName] = useState('');
  const [buddyName, setBuddyName] = useState('');
  const [buddyEmail, setBuddyEmail] = useState('');
  const [buddyEmailError, setBuddyEmailError] = useState('');
  const [mode, setMode] = useState<string[]>([]);

  const clickSearchedBuddyHandler = (clickedBuddy: BuddyItemType) => {
    const buddiesPrevStateCallback = (prev) => {
      const b = prev.find((item) => {
        if ('id' in clickedBuddy) {
          return item.id === clickedBuddy.id;
        }
        return item.name === clickedBuddy.name;
      });
      if (b) {
        return prev.filter((item) => {
          if ('id' in clickedBuddy) {
            return item.id !== clickedBuddy.id;
          }
          return item.name !== clickedBuddy.name;
        });
      }

      if ('id' in clickedBuddy) {
        return [...prev, {
          id: clickedBuddy.id,
          name: clickedBuddy.name,
          imgSrc: clickedBuddy.imgSrc,
        }];
      }
      return [...prev, {
        name: clickedBuddy.name,
        email: clickedBuddy.email,
      }];
    };
    setSelectedBuddies(buddiesPrevStateCallback);
    setMyBuddies(buddiesPrevStateCallback);
  };

  const addBuddyHandler = () => {
    if (buddyName) {
      const duplicateMyBuddies = myBuddies.find((item) => {
        if ('name' in item) {
          return item.name === buddyName;
        }
        return false;
      });

      const duplicateSelectedBuddies = selectedBuddies.find((item) => {
        if ('name' in item) {
          return item.name === buddyName;
        }
        return false;
      });

      if (!duplicateMyBuddies && !duplicateSelectedBuddies) {
        setSelectedBuddies([...selectedBuddies, {
          name: buddyName,
          email: buddyEmail,
        }]);
        setMode([...mode, buddyName]);
        setBuddyName('');
        setBuddyEmail('');
        setSearchType('diveboard');
      } else {
        setBuddyNameError('you have already added buddy with those name ');
      }
    } else {
      setSearchType('diveboard');
    }
  };

  useEffect(() => {
    const filtered = myBuddies.filter((item) => {
      let notContains = true;
      selectedBuddies.forEach((selectedItem) => {
        if ('id' in selectedItem && 'id' in item && selectedItem.id === item.id) {
          notContains = false;
        }
      });
      return notContains;
    });
    setMyBuddies(filtered);
  }, []);

  useEffect(() => {
    const checked = selectedBuddies.map((item) => item.name);
    setMode(checked);
  }, [selectedBuddies]);

  useEffect(() => {
    if (searchedBuddyName.length >= 3) {
      (async () => {
        const buddiesPredictions = await firestorePublicProfileService
          .getUserPredictionsByName(searchedBuddyName);
        const buddies = buddiesPredictions
          .map((buddy) => ({
            id: buddy.uid,
            name: buddy.name,
            imgSrc: buddy.photoURL,
          } as BuddyItemType));
        setMyBuddies(buddies);
      })();
    }
  }, [searchedBuddyName]);

  return (
    <>
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
          <h3>
            Selected:
          </h3>
          <ButtonGroupMultiple
            items={selectedBuddies}
            onClick={clickSearchedBuddyHandler}
            mode={mode}
            setMode={setMode}
          />
          <h3>
            Searched:
          </h3>
          <ButtonGroupMultiple
            items={myBuddies}
            onClick={clickSearchedBuddyHandler}
          />
        </div>
      )}

    </>
  );
};
