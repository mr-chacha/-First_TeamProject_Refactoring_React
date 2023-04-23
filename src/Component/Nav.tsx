import { signOut } from "firebase/auth";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../FireBase";
import styled from "styled-components";
import { faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Nav() {
  const login = useRef<HTMLButtonElement>(null);
  const logout = useRef<HTMLButtonElement>(null);
  const singuP = useRef<HTMLButtonElement>(null);
  const myPage = useRef<HTMLButtonElement>(null);
  //프로필 사진
  const ProfilPhoto: any = authService?.currentUser?.photoURL;
  sessionStorage.setItem("Img", ProfilPhoto);

  //홈으로 이동버튼
  const gotoMypage = () => {
    navigate("/gotoHone");
  };
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
        window.location.replace("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      {authService.currentUser ? (
        <NavStyle>
          <BtnBox>
            {/* 프로필이미지 */}
            <ProfileImg src={ProfilPhoto} onClick={gotoMypage} />
            <ProfileName>{authService.currentUser?.displayName}</ProfileName>
            <ProfilEmail>{authService.currentUser?.email}</ProfilEmail>
            <BtnArea>
              <Btn ref={myPage} onClick={gotoMyPage}>
                <FontAwesomeIcon
                  icon={faUser}
                  style={{
                    background: "#c6c4c4",
                    position: "relative",
                    cursor: "pointer",
                    width: "20px",
                    height: "20px",
                    padding: "8px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                />
                My Page
              </Btn>
              <Btn ref={logout} onClick={handleLogout}>
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  style={{
                    background: "#c6c4c4",
                    position: "relative",
                    cursor: "pointer",
                    width: "20px",
                    height: "20px",
                    padding: "8px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                />
                Logout
              </Btn>
            </BtnArea>
          </BtnBox>
        </NavStyle>
      ) : (
        <NavStyle2>
          <BtnBox2>
            <BtnArea2>
              <Btn ref={login} onClick={gotoLogin}>
                로그인
              </Btn>
              <Btn ref={singuP} onClick={gotoSignup}>
                회원가입
              </Btn>
            </BtnArea2>
          </BtnBox2>
        </NavStyle2>
      )}
    </div>
  );
}

export default Nav;

const ProfileName = styled.p`
  font-size: 20px;
  margin: 0px;
  margin: 10px 0px;
`;
const ProfilEmail = styled.p`
  font-size: 20px;
  margin: 0px;
  margin: 10px 0px;
`;
const ProfileImg = styled.img`
  width: 140px;
  border: 1px solid #979595;
  border-radius: 50%;
  cursor: pointer;
  margin: 20px 0px;
`;
const NavStyle = styled.div`
  display: flex;
  width: 350px;
  height: 450px;
  border: 1px solid;
  border-radius: 15px;
  background-color: #ffffff;
  position: absolute;
  top: 140px;
  right: 2%;
  bottom: 0;
  overflow: hidden;
  left: 1;
  z-index: 99;
  transition: max-height 0.5s;
`;
const NavStyle2 = styled.div`
  display: flex;
  align-items: center;
  width: 110px;
  height: 100px;
  border: 1px solid;
  border-radius: 15px;
  background-color: #ffffff;
  position: absolute;
  top: 140px;
  right: 1%;
  left: 1;
  z-index: 99;
  transition: max-height 0.5s;
`;

const BtnArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  font-size: 20px;
  gap: 15px;
  margin-right: 170px;
`;
const BtnArea2 = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 20px;
`;
const BtnBox = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
const BtnBox2 = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
const Btn = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 5px;
  &:hover {
    color: #2e77ee;
  }
`;
