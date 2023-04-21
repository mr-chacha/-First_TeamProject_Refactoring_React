import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { authService } from "../FireBase";
import { updateProfile } from "firebase/auth";
import ProfileImage from "../Component/Profill/ProfilImage";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Mypage() {
  const navigate = useNavigate();
  const NicNameChangeRef = useRef<HTMLButtonElement>(null);
  const NIcNameSucessRef = useRef<HTMLButtonElement>(null);
  //닉네임변경함수들
  const disName = authService.currentUser
    ? authService.currentUser!.displayName
    : "";
  const [nic, setNic] = useState<any>("");
  const inputref = useRef<HTMLInputElement>(null);

  // onChange
  const onChangeNicName = (event: any) => {
    setNic(event.target.value);
  };
  // 수정버튼
  const onChangeNicNameBtn = (event: any) => {
    inputref.current!.style.display = "block";
    NicNameChangeRef.current!.style.display = "none";
    NIcNameSucessRef.current!.style.display = "block";
    setNic(disName);

    inputref.current!.focus();
  };
  // 수정완료버튼
  const HandleChangeNicNameBtn = async () => {
    if (!nic) {
      alert("닉네임을 입력하세요");
      return;
    }
    if (authService.currentUser?.displayName) {
      await updateProfile(authService.currentUser, {
        displayName: nic,
      })
        .then(() => {
          alert("닉네임 변경완료");
          inputref.current!.style.display = "none";
          NicNameChangeRef.current!.style.display = "block";
          NIcNameSucessRef.current!.style.display = "none";
          navigate("/mypage", { replace: true });
          return;
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <Layout>
      {authService.currentUser ? <h1>{disName}님의 마이페이지</h1> : "하이"}
      <div>
        <ProfileInput
          style={{ display: "none" }}
          ref={inputref}
          type="text"
          value={nic}
          onChange={onChangeNicName}
          placeholder="변경할 닉네임을 입력하세요"
        />
      </div>
      <button onClick={onChangeNicNameBtn} ref={NicNameChangeRef}>
        닉네임변경 변경
      </button>
      <button
        onClick={HandleChangeNicNameBtn}
        ref={NIcNameSucessRef}
        style={{ display: "none" }}
      >
        닉네임변경 완료
      </button>
      <div></div>
      <ProfileImage />
      <div></div>
    </Layout>
  );
}

export default Mypage;

const Layout = styled.div`
  width: 100%;
  height: 700px;
  background-color: #f3f3f3;
  margin-top: 80px;
  padding: 0px;
`;

const ProfileInput = styled.input``;
