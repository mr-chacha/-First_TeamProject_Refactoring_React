import { signOut } from "firebase/auth";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../FireBase";
import { NavStyle, BtnBox, Btn } from "./style";

function Nav() {
  const login = useRef<HTMLButtonElement>(null);
  const logout = useRef<HTMLButtonElement>(null);
  const singuP = useRef<HTMLButtonElement>(null);
  const myPage = useRef<HTMLButtonElement>(null);

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
        <BtnBox>
          <Btn ref={logout} onClick={handleLogout}>
            로그아웃
          </Btn>
          <Btn ref={myPage} onClick={gotoMyPage}>
            마이페이지
          </Btn>
        </BtnBox>
      ) : (
        <BtnBox>
          <Btn ref={login} onClick={gotoLogin}>
            로그인
          </Btn>
          <Btn ref={singuP} onClick={gotoSignup}>
            회원가입
          </Btn>
        </BtnBox>
      )}
    </NavStyle>
  );
}

export default Nav;
