import React, { FC } from "react";
import styles from "./styles.module.scss";

type Props = {
  backgroundColor?: string;
  borderRadius?: number;
  border?: string;
  width: number;
  height: number;
  onClick?: () => void;
};

export const Button: FC<Props> = ({
  onClick,
  backgroundColor,
  borderRadius,
  border,
  height,
  width,
  children,
}) => {
  const buttonStyle = {
    backgroundColor,
    borderRadius: `${borderRadius}px`,
    border,
    width: `${width}px`,
    height: `${height}px`,
  };
  return (
    <button onClick={onClick} style={buttonStyle} className={styles.button}>
      {children}
    </button>
  );
};
