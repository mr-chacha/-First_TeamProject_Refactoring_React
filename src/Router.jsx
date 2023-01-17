import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./page/Login/Login";
import Main from "./page/Main/Main";
import Signup from "./page/Signup/Signup";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="Login" element={<Login />} />
        <Route path="Signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
