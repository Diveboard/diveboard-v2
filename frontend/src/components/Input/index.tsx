import React, { FC, useState } from "react";
import styles from "./styles.module.scss";
import { Icon } from "../Icons/Icon";

type Props = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  showIcon?: boolean;
};

export const Input: FC<Props> = ({
  value,
  setValue,
  placeholder,
  showIcon = true,
}) => {
  const [error, setError] = useState("bala bala");
  const getInputStyle = (error: string) => {
    if (error) {
      return `${styles["input"]} ${styles["error"]}`;
    }
    return styles["input"];
  };
  return (
    <div className={styles.inputWrapper}>
      <input
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          setError("");
        }}
        className={getInputStyle(error)}
        placeholder={placeholder}
      />
      <span className={styles.errorText}>{error}</span>

      {showIcon && (
        <div className={styles.icon}>
          <Icon iconName={"email"} />
        </div>
      )}
    </div>
  );
};
