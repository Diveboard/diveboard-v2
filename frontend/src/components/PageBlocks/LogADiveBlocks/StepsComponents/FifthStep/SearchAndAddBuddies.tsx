import React, { FC, useEffect, useState } from 'react';
import { RadioButton } from '../../../../RadioButton';
import { Input } from '../../../../Input/CommonInput';
import { MarginWrapper } from '../../../../MarginWrapper';
import { Button } from '../../../../Buttons/Button';
import { ButtonGroupMultiple } from '../../../../ButtonGroup/ButtonGroupMultiple';
import { Buddy } from '../../types/commonTypes';
import styles from './style.module.scss';

const buddies: {
  name: string;
  id: string;
  imgSrc?: string;
}[] = [{
  id: 'sdkgjsdlkgjsdfl',
  name: 'Sara',
  imgSrc: '/TEST_IMG_THEN_DELETE/shark.jpg',
},
{
  id: 'sdkgjJJJJJJsdlkgjsdfl',
  name: 'Barafdgd',
  imgSrc: '/TEST_IMG_THEN_DELETE/shark.jpg',
}, {
  id: 'HHGKsdkgjsdlkgjsdfl',
  name: 'Karakjsadkjldfs',
  imgSrc: '/TEST_IMG_THEN_DELETE/shark.jpg',
}, {
  id: 'NBBYIKMNBYsdkgjsdlkgjsdfl',
  name: 'Nar',
  imgSrc: '/TEST_IMG_THEN_DELETE/shark.jpg',
},
];

type Props = {
  selectedBuddies: Buddy[];
  setSelectedBuddies: React.Dispatch<
  React.SetStateAction<Buddy[]>>
};

export const SearchAndAddBuddies: FC<Props> = ({
  selectedBuddies,
  setSelectedBuddies,
}) => {
  const [myBuddies, setMyBuddies] = useState<Buddy[]>([]);
  const [searchType, setSearchType] = useState('diveboard');
  const [buddyNameError, setBuddyNameError] = useState('');
  const [searchedBuddyName, setSearchedBuddyName] = useState('');
  const [buddyName, setBuddyName] = useState('');
  const [buddyEmail, setBuddyEmail] = useState('');
  const [buddyEmailError, setBuddyEmailError] = useState('');
  const [mode, setMode] = useState<string[]>([]);

  const clickSearchedBuddyHandler = (clickedBuddy: Buddy) => {
    const buddiesPrevStateCallback = (prev) => {
      const b = prev.find((item) => {
        if (clickedBuddy.id) {
          return item.id === clickedBuddy.id;
        }
        return item.name === clickedBuddy.name;
      });
      if (b) {
        return prev.filter((item) => {
          if (clickedBuddy.id) {
            return item.id !== clickedBuddy.id;
          }
          return item.name !== clickedBuddy.name;
        });
      }
      return [...prev, {
        id: clickedBuddy.id,
        name: clickedBuddy.name,
        imgSrc: clickedBuddy.imgSrc,
      }];
    };
    setSelectedBuddies(buddiesPrevStateCallback);
    setMyBuddies(buddiesPrevStateCallback);
  };

  const addBuddyHandler = () => {
    if (buddyName) {
      const duplicate = myBuddies.find((item) => item.name === buddyName);
      if (!duplicate) {
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
    const filtered = buddies.filter((item) => {
      let notContains = true;
      selectedBuddies.forEach((selectedItem) => {
        if (selectedItem.id === item.id) {
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
