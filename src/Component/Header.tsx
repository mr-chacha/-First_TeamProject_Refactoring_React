import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { authService } from "../FireBase";
import styled from "styled-components";
import defaultImg from ".././image/img1.png";
function Header() {
  //modal Ref
  const [open, setOpen] = useState(false);
  //프로필 사진
  const ProfilPhoto: any = authService?.currentUser?.photoURL;
  sessionStorage.setItem("Img", ProfilPhoto);

  const navigate = useNavigate();
  //홈으로 이동버튼
  const gotoHone = () => {
    navigate("/");
  };
  //모달 열리는버튼
  const ModalOpen = () => {
    setOpen(!open);
  };

  return (
    <Layout>
      <Headerstyle onClick={gotoHone}>뉴스피드</Headerstyle>
      <div style={{ marginRight: "20px" }}>
        {authService?.currentUser ? (
          <ProfileImg src={ProfilPhoto} onClick={ModalOpen} />
        ) : (
          <ProfileImg src={defaultImg} onClick={ModalOpen} />
        )}

        {open && <Nav />}
      </div>
    </Layout>
  );
}

export default Header;

const Headerstyle = styled.h1`
  padding: 0;
  margin: 0;
  color: #2e77ee;
  margin-left: 10px;
  font-size: 50px;
  font-weight: 700;
`;

const Layout = styled.div`
  position: fixed;
  opacity: 90%;
  width: 100%;
  height: 130px;
  background-color: white;
  display: flex;
  position: fixed;
  justify-content: space-between;
  align-items: center;
  margin-right: 10px;
  padding: 0px;
  margin: 0px;
`;

const ProfileImg = styled.img`
  width: 60px;
  height: 60px;
  border: 1px solid #d3d3d3;
  border-radius: 50%;
  cursor: pointer;
`;
const Modal = styled.div`
  width: 100px;
  height: 200px;
  background-color: white;
  border: 1px solid black;
  border-radius: 20px;
`;
