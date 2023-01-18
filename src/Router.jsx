import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loginpage from "./page/Login/Loginpage";
import HomePage from "./page/Main/HomePage";
import SignupPage from "./page/Signup/SignupPage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="Login" element={<Loginpage />} />
        <Route path="Signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
