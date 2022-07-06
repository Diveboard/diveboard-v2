import React, { FC } from 'react';
import KebabButton from '../../../Buttons/KebabButton';

import styles from './styles.module.scss';

type Props = {
  popupTextHandler: () => void;
  unpublishButtonHandler: () => void;
};

export const PopupUnpublish: FC<Props> = ({
  unpublishButtonHandler,
  popupTextHandler,
}) => (
  <>
    <div className={styles.text}>
      You can find it at Drafts tab, edit it or publish again if need be.
    </div>
    <div className={styles.wrapper}>
      <span className={styles.disagree} onClick={popupTextHandler}>
        No, keep it
      </span>
      <KebabButton
        className="popup"
        thirdClassName="popup__small"
        onClick={unpublishButtonHandler}
      >
        Unpublish Dive
      </KebabButton>
    </div>
  </>
);
