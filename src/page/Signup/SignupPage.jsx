import React from "react";
import { useNavigate } from "react-router-dom";
import {
  SignUpBox,
  SignUpLayout,
  SinupTitle,
  SinupForm,
  InputBox,
  BtnBox,
} from "./style";
function SignupPage() {
  const navigate = useNavigate();
  const gotoBack = () => {
    navigate("/");
  };
  const gotoLogin = () => {
    navigate("/Login");
  };
  return (
    <SignUpLayout>
      <SignUpBox>
        <SinupTitle>회원가입</SinupTitle>
        <SinupForm>
          <InputBox>
            <h4>닉네임 : </h4> <input />
          </InputBox>
          <InputBox>
            <h4>아이디 : </h4> <input />
          </InputBox>
          <InputBox>
            <h4>비밀번호 : </h4> <input />
          </InputBox>
        </SinupForm>
        <BtnBox>
          <button>확인</button>
          <button onClick={gotoLogin}>로그인</button>
          <button onClick={gotoBack}>뒤로가기</button>
        </BtnBox>
      </SignUpBox>
    </SignUpLayout>
  );
}

export default SignupPage;
