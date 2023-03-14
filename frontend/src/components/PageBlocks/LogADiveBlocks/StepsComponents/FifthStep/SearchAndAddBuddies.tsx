import React, { FC, useState } from 'react';
import { RadioButton } from '../../../../RadioButton';
import { Input } from '../../../../Input/CommonInput';
import { MarginWrapper } from '../../../../MarginWrapper';
import { Button } from '../../../../Buttons/Button';
import { ButtonGroupMultiple } from '../../../../ButtonGroup/ButtonGroupMultiple';
import {
  firestorePublicProfileService,
} from '../../../../../firebase/firestore/firestoreServices/firestorePublicProfileService';
import styles from './style.module.scss';
import { BuddiesType } from '../../../../../firebase/firestore/models';
import { useDebounce } from '../../../../../hooks/useDebounce';
import { notify } from '../../../../../utils/notify';
import { Loader } from '../../../../Loader';

type Props = {
  selectedBuddies: BuddiesType[];
  setSelectedBuddies: React.Dispatch<
  React.SetStateAction<BuddiesType[]>>
};

export const SearchAndAddBuddies: FC<Props> = ({
  selectedBuddies,
  setSelectedBuddies,
}) => {
  const [myBuddies, setMyBuddies] = useState<BuddiesType[]>([]);
  const [searchType, setSearchType] = useState('diveboard');

  const [searchedBuddyName, setSearchedBuddyName] = useState('');
  const [buddyName, setBuddyName] = useState('');
  const [buddyEmail, setBuddyEmail] = useState('');

  const [buddyNameError, setBuddyNameError] = useState('');
  const [buddyEmailError, setBuddyEmailError] = useState('');

  const [isLoading, setLoading] = useState(false);

  const clickSearchedBuddyHandler = (clickedBuddy: BuddiesType) => {
    const newBuddies = [...selectedBuddies, clickedBuddy];
    setSelectedBuddies(newBuddies);
    setMyBuddies(myBuddies.filter((item) => item.id !== clickedBuddy.id));
  };
  const addBuddyHandler = () => {
    if (buddyName) {
      setSelectedBuddies([...selectedBuddies, {
        name: buddyName,
        email: buddyEmail,
        notify: true,
        type: 'external',
      }]);
      setBuddyName('');
      setBuddyEmail('');
      setSearchType('diveboard');
    } else {
      setBuddyNameError('Buddy name is required');
    }
  };

  const searchHandler = async () => {
    if (searchedBuddyName.length >= 3) {
      try {
        setLoading(true);
        const buddiesPredictions = await firestorePublicProfileService
          .getUserPredictionsByName(searchedBuddyName);
        setMyBuddies(buddiesPredictions
          .filter(({ id }) => !selectedBuddies
            .some((selectedBuddy) => selectedBuddy.id === id)));
        setLoading(false);
      } catch (e) {
        setLoading(false);
        notify(e.message);
      }
    }
  };

  useDebounce(searchedBuddyName, searchHandler, 1000);

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
              type="email"
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
            onClick={(item) => {
              setSelectedBuddies(selectedBuddies.filter((buddy) => buddy.name !== item.name));
            }}
            mode="selected"
          />
          {!!myBuddies?.length && (
          <>
            <h3>
              Searched:
            </h3>
            <Loader loading={isLoading} />
            <ButtonGroupMultiple
              items={myBuddies}
              onClick={clickSearchedBuddyHandler}
            />
          </>
          )}
        </div>
      )}

    </>
  );
};
