import React from "react";
import { useNavigate } from "react-router-dom";
import { NavStyle, Login } from "./style";

function Nav() {
  const navigate = useNavigate();
  const gotoLogin = () => {
    navigate("Login");
  };
  return (
    <NavStyle>
      <Login>
        <form>
          ID :
          <input />
          FW :
          <input />
        </form>
      </Login>
      <button onClick={gotoLogin}>로그인</button>
      <button>마이페이지</button>
    </NavStyle>
  );
}

export default Nav;
