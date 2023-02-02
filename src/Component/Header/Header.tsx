import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Nav/Nav";
import { Headerstyle, Layout, ProfileImg } from "./style";
import { authService } from "../../FireBase";

function Header() {
  //modal Ref
  const [open, setOpen] = useState(false);
  //프로필 사진
  const [ProfilPhoto, setPProfilPhoto] = useState<any>(
    authService.currentUser?.photoURL
  );

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
      <Headerstyle onClick={gotoHone}>뉴스피드 리펙토링</Headerstyle>
      <div>
        <ProfileImg src={ProfilPhoto} onClick={ModalOpen} />
        {open && <Nav />}
      </div>
    </Layout>
  );
}

export default Header;
