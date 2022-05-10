import React, {
  FC, useContext, useRef, useState,
} from 'react';
import { useRouter } from 'next/router';
import { MarginWrapper } from '../../MarginWrapper';
import { Input } from '../../Input/CommonInput';
import { Button } from '../../Buttons/Button';
import {
  getAuthorizedUserWithToken,
  getTokenAuth,
  sendCodeOnEmail,
} from '../../../firebase/auth/authService';
import { AuthCodeContext } from '../../../layouts/AuthCodeTimer';
import { AuthStatusContext } from '../../../layouts/AuthLayout';
import {
  firestorePublicProfileService,
} from '../../../firebase/firestore/firestoreServises/firestorePublicProfileService';
import {
  firestorePreferencesService,
} from '../../../firebase/firestore/firestoreServises/firestorePreferencesService';
import styles from './styles.module.scss';
import {
  firestoreNotificationService,
} from '../../../firebase/firestore/firestoreServises/firestoreNotificationService';
import { LogoIcon } from './Components/LogoIcon';
import { Title } from './Components/Title';
import { Description } from './Components/Description';
import { CheckBoxContent } from './Components/CheckBoxContent';
import { Loader } from '../../Loader';
import { setCookiesLogin } from '../../../utils/setCookiesLogin';
import { statusUserRedirect } from '../../../utils/statusUserRedirect';

export const SignInBlock: FC = () => {
  const router = useRouter();
  const { setUserAuth } = useContext(AuthStatusContext);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [isTermsChecked, setTermsChecked] = useState(false);
  const [isKeepLogged, setKeepLogged] = useState(false);
  const userEmail = useRef<{ email: string }>({ email: '' });
  const [mode, setMode] = useState<'login/signup' | 'signup' | 'login' | 'community'>(
    'login/signup',
  );
  const [loading, setLoading] = useState(false);
  const {
    availableCode,
    setExpiresTime,
  } = useContext(AuthCodeContext);
  const authCode = async () => {
    if (availableCode) {
      try {
        const {
          newUser,
          expiresAfter,
        } = await sendCodeOnEmail(inputValue);
        setExpiresTime(expiresAfter);

        if (newUser) {
          localStorage.setItem('diveBoardUser', 'newUser');
          setMode('signup');
        } else {
          setMode('login');
        }

        userEmail.current.email = inputValue;
        setInputValue('');
      } catch (e) {
        setError(e.message);
      }
    }
  };

  const authUser = async () => {
    try {
      const token = await getTokenAuth(userEmail.current.email, inputValue);

      const user = await getAuthorizedUserWithToken(token);

      if (user) {
        setCookiesLogin(isKeepLogged, user.uid);

        setUserAuth({
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL,
          name: user.displayName,
        });

        await firestorePublicProfileService.setEmail(user.email, user.uid);
        await firestorePreferencesService.setDefaultPreferences(user.uid);
        await firestoreNotificationService.setDefaultNotification(user.uid);

        await statusUserRedirect(mode, router.push, setMode);
      }
    } catch (e) {
      setError('invalid or expired code');
    }
  };

  const submit = async () => {
    setLoading(true);
    if (!inputValue.length) {
      return setError('empty value');
    }

    if (mode === 'login/signup') {
      const mailRegexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      if (!inputValue.match(mailRegexp)) {
        return setError('invalid mail value');
      }
      await authCode();
    } else if (mode === 'community') {
      await router.push('https://discord.gg/rkKFRjns');
    } else {
      const codeRegexp = /[0-9]{6}/;
      if (!inputValue.match(codeRegexp)) {
        return setError('invalid code value');
      }
      await authUser();
    }
    setLoading(false);
  };

  return (
    <div className={styles.signInWrapper}>
      <LogoIcon mode={mode} />
      <Title mode={mode} />
      <Description mode={mode} />
      <div className={styles.inputMargin} />

      {mode !== 'community' && (
        <Input
          value={inputValue}
          setValue={setInputValue}
          error={error}
          setError={setError}
          placeholder={
            mode === 'login/signup'
              ? 'Your Email'
              : 'Enter the code from your email'
          }
          iconName={mode === 'login/signup' && 'email'}
        />
      )}

      <div
        className={styles.checkboxWrapper}
      >
        <CheckBoxContent
          mode={mode}
          isTermsChecked={isTermsChecked}
          setTermsChecked={setTermsChecked}
          isKeepLogged={isKeepLogged}
          setKeepLogged={setKeepLogged}
        />
      </div>

      <MarginWrapper top={10}>
        <Button
          width={250}
          height={56}
          borderRadius={30}
          border="none"
          backgroundColor="#FDC90D"
          disable={(mode === 'signup' && !isTermsChecked) || loading}
          onClick={submit}
        >
          {loading && <Loader loading={loading} />}
          {mode === 'login/signup' && (
            <span className={styles.btnText}>Send Code</span>
          )}
          {mode === 'signup' && (
            <span className={styles.btnText}>Register</span>
          )}
          {mode === 'login' && <span className={styles.btnText}>Log In</span>}
          {mode === 'community' && <span className={styles.btnText}>Join on Discord</span>}
        </Button>
      </MarginWrapper>

      {(mode === 'signup' || mode === 'login') && (
        <MarginWrapper top={20}>
          <span className={styles.commonText}> Didn’t get a code?</span>
          <span
            className={availableCode ? styles.coloredText : styles.disabledText}
            onClick={authCode}
          >
            Resend a Code
          </span>
        </MarginWrapper>
      )}
    </div>
  );
};
