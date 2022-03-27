import React, { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  backgroundColor?: string;
  borderRadius?: number;
  border?: string;
  width?: number;
  height?: number;
  disable?: boolean;
  onClick?: () => void;
};

export const Button: FC<Props> = ({
  onClick,
  backgroundColor,
  borderRadius,
  border,
  height,
  width,
  disable,
  children,
}) => {
  const buttonStyle = {
    backgroundColor: !disable ? backgroundColor : ' #E3E3E3',
    opacity: !disable ? '1' : '0.25',
    borderRadius: `${borderRadius}px`,
    border,
    width: `${width}px`,
    height: `${height}px`,
  };
  return (
    <button
      onClick={onClick}
      style={buttonStyle}
      className={styles.button}
      disabled={disable}
    >
      {children}
    </button>
  );
};
