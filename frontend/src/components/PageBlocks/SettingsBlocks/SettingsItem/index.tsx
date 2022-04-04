import React, {
  FC, useContext, useEffect, useState,
} from 'react';
import { EditContext } from '../EditContextWrapper';
import styles from './styles.module.scss';
import { getDynamicItemStyle } from './ItemDynamycStyle';

type Props = {
  title: string;
  titleMuted?: boolean;
  titleBlock: string;
};

export const SettingsItem: FC<Props> = ({
  title,
  titleMuted,
  titleBlock,
  children,
}) => {
  const [edited, setEdited] = useState(false);
  const { editedSettings, setEditedSettings } = useContext(EditContext);

  const {
    titleStyle, itemStyle, clickStyle, clickEditItem,
  } = getDynamicItemStyle(
    title,
    titleMuted,
    editedSettings,
  );

  const count = React.Children.count(children);

  if (count !== 2) {
    throw new Error('component mast contain two children');
  }

  const arrChildren = React.Children.toArray(children);
  const [notEditedChild, editedChild] = arrChildren;

  useEffect(() => {
    if (edited) {
      setEditedSettings(
        {
          settingsBlock: titleBlock,
          settingsItem: title,
        },
      );
    } else {
      setEditedSettings({ settingsBlock: '', settingsItem: '' });
    }
  }, [edited]);

  useEffect(() => {
    if (editedSettings.settingsItem === '') {
      setEdited(false);
    }
  }, [editedSettings]);

  return (
    <div className={itemStyle}>
      <div className={styles.header}>
        <span className={titleStyle}>{title}</span>
        <span
          className={clickStyle}
          onClick={() => {
            clickEditItem && setEdited(!edited);
          }}
        >
          {!edited ? 'Edit' : 'Cancel'}
        </span>
      </div>
      <div>
        {!edited ? notEditedChild : editedChild}
      </div>
    </div>
  );
};
