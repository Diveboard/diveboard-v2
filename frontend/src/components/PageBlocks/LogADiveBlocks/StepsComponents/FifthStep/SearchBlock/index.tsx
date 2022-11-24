import React, { FC, useState } from 'react';
import { Input } from '../../../../../Input/CommonInput';
import { SearchedItems } from '../../../../../Dropdown/SearchedItems';
import { ButtonGroup } from '../../../../../ButtonGroup';

type Props = {
  title: string;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  recommendedItems: { text: string, connectedMode: string, imgSrc?: string }[]
  onSearchHandler: (value: string) => Promise<{ id: string | number, name: string }[]>;
};

export const SearchBlock: FC<Props> = (
  {
    title, inputValue, setInputValue, recommendedItems, onSearchHandler,
  },
) => {
  const [focus, setFocus] = useState(false);
  return (
    <div>
      <h3>
        {title}
      </h3>
      <Input
        value={inputValue}
        setValue={setInputValue}
        placeholder={`Type to fined ${title}`}
        width={570}
        height={48}
        onFocusChange={setFocus}
      />

      <div style={{
        position: 'relative',
        maxWidth: '570px',
        height: '2px',
      }}
      >
        <div style={{
          position: 'absolute', left: '0', right: '0', top: '-50px',
        }}
        >
          <SearchedItems
            value={inputValue}
            setValue={setInputValue}
            onSearchHandler={onSearchHandler}
            focus={focus}
          />
        </div>

      </div>

      {!!recommendedItems.length && (
      <div style={{ margin: '10px 0' }}>
        <p>recommended:</p>
        <ButtonGroup
          buttons={
            recommendedItems
          }
          onClick={(buttonName) => {
            setInputValue(buttonName);
          }}
          contentBehavior="wrap"
        />
      </div>
      )}
    </div>
  );
};
