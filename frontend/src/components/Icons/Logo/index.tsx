import React, { FC } from "react";
import Link from "next/link";
import { Icon } from "../Icon";

import styles from "./styles.module.scss";

type Props = {
  filled?: boolean;
};

export const Logo: FC<Props> = ({ filled = true }) => {
  const logoStyle = filled ? styles["filled"] : styles["notFilled"];
  return (
    <div className={styles.logo}>
      <Link href="/">
        <a className={logoStyle}>
          <Icon iconName={"logo"} width={203} height={29} />
        </a>
      </Link>
    </div>
  );
};
