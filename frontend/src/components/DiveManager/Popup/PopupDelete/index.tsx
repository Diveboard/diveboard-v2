import React, { FC } from 'react';
import KebabButton from '../../../Buttons/KebabButton';

import styles from './styles.module.scss';

type Props = {
  popupTextHandler: () => void;
  deleteButtonHandler: () => void;
};

export const PopupDelete: FC<Props> = ({ deleteButtonHandler, popupTextHandler }) => (
  <>
    <div className={styles.text}>
      You cant restore it on undo this action
    </div>
    <div className={styles.wrapper}>
      <span className={styles.disagree} onClick={popupTextHandler}>
        No, keep it
      </span>
      <KebabButton
        className="popup"
        thirdClassName="popup__small"
        onClick={deleteButtonHandler}
      >
        Delete a Dive
      </KebabButton>
    </div>
  </>
);
