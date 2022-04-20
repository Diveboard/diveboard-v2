import React, { FC } from 'react';
import styles from '../styles.module.scss';
import { Checkbox } from '../../../CheckBox';

type Props = {
  mode:'login/signup' | 'signup' | 'login' | 'community';
  setTermsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  isTermsChecked: boolean;
  setKeepLogged: React.Dispatch<React.SetStateAction<boolean>>;
  isKeepLogged: boolean;
};

export const CheckBoxContent: FC<Props> = ({
  mode, isTermsChecked, setTermsChecked, isKeepLogged, setKeepLogged,
}) => (
  <>
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
  </>
);
