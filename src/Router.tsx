import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Component/Header/Header";
import Nav from "./Component/Nav/Nav";
import Loginpage from "./Page/Login/Login";
import HomePage from "./Page/Home/Home.Page";
import Mypage from "./Page/MyPage/MyPage";
import SignupPage from "./Page/Signup/Signup";

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
