import React from "react";
import { NextPage } from "next";
import { MainLayout } from "../src/layouts/MainLayout";
import { SignInBlock } from "../src/components/SignInBlock";

const SigninSignup: NextPage = () => {
  return (
    <MainLayout>
      <SignInBlock />
    </MainLayout>
  );
};

export default SigninSignup;
