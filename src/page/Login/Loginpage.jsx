import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogingLayout,
  LoginBox,
  LoginTitle,
  InputBox,
  BtnBox,
  CheckMsg,
} from "./style";
import {
  signInWithEmailAndPassword,
  getAuth,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import app from "../../FifeBase";
import { authService } from "../../FifeBase";

function Loginpage() {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const userId_input = useRef();
  const userPw_input = useRef();

  const userId_msg = useRef();
  const userPw_msg = useRef();

  const navigate = useNavigate();
  const gotoBack = () => {
    navigate("/");
  };
  const gotoSignup = () => {
    navigate("/Signup");
  };

  //로그인 유저 핸들러
  const LoginUser = () => {
    if (!userId) {
      alert("아이디를 입력하세요");
    } else if (!userPw) {
      alert("비밀번호를 입력하세요");
    } else {
      alert("로그인 되었습니다");
      setPersistence(authService, browserSessionPersistence);
      signInWithEmailAndPassword(authService, userId, userPw)
        .then(() => {
          gotoBack();
          return;
        })
        .catch(() => {
          return;
        });
      gotoBack();
    }
  };

  const UserIdHandler = (e) => {
    setUserId(e.target.value);
  };
  const UserPwHandler = (e) => {
    setUserPw(e.target.value);
  };

  return (
    <LogingLayout>
      <LoginBox>
        <LoginTitle>Login 페이지임</LoginTitle>
        <form onSubmit={LoginUser}>
          <InputBox>
            아이디 :
            <input
              type={"email"}
              value={userId}
              onChange={UserIdHandler}
              ref={userId_input}
            />
            <CheckMsg />
          </InputBox>
          <CheckMsg ref={userId_msg} />
          <InputBox>
            비밀번호 :
            <input
              value={userPw}
              type={"password"}
              onChange={UserPwHandler}
              ref={userPw_input}
            />
            <CheckMsg ref={userPw_msg} />
          </InputBox>
          <BtnBox>
            <button>확인</button>
          </BtnBox>
        </form>
        <button onClick={gotoBack}>뒤로가기</button>
        <button onClick={gotoSignup}>회원가입하러가기</button>
      </LoginBox>
    </LogingLayout>
  );
}

export default Loginpage;
