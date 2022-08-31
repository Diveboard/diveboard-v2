import styles from './styles.module.scss';
import editedStyles from '../editidStyle.module.scss';

const notEditedItemStyle = styles.item;
const editedStyle = `${styles.item} ${editedStyles.edited}`;
const currentBlockEditedStyle = `${styles.item} ${editedStyles.active}`;

export const getDynamicItemStyle = (
  title: string,
  titleMuted: boolean,
  editedSettings: { settingsItem: string },
) => {
  const titleStyle = titleMuted ? styles.mutedTitle : styles.title;

  const notEditedItem = editedSettings.settingsItem === '';
  const editedItem = editedSettings.settingsItem !== '';
  const currentItemEdited = editedSettings.settingsItem === title;

  const isCurrentItemEditedStyle = currentItemEdited ? currentBlockEditedStyle : editedStyle;

  const itemStyle = editedItem
    ? isCurrentItemEditedStyle
    : notEditedItemStyle;

  const clickEditItem = notEditedItem || currentItemEdited;
  const clickStyle = clickEditItem ? `${styles.click} ${styles.edit}` : styles.edit;

  return {
    titleStyle, itemStyle, clickStyle, clickEditItem,
  };
};
