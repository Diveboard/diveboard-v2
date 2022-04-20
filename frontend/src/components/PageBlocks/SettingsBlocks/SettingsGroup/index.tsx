import React, { FC, useContext } from 'react';
import { EditContext } from '../EditContextWrapper';
import styles from './styles.module.scss';
import editedStyles from '../editidStyle.module.scss';

type Props = {
  title?: string;
};
export const SettingsGroup: FC<Props> = ({
  title,
  children,
}) => {
  const { editedSettings } = useContext(EditContext);

  const edited = editedSettings.settingsBlock !== '';
  const currentBlockEdited = editedSettings.settingsBlock === title;

  const notEditedStyle = styles.title;
  const editedStyle = `${styles.title} ${editedStyles.edited}`;
  const currentBlockEditedStyle = `${styles.title} ${editedStyles.active}`;

  const isCurrentBlockEditedStyle = currentBlockEdited ? currentBlockEditedStyle : editedStyle;

  const titleStyle = edited
    ? isCurrentBlockEditedStyle
    : notEditedStyle;

  return (
    <div className={styles.groupWrapper}>
      {title && <h3 className={titleStyle}>{title}</h3>}
      {children}
    </div>
  );
};
