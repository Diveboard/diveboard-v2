import React, { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  backgroundColor?: string;
  marginTop?: number;
  borderRadius?: number;
  border?: string;
  width?: number;
  height?: number;
  disable?: boolean;
  color?: string;
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
    marginTop,
    color,
  children,
}) => {
  const buttonStyle = {
    backgroundColor: !disable ? backgroundColor : ' #E3E3E3',
    opacity: !disable ? '1' : '0.25',
    borderRadius: `${borderRadius}px`,
    border,
    width: `${width}px`,
    height: `${height}px`,
    marginTop:`${marginTop}px`,
    color: '#000345'
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
