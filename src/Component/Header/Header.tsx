import React from "react";
import { useNavigate } from "react-router-dom";
import { Headerstyle } from "./style";
function Header() {
  const navigate = useNavigate();
  const gotoHone = () => {
    navigate("/");
  };
  return <Headerstyle onClick={gotoHone}>뉴스피드 리펙토링</Headerstyle>;
}

export default Header;
