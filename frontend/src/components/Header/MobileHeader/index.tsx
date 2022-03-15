import React, { FC } from "react";
import { LogoMobile } from "../../Icons/Logo/MobileLogo";
import { Icon } from "../../Icons/Icon";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import pagesRouts from "../../../routs/pagesRouts.json";
import { MarginWrapper } from "../../MarginWrapper";

export const MobileHeader: FC = () => {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <LogoMobile />
      <MarginWrapper right={15}>
        <div
          className={styles.signUpBtn}
          onClick={() => {
            router.push(pagesRouts.authPageRout);
          }}
        >
          <Icon iconName={"signup-ico"} size={20} />
          <span>Sign Up</span>
        </div>
      </MarginWrapper>
    </header>
  );
};
