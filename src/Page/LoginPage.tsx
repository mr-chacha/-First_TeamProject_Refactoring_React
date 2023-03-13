import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { authService } from "../FireBase";
import styled from "styled-components";
function LoginPage() {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [userIds, setUserIds] = useState(false);
  const [userPws, setUserPws] = useState(false);
  const userId_input = useRef<HTMLInputElement>(null);
  const userPw_input = useRef<HTMLInputElement>(null);
  const userId_msg = useRef<HTMLInputElement>(null);
  const userPw_msg = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const gotoBack = () => {
    navigate("/");
  };
  const gotoSignup = () => {
    navigate("/Signup");
  };

  //로그인 유저 핸들러
  const LoginUser = (event: any) => {
    event.preventDefault();
    if (!userId) {
      alert("아이디를 입력하세요");
      userId_input.current!.focus();
    } else if (!userPw) {
      alert("비밀번호를 입력하세요");
      userPw_input.current!.focus();
    } else {
      setPersistence(authService, browserSessionPersistence);
      signInWithEmailAndPassword(authService, userId, userPw)
        .then(() => {
          alert("로그인 되었습니다.");
          navigate("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === "auth/user-not-found") {
            alert("등록된 계정이 없습니다.");
          } else {
            alert("로그인 실패");
          }
        });
      // navigate("/");
    }
  };

  const UserIdHandler = (event: any) => {
    setUserId(event.target.value);
  };
  const UserPwHandler = (event: any) => {
    setUserPw(event.target.value);
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

export default LoginPage;

const LogingLayout = styled.div`
  width: 100%;
  height: 1080px;
`;

const LoginBox = styled.div`
  width: 400px;
  height: 400px;
  border: 3px solid green;

  //글씨 중앙에 위치하게하기
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  //박스 중앙에 위치하게하기
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LoginTitle = styled.h1``;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
`;
const BtnBox = styled.div`
  margin-top: 5px;
  display: flex;
`;
const CheckMsg = styled.p`
  color: #f03e3e;
  margin: 10px 0 0 2px;
  display: none;
  font-size: 10px;
`;
