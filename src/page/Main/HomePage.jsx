import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Nav from "../../components/Nav/Nav";
import Main from "../../components/Main/Main";
import { HomePageLayout } from "./style";

function HomePage() {
  return (
    <HomePageLayout>
      <Main />
      <Footer />
    </HomePageLayout>
  );
}

export default HomePage;
