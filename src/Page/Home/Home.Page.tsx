import React from "react";
import Footer from "../../Component/Footer/Footer";
import Main from "../../Component/Main/Main";
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
