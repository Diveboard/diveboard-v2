import React, { FC, useContext, useState } from 'react';

import { Button } from '../../../../../Buttons/Button';
import { Input } from '../../../../../Input/CommonInput';
import { PasswordInput } from '../../../../../Input/PasswordInput';
import { SaveThisButton } from '../SaveThisButton';
import { Loader } from '../../../../../Loader';

import { AuthStatusContext } from '../../../../../../layouts/AuthLayout';
import { EditContext } from '../../../EditContextWrapper';
import { AuthCodeContext } from '../../../../../../layouts/AuthCodeTimer';

import {
  confirmCodeOfNewEmail,
  sendCodeOnNewEmail,
} from '../../../../../../firebase/user/userService';
import { getAuthorizedUserWithToken } from '../../../../../../firebase/auth/authService';
import {
  firestorePublicProfileService,
} from '../../../../../../firebase/firestore/firestoreServices/firestorePublicProfileService';

import styles from './styles.module.scss';
import editedStyle from '../../../editidStyle.module.scss';
import { UserSettingsType } from '../../../../../../firebase/firestore/models';

type Props = {
  userEmail: string;
  setUserInfo: React.Dispatch<React.SetStateAction<UserSettingsType>>
};

export const EditedProfileEmail: FC<Props> = ({ userEmail, setUserInfo }) => {
  const {
    userAuth,
    setUserAuth,
  } = useContext(AuthStatusContext);
  const { setEditedSettings } = useContext(EditContext);
  const { availableCode, setExpiresTime } = useContext(AuthCodeContext);
  const [emailValue, setEmailValue] = useState(userEmail);
  const [mailError, setMailError] = useState('');
  const [codeValue, setCodeValue] = useState('');
  const [codeError, setCodeError] = useState('');
  const [mode, setMode] = useState<'email' | 'code'>('email');
  const [codeLoading, setCodeLoading] = useState(false);
  const [mailLoading, setMailLoading] = useState(false);

  const sendCode = async () => {
    if (!emailValue.length) {
      return setMailError('empty value');
    }

    const mailRegexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!emailValue.match(mailRegexp)) {
      return setMailError('invalid mail value');
    }
    setMailLoading(true);

    const { expiresAfter } = await sendCodeOnNewEmail(emailValue) as { expiresAfter: number };
    if (expiresAfter) {
      setExpiresTime(expiresAfter);
    }
    setMailLoading(false);
    setMode('code');
  };

  const confirmCode = async () => {
    const codeRegexp = /[0-9]{6}/;
    if (!codeValue.match(codeRegexp)) {
      return setCodeError('invalid code value');
    }
    setCodeLoading(true);
    const { token } = await confirmCodeOfNewEmail(emailValue, codeValue) as { token: string };

    const user = await getAuthorizedUserWithToken(token);
    if (user) {
      setUserAuth({
        ...userAuth,
        email: emailValue,
      });

      await firestorePublicProfileService.setEmail(emailValue, userAuth.uid);
      setUserInfo((prev) => ({ ...prev, email: emailValue }));
      setCodeLoading(false);
      setExpiresTime(null);
      setEditedSettings({
        settingsBlock: '',
        settingsItem: '',
      });
    } else {
      setCodeError('update user email error');
    }
  };

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
          iconName="email"
          placeholder="Your New Email"
          disabled={!availableCode}
          error={mailError}
          setError={setMailError}
        />
      </div>
      <Button
        onClick={
          sendCode
        }
        border="none"
        borderRadius={30}
        backgroundColor="#0059DE"
        width={193}
        height={48}
        disable={mailLoading || !emailValue || !!mailError || !availableCode}
      >
        <Loader loading={mailLoading} />
        <span className={styles.getCodeText}>
          {availableCode && mode === 'code' ? 'Get a Code' : 'Resend Code'}
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
          error={codeError}
          setError={setCodeError}
        />
      </div>
      <SaveThisButton
        onClick={confirmCode}
        disabled={mode === 'email' || codeLoading || !!codeError}
        loading={codeLoading}
      />
    </div>
  );
};
