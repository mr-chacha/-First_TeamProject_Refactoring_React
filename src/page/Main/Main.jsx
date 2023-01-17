import React from "react";
import { Mainstyle } from "./style";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Nav from "../../components/Nav/Nav";

function Main() {
  return (
    <div>
      <Header />
      <Nav />
      <Mainstyle>Main</Mainstyle>
      <Footer />
    </div>
  );
}

export default Main;
