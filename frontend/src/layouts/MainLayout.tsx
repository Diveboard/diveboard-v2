import React, { FC } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const MainLayout: FC = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

