import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const gotoBack = () => {
    navigate("/");
  };
  const gotoSignup = () => {
    navigate("/Signup");
  };
  return (
    <div>
      Login 페이지임
      <button onClick={gotoBack}>뒤로가기</button>
      <button onClick={gotoSignup}>회원가입하러가기</button>
    </div>
  );
}

export default Login;
