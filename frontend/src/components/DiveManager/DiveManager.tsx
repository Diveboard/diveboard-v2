import React, { useRef, useState } from 'react';

import { ButtonGroup } from '../ButtonGroup';
import KebabButton from '../Buttons/KebabButton/KebabButton';
import { Checkbox } from '../CheckBox';
import { SetDropdown } from '../Dropdown/SetDropdown/setdropdown';
import { Icon } from '../Icons/Icon';
import DaveItem from './DiveItem/DiveItem';
import { DUMMY_DATA, dropdownList, buttons } from './DiveData';

import classes from './DiveManager.module.scss';

const DiveManager = () => {
  const [diveMode, setDiveMode] = useState<'recent' | 'oldest' | 'drafts'>(
    'recent',
  );
  const [checkboxItem, setCheckboxItem] = useState(false);
  const [isChangeSelectAll, setChangeSelectAll] = useState(false);
  const [isShowSettings, setShowSettings] = useState(false);
  const dropdownButton = useRef(null); // button block

  const kebabButtonHandler = () => {
    setShowSettings(() => !isShowSettings);
  };

  const hideDropdown = (status: boolean) => {
    setShowSettings(status);
  };

  const changeSelectAllHandler = () => {
    // if click another checkbox
    setCheckboxItem(() => !checkboxItem);
    setChangeSelectAll(false); // checkbox "Select All" was`t click
  };

  const checkboxHandler = () => {
    // if click checkbox "Select All"
    setCheckboxItem(() => !checkboxItem);
    setChangeSelectAll(true); // checkbox "Select All" was click
  };

  const renderDives = () => DUMMY_DATA.map((itm) => (
    <DaveItem
      key={itm.id}
      itm={itm}
      isSelectAll={checkboxItem}
      changeIsSelectAll={changeSelectAllHandler}
      isChange={isChangeSelectAll}
    />
  ));

  return (
    <section className={classes.wrapper}>
      <div className={classes.title}>Dive Manager</div>
      <div className={classes.wrapper__buttons}>
        <ButtonGroup mode={diveMode} setMode={setDiveMode} buttons={buttons} />

        <div ref={dropdownButton} className={classes.buttones}>
          <KebabButton className="kebab" onClick={kebabButtonHandler}>
            Settings
            <Icon iconName="kebab" width={16} height={16} />
          </KebabButton>
        </div>
        {isShowSettings && (
          <SetDropdown
            dropdownList={dropdownList}
            dropdownButton={dropdownButton}
            hideDropdown={hideDropdown}
          />
        )}
      </div>
      <div className={classes.checkbox}>
        <Checkbox
          name="name"
          className="column"
          checked={checkboxItem}
          onChecked={checkboxHandler}
        >
          Select All
        </Checkbox>
      </div>
      <div className={classes.divelist}>{renderDives()}</div>
    </section>
  );
};

export default DiveManager;
