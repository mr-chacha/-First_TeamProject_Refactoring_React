import React from "react";
import { useNavigate } from "react-router-dom";
import { NavStyle, Login } from "./style";

function Nav() {
  const navigate = useNavigate();
  const gotoLogin = () => {
    navigate("Login");
  };
  const gotoSignup = () => {
    navigate("Signup");
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
      <button onClick={gotoSignup}>회원가입</button>
      <button>마이페이지</button>
    </NavStyle>
  );
}

export default Nav;
