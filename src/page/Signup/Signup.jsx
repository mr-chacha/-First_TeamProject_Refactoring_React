import React from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const gotoBack = () => {
    navigate("/");
  };
  const gotoLogin = () => {
    navigate("/Login");
  };
  return (
    <div>
      회원가입하삼
      <button onClick={gotoLogin}>로그인하삼</button>
      <button onClick={gotoBack}>뒤로가기</button>
    </div>
  );
}

export default Signup;
