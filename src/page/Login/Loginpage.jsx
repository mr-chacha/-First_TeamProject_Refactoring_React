import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LogingLayout,
  LoginBox,
  LoginTitle,
  InputBox,
  BtnBox,
  CheckMsg,
} from "./style";
function Loginpage() {
  const navigate = useNavigate();
  const gotoBack = () => {
    navigate("/");
  };
  const gotoSignup = () => {
    navigate("/Signup");
  };

  return (
    <LogingLayout>
      <LoginBox>
        <LoginTitle>Login 페이지임</LoginTitle>
        <InputBox>
          아이디 : <input />
          <CheckMsg />
        </InputBox>
        <InputBox>
          비밀번호 : <input />
          <CheckMsg />
        </InputBox>
        <BtnBox>
          <button>확인</button>
          <button onClick={gotoBack}>뒤로가기</button>
          <button onClick={gotoSignup}>회원가입하러가기</button>
        </BtnBox>
      </LoginBox>
    </LogingLayout>
  );
}

export default Loginpage;
