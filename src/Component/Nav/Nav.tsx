import { signOut } from "firebase/auth";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../FireBase";
import { NavStyle } from "./style";

function Nav() {
  const login = useRef<HTMLButtonElement>(null);
  const logout = useRef<HTMLButtonElement>(null);
  const singuP = useRef<HTMLButtonElement>(null);
  const myPage = useRef<HTMLButtonElement>(null);

  // useEffect(() => {
  //   // 로그인 됐을때
  //   if (authService.currentUser) {
  //     login.current.style.display = "none";
  //     singuP.current.style.display = "none";
  //     logout.current.style.display = "block";
  //     myPage.current.style.display = "block";
  //     //로그인이 안됐을대
  //   } else if (!authService.currentUser) {
  //     logout.current.style.display = "none";
  //     myPage.current.style.display = "none";
  //     login.current.style.display = "block";
  //     singuP.current.style.display = "block";
  //   }
  // }, []);
  //페이지 이동함수
  const navigate = useNavigate();
  const gotoLogin = () => {
    navigate("Login");
  };
  const gotoSignup = () => {
    navigate("Signup");
  };
  const gotoMyPage = () => {
    navigate("Mypage");
  };
  // 로그아웃
  const handleLogout = () => {
    signOut(authService)
      .then(() => {
        alert("로그아웃 되었습니다.");
        //뒤로가기 안되게
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <NavStyle>
      {authService.currentUser ? (
        <>
          <button ref={logout} onClick={handleLogout}>
            로그아웃
          </button>
          <button ref={myPage} onClick={gotoMyPage}>
            마이페이지
          </button>
        </>
      ) : (
        <>
          <button ref={login} onClick={gotoLogin}>
            로그인
          </button>
          <button ref={singuP} onClick={gotoSignup}>
            회원가입
          </button>
        </>
      )}
    </NavStyle>
  );
}

export default Nav;
