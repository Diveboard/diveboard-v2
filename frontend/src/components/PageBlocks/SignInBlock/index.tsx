import React, {
  FC, useContext, useRef, useState,
} from 'react';
import { useRouter } from 'next/router';
import { Icon } from '../../Icons/Icon';
import { MarginWrapper } from '../../MarginWrapper';
import { Input } from '../../Input/CommonInput';
import { Button } from '../../Buttons/Button';
import { Checkbox } from '../../CheckBox';
import {
  getAuthorizedUserWithToken,
  getTokenAuth,
  sendCodeOnEmail,
  setAuthKeepLogged,
} from '../../../firebase/auth/authService';
import { AuthCodeContext } from '../../../layouts/AuthCodeTimer';
import { AuthStatusContext } from '../../../layouts/AuthLayout';
import styles from './styles.module.scss';

export const SignInBlock: FC = () => {
  const router = useRouter();
  const { setUserAuth } = useContext(AuthStatusContext);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [isTermsChecked, setTermsChecked] = useState(false);
  const [isKeepLogged, setKeepLogged] = useState(false);
  const userEmail = useRef<{ email: string }>({ email: '' });
  const [mode, setMode] = useState<'login/signup' | 'signup' | 'login'>(
    'login/signup',
  );
  const [availableCode, setAvailableCode] = useContext(AuthCodeContext);

  const authCode = async () => {
    if (availableCode) {
      try {
        const newUser = await sendCodeOnEmail(inputValue);

        if (newUser) {
          setMode('signup');
        } else {
          setMode('login');
        }

        userEmail.current.email = inputValue;
        setInputValue('');
        setAvailableCode(false);
      } catch (e) {
        setError(e.message);
      }
    }
  };

  const authUser = async () => {
    try {
      const token = await getTokenAuth(userEmail.current.email, inputValue);
      await setAuthKeepLogged(isKeepLogged);
      const user = await getAuthorizedUserWithToken(token);
      if (user) {
        setUserAuth({
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL,
          name: user.displayName,
        });
        await router.push('/');
      }
    } catch (e) {
      setError('invalid or expired code');
    }
  };

  const submit = async () => {
    if (!inputValue.length) {
      return setError('empty value');
    }

    if (mode === 'login/signup') {
      const mailRegexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      if (!inputValue.match(mailRegexp)) {
        return setError('invalid mail value');
      }
      await authCode();
    } else {
      const codeRegexp = /[0-9]{6}/;
      if (!inputValue.match(codeRegexp)) {
        return setError('invalid code value');
      }
      await authUser();
    }
  };

  return (
    <div className={styles.signInWrapper}>
      {mode !== 'login' ? (
        <Icon iconName="signup" size={70} />
      ) : (
        <Icon iconName="login" size={70} />
      )}

      {mode === 'login/signup' && (
        <h1 className={styles.title}>Login /Signup</h1>
      )}
      {mode === 'signup' && <h1 className={styles.title}>Signup</h1>}
      {mode === 'login' && <h1 className={styles.title}>Login</h1>}

      <p className={styles.text}>
        Here you can log all of you dives. Please, register to track your dives
        and share your experience with others
      </p>

      <div className={styles.inputMargin} />

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

      <div
        className={styles.checkboxWrapper}
      >
        {mode === 'login/signup' && (
          <p className={styles.conformationText}>
            We’ll send a Confirmation code to your email
          </p>
        )}
        {mode === 'signup' && (

        <Checkbox name="terms-of-service" onChecked={setTermsChecked} checked={isTermsChecked}>
          <span className={styles.commonText}> I accept </span>
          <span
            className={styles.coloredText}
            onClick={() => {
            }}
          >
            Terms of Services
          </span>
        </Checkbox>
        )}

        {mode === 'login' && (
        <Checkbox name="keep-logged" onChecked={setKeepLogged} checked={isKeepLogged}>
          <span className={styles.commonText}> Keep me Logged In </span>
        </Checkbox>
        )}
      </div>

      <MarginWrapper top={10}>
        <Button
          width={250}
          height={56}
          borderRadius={30}
          border="none"
          backgroundColor="#FDC90D"
          disable={mode === 'signup' && !isTermsChecked}
          onClick={submit}
        >
          {mode === 'login/signup' && (
            <span className={styles.btnText}>Send Code</span>
          )}
          {mode === 'signup' && (
            <span className={styles.btnText}>Register</span>
          )}
          {mode === 'login' && <span className={styles.btnText}>Log In</span>}
        </Button>
      </MarginWrapper>

      {(mode === 'signup' || mode === 'login') && (
        <MarginWrapper top={20}>
          <span className={styles.commonText}> Didn’t get a code?</span>
          {' '}
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
