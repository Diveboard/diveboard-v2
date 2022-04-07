import React, { useState } from 'react';
import { Button } from '../../../../../Buttons/Button';
import { Input } from '../../../../../Input/CommonInput';
import { PasswordInput } from '../../../../../Input/PasswordInput';
import { SaveThisButton } from '../SaveThisButton';
import styles from './styles.module.scss';
import editedStyle from '../../../editidStyle.module.scss';

export const EditedProfileEmail = () => {
  const [emailValue, setEmailValue] = useState('');
  const [codeValue, setCodeValue] = useState('');
  const [mode, setMode] = useState<'email' | 'code'>('email');

  return (
    <div>
      <div className={
        mode === 'email'
          ? styles.inputWrapper
          : `${styles.inputWrapper} ${editedStyle.edited}`
        }
      >
        <Input
          value={emailValue}
          setValue={setEmailValue}
          padding="11px 16px 11px 54px"
          iconName="email"
          placeholder="Your New Email"
          disabled={mode === 'code'}
        />
      </div>
      <Button
        onClick={() => {
          setMode('code');
        }}
        border="none"
        borderRadius={30}
        backgroundColor="#0059DE"
        width={193}
        height={48}
        disable={mode === 'code'}
      >
        <span className={styles.getCodeText}>
          Get a Code
        </span>
      </Button>

      <div className={
        mode === 'code'
          ? styles.codeWrapper
          : `${styles.codeWrapper} ${editedStyle.edited}`
        }
      >
        <div className={styles.confirm}>Confirm Changes*</div>
        <PasswordInput
          value={codeValue}
          setValue={setCodeValue}
          padding="11px 54px"
          iconName="lock"
          placeholder="Enter the code from your email"
          disabled={mode === 'email'}
        />
      </div>
      <SaveThisButton onClick={() => {}} disabled={mode === 'email'} />
    </div>
  );
};
