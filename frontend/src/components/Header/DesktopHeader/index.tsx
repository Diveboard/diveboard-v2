import React from "react";
import { Dropdown } from "../../Dropdown";
import { LogDive, ViewLogbook } from "../../Icons/IconSVGComponents";
import { Logo } from "../../Icons/Logo/DesktopLogo";
import { Icon } from "../../Icons/Icon";
import Link from "next/link";
import { Button } from "../../Buttons/Button";
import { useRouter } from "next/router";
import pagesRouts from "../../../routs/pagesRouts.json";
import styles from "./style.module.scss";

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

        <Dropdown imgName="logbook" title="Logbook" items={logbookItems} />

        <Link href="/">
          <a>
            <Icon iconName="wallet" />
          </a>
        </Link>
      </div>

      <div className={styles.rightGroup}>
        <Link href="/">
          <a>
            <Icon iconName={"search"} />
          </a>
        </Link>
        <Button
          width={206}
          height={56}
          borderRadius={30}
          border="2px solid #000345"
          backgroundColor="transparent"
          onClick={() => {
            router.push(pagesRouts.authPageRout);
          }}
        >
          <span className={styles.btnText}>Log In / Sign Up</span>
        </Button>
      </div>
    </header>
  );
};
