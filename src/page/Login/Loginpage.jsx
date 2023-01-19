import React, { useState } from "react";
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
  const [userId, setUserId] = useState();
  const [userPw, setUserPw] = useState();

  const navigate = useNavigate();
  const gotoBack = () => {
    navigate("/");
  };
  const gotoSignup = () => {
    navigate("/Signup");
  };
  const LoginUser = () => {
    if (!userId) {
      alert("아이디를 입력하세요");
    } else if (!userPw) {
      alert("비밀번호를 입력하세요");
    } else {
      alert("로그인 되었습니다");
      gotoBack();
    }
  };

  const UserIdChange = (event) => {
    setUserId(event.target.value);
  };
  const UserPwChange = (event) => {
    setUserPw(event.target.value);
  };
  return (
    <LogingLayout>
      <LoginBox>
        <LoginTitle>Login 페이지임</LoginTitle>
        <form>
          <InputBox>
            아이디 : <input value={userId} onChange={UserIdChange} />
            <CheckMsg />
          </InputBox>
          <InputBox>
            비밀번호 : <input value={userPw} onChange={UserPwChange} />
            <CheckMsg />
          </InputBox>
          <BtnBox>
            <button onClick={LoginUser}>확인</button>
            <button onClick={gotoBack}>뒤로가기</button>
            <button onClick={gotoSignup}>회원가입하러가기</button>
          </BtnBox>
        </form>
      </LoginBox>
    </LogingLayout>
  );
}

export default Loginpage;
