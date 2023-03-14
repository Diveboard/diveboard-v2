import React from 'react';
import { useRouter } from 'next/router';
import styles from './styles.module.scss';
import { Icon } from '../../../../Icons/Icon';
import { Button } from '../../../../Buttons/Button';

export const CongratsStep = () => {
  const router = useRouter();

  return (
    <>
      <div className={styles.container}>
        <h1>Congratulations!</h1>
        <p>
          Your dive has been successfully published. You can view it here.
          <br />
          <br />
          Help keep Diveboard kickin’ !
          Diveboard is a non-profit and relies on your
          generous support to keep the platform running.
          <br />
          <br />
          Donate today, and wear the “patron” badge on your profile!
        </p>
        <div className={styles.btnWrapper}>
          <Button
            width={340}
            height={48}
            borderRadius={30}
            border="none"
            backgroundColor="#FDC90D"
            onClick={() => router.push('/donate')}
          >
            <span className={styles.btnText}> $3 per month for 12 months </span>
          </Button>

          <Button
            width={340}
            height={48}
            borderRadius={30}
            border="none"
            marginTop={12}
            backgroundColor="#FDC90D"
            onClick={() => router.push('/donate')}
          >
            <span className={styles.btnText}> $5 per month for 12 months </span>
          </Button>

          <Button
            width={340}
            height={48}
            borderRadius={30}
            border="none"
            marginTop={12}
            backgroundColor="#FDC90D"
            onClick={() => router.push('/donate')}
          >
            <span className={styles.btnText}> Custom Donation</span>
          </Button>

        </div>
      </div>
      <div className={styles.stepsNavWrapper}>
        <div className={styles.stepsNav}>
          <Button
            onClick={() => router.push('/log-dive?isNew=true')}
            height={32}
            width={104}
            borderRadius={30}
            border="none"
            backgroundColor="#F0F6FF"
            disable={false}
          >
            <Icon iconName="left-arrow" />
            <span className={styles.leftBtn}>
              Previous
            </span>
          </Button>
          <span onClick={() => router.push('/dive-manager')}>No, thanks</span>
        </div>
      </div>
    </>
  );
};
