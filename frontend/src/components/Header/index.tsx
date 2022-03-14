import React from "react";
import { Dropdown } from "../Dropdown";
import { MarginWrapper } from "../MarginWrapper";
import { LogDive, ViewLogbook } from "../Icons/IconSVGComponents";
import { Logo } from "../Icons/Logo";
import { Icon } from "../Icons/Icon";

import styles from "./style.module.scss";
import Link from "next/link";
import { Button } from "../Buttons/Button";
import { useRouter } from "next/router";

export const Header = (): JSX.Element => {
  const router = useRouter();
  const logbookItems = [
    {
      id: 1,
      svgItem: <LogDive />,
      title: "Log a New Dive",
      link: "/",
    },
    {
      id: 2,
      svgItem: <ViewLogbook />,
      title: "View a Logbook",
      link: "/",
    },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.leftGroup}>
        <Logo />
        <MarginWrapper left={50}>
          <Dropdown imgName="logbook" title="Logbook" items={logbookItems} />
        </MarginWrapper>
        <MarginWrapper left={50}>
          <Link href="/">
            <a>
              <Icon iconName="wallet" />
            </a>
          </Link>
        </MarginWrapper>
      </div>

      <div className={styles.rightGroup}>
        <MarginWrapper right={40}>
          <Link href="/">
            <a>
              <Icon iconName={"search"} />
            </a>
          </Link>
        </MarginWrapper>
        <Button
          width={206}
          height={56}
          borderRadius={30}
          border="2px solid #000345"
          backgroundColor="transparent"
          onClick={() => {
            router.push("/");
          }}
        >
          <span className={styles.btnText}>Log In / Sign Up</span>
        </Button>
      </div>
    </header>
  );
};
