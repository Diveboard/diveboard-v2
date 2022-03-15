import React, { useState } from "react";
import { Icon } from "../Icons/Icon";
import { MarginWrapper } from "../MarginWrapper";
import { Input } from "../Input";
import { Button } from "../Buttons/Button";
import { Checkbox } from "../CheckBox";

import styles from "./styles.module.scss";

export const SignInBlock = () => {
  const [inputValue, setInputValue] = useState("");
  const [isTermsChecked, setTermsChecked] = useState(false);
  const [isLoggedChecked, setLoggedChecked] = useState(false);

  const [mode, setMode] = useState<"login/signup" | "signup" | "login">(
    "login/signup"
  );
  return (
    <div className={styles.signInWrapper}>
      {mode !== "login" ? (
        <Icon iconName={"signup"} size={70} />
      ) : (
        <Icon iconName={"login"} size={70} />
      )}

      {mode === "login/signup" && (
        <h1 className={styles.title}>Login /Signup</h1>
      )}
      {mode === "signup" && <h1 className={styles.title}>Signup</h1>}
      {mode === "login" && <h1 className={styles.title}>Login</h1>}

      <p className={styles.text}>
        Here you can log all of you dives. Please, register to track your dives
        and share your experience with others
      </p>

      <div className={styles.inputMargin} />
      <Input
        value={inputValue}
        setValue={setInputValue}
        placeholder={
          mode === "login/signup"
            ? "Your Email"
            : "Enter the code from your email"
        }
        showIcon={mode === "login/signup"}
      />

      <MarginWrapper top={10}>
        {mode === "login/signup" && (
          <p className={styles.conformationText}>
            We’ll send a Confirmation code to your email
          </p>
        )}
        {mode === "signup" && (
          <div className={styles.checkboxWrapper}>
            <Checkbox name={"terms-of-service"} onChecked={setTermsChecked}>
              <span className={styles.commonText}> I accept </span>{" "}
              <span className={styles.coloredText} onClick={() => {}}>
                Terms of Services
              </span>
            </Checkbox>
          </div>
        )}
        {mode === "login" && (
          <div className={styles.checkboxWrapper}>
            <Checkbox name={"keep-logged"} onChecked={setLoggedChecked}>
              <span className={styles.commonText}> Keep me Logged In </span>
            </Checkbox>
          </div>
        )}
      </MarginWrapper>

      <MarginWrapper top={10}>
        <Button
          width={250}
          height={56}
          borderRadius={30}
          border="none"
          backgroundColor="#FDC90D"
          onClick={() => {}}
        >
          {mode === "login/signup" && (
            <span className={styles.btnText}>Send Code</span>
          )}
          {mode === "signup" && (
            <span className={styles.btnText}>Register</span>
          )}
          {mode === "login" && <span className={styles.btnText}>Log In</span>}
        </Button>
      </MarginWrapper>

      {(mode === "signup" || mode === "login") && (
        <MarginWrapper top={20}>
          <span className={styles.commonText}> Didn’t get a code?</span>{" "}
          <span className={styles.coloredText} onClick={() => {}}>
            Resend a Code
          </span>
        </MarginWrapper>
      )}
    </div>
  );
};
