import React from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';

export const AboutMembers = () => (
  <div className={styles.aboutMembersWrapper}>
    <div className={styles.imageBlock}>
      <Image src="/images/members-1.jpg" width={570} height={657} />
      <Image src="/images/members-2.jpg" width={420} height={478} />
    </div>

    <div className={styles.membersBlock}>
      <div className={styles.memberItem}>
        <h3>Alexander Casassovici</h3>
        <p>
          Alex is a serial entrepreneur, occasional code monkey (especially since the start of
          Diveboard).
          He got hooked to diving while passing his PADI openwater on the French Riviera. He's now a
          CMAS 2* As a computer geek he loves the metrics and the gadgets - he got his hands early
          on a Mares M2 dive computer and a underwater housing for his Olympus µ camera. Probably
          time to upgrade both of those!
          Alex focuses on the Web and cuddles the servers.
        </p>
      </div>
      <div className={styles.memberItem}>
        <h3>Pascal Manchon</h3>
        <p>
          Pascal has been spending a lot of time doing IT Project/Program Management for big
          corporations, especially for Telco operators.
          DiveBoard has been the highly inspiring occasion of reconnecting with first loves: coding
          C++ and HTML/Javascript.
          He discovered scuba diving a few years ago and really got addicted when diving on
          especially beautiful sites like the Great Barrier Reef in Australia. Now he's always
          looking for places where to go next!
        </p>
      </div>
      <div className={styles.memberItem}>
        <h3>Richard Magness</h3>
        <p>
          Richard is the design wiz. He is the mastermind behind the "WOW" effect of Diveboard.
        </p>
      </div>
    </div>
  </div>
);
