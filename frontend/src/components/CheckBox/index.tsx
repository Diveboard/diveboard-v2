import React, { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  name: string;
  onChecked: React.Dispatch<React.SetStateAction<boolean>>;
  checked: boolean;
  className?: string;
};

export const Checkbox: FC<Props> = ({
  name,
  onChecked,
  checked,
  children,
  className,
}) => {
  const classNameDefinition = (classtitle: string) => (className
    ? `${styles[className]} ${styles[classtitle]} `
    : styles[classtitle]);

  return (
    <div className={classNameDefinition('checkboxWrapper')}>
      <input
        className={classNameDefinition('checkbox')}
        type="checkbox"
        id={name}
        name={name}
        onChange={(e) => {
          onChecked(e.target.checked);
        }}
        checked={checked}
      />
      <label htmlFor={name} className={classNameDefinition('label')}>
        {children}
      </label>
    </div>
  );
};
