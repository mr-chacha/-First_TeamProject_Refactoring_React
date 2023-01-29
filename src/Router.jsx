import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import Loginpage from "./page/Login/Loginpage";
import HomePage from "./page/Main/HomePage";
import Mypage from "./page/MyPage/Mypage";
import SignupPage from "./page/Signup/SignupPage";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="Login" element={<Loginpage />} />
        <Route path="Signup" element={<SignupPage />} />
        <Route path="MyPage" element={<Mypage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
