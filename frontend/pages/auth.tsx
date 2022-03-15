import React from "react";
import { NextPage } from "next";
import { MainLayout } from "../src/layouts/MainLayout";
import { SignInBlock } from "../src/components/SignInBlock";

const Auth: NextPage = () => {
  return (
    <MainLayout>
      <SignInBlock />
    </MainLayout>
  );
};

export default Auth;
