import React, { FC } from 'react';

import styles from './styles.module.scss';

type Props = {
  children?: React.ReactNode;
  className?: string;
  thirdClassName?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset'
};

const KebabButton: FC<Props> = ({
  className,
  thirdClassName,
  disabled = false,
  onClick,
  children,
  type,
}) => (
  <button
    type={type}
    className={`${styles.button} ${styles[className]}  ${styles[thirdClassName]}`}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);

export default KebabButton;
