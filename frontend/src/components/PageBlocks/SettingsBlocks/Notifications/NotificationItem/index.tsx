import React, { FC } from 'react';
import { Checkbox } from '../../../../CheckBox';
import styles from './styles.module.scss';

type Props = {
  title: string;
  description: string;
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>
};
export const NotificationItem: FC<Props> = ({
  title, description, checked, setChecked,
}) => (
  <div className={styles.itemWrapper}>
    <Checkbox name={title} onChecked={setChecked} checked={checked}>
      <span className={styles.label}>
        {title}
      </span>
    </Checkbox>
    <span className={styles.description}>{description}</span>
  </div>
);
