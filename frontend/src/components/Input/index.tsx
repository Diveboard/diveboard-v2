import React, { FC } from "react";
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
  return (
    <div className={styles.inputWrapper}>
      <input
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        className={styles.input}
        placeholder={placeholder}
      />

      {showIcon && (
        <div className={styles.icon}>
          <Icon iconName={"email"} />
        </div>
      )}
    </div>
  );
};
