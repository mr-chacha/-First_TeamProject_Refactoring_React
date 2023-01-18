import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  SignUpBox,
  SignUpLayout,
  SinupTitle,
  SinupForm,
  InputBox,
  BtnBox,
  CheckMsg,
  Signupcontainer,
} from "./style";
function SignupPage() {
  const navigate = useNavigate();
  const [userNicName, setuserNicName] = useState();
  const [userId, setUserId] = useState();
  const [userPw, setUserPw] = useState();
  const [loginId, setLoginId] = useState(false);
  const [loginPw, setLoginPw] = useState(false);
  const newUser = {
    id: uuidv4(),
    userNicName,
    userId,
    userPw,
  };

  const userNicName_input = useRef();
  const userId_input = useRef();
  const userPw_input = useRef();
  const userId_msg = useRef();
  const userPw_msg = useRef();

  useEffect(() => {
    if (!userId) return;
    UserIdHandler();
  }, [userId]);

  useEffect(() => {
    if (!userPw) return;
    UserPwHandler();
  }, [userPw]);

  const userNichNameChange = (e) => {
    setuserNicName(e.target.value);
  };

  // 메인화면 이동버튼
  const gotoBack = () => {
    navigate("/");
  };
  // 로그인화면 이동버튼
  const gotoLogin = () => {
    navigate("/Login");
  };

  // 아이디 유효성 검사
  const UserIdHandler = (e) => {
    setUserId(userId_input.current.value);
    // a부터z까지 0부터9까지 최소4 글자 최대 12글자까지
    const idRegExp = /^[a-z0-9]{4,12}$/;
    // 유효성 안내글
    if (!idRegExp.test(userId)) {
      userId_msg.current.innerText =
        "4~12자의 영문 소문자, 숫자로 작성 가능합니다.";
      userId_msg.current.style = "display:block";
      return false;
    } else {
      userId_msg.current.innerText = "사용가능한 아이디 입니다.";
      userId_msg.current.style = "display:block; color:green";
      setLoginId(true);
      return;
    }
  };

  //  비밀번호 유효성검사
  const UserPwHandler = (e) => {
    setUserPw(userPw_input.current.value);
    const pwRegExp = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;
    if (!pwRegExp.test(userPw)) {
      userPw_msg.current.innerText =
        "비밀번호는 8~20자의 소문자 및 숫자로 작성 가능합니다.";
      userPw_msg.current.style = "display:block";
      userPw_input.current.focus();
      return false;
    } else {
      userPw_msg.current.innerText = "올바른 비밀번호 형식입니다.";
      userPw_msg.current.style = "display:block; color:green";
      setLoginPw(true);
      return true;
    }
  };
  //회원가입 버튼
  const addUser = (event) => {
    event.preventDefault();
    if (!userNicName) {
      alert("닉네임을 입력하세요");
      userNicName_input.current.focus();
    } else if (!userId) {
      alert("아이디를 입력하세요");
      userId_input.current.focus();
    } else if (!userPw) {
      alert("비밀번호를 입력하세요");
      userPw_input.current.focus();
    } else if (loginId && loginPw === false) {
      alert("아이디 또는 비밀번호를 다시 입력해주세요");
    } else if (loginId && loginPw === true) {
      alert("회원가입 되었습니다");
      gotoLogin();
    }
  };

  return (
    <SignUpLayout>
      <SignUpBox>
        <SinupTitle>회원가입</SinupTitle>
        <form onSubmit={addUser}>
          <Signupcontainer>
            <InputBox>
              <h4>닉네임 : </h4>
              <input
                value={userNicName}
                onChange={userNichNameChange}
                ref={userNicName_input}
              />
            </InputBox>
            <InputBox>
              <h4>아이디 : </h4>
              <input
                value={userId}
                onChange={UserIdHandler}
                ref={userId_input}
              />
            </InputBox>
            <CheckMsg ref={userId_msg} />
            <InputBox>
              <h4>비밀번호 : </h4>
              <input
                value={userPw}
                onChange={UserPwHandler}
                ref={userPw_input}
              />
            </InputBox>
            <CheckMsg ref={userPw_msg} />
            <BtnBox>
              <button onClick={addUser}>확인</button>
              <button onClick={gotoLogin}>로그인</button>
              <button onClick={gotoBack}>뒤로가기</button>
            </BtnBox>
          </Signupcontainer>
        </form>
      </SignUpBox>
    </SignUpLayout>
  );
}

export default SignupPage;
