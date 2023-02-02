import React, { useState } from "react";
import { ProfileImg } from "./style";
import profileImgDefault from "../assets/profile.png";
import { authService, storage } from "../../FireBase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { uuidv4 } from "@firebase/util";
import { updateProfile } from "firebase/auth";
interface Profil {
  attachment: any;
  onChangeProfileImg: any;
}

export default function ProfileImage() {
  //프로필 사진변경 함수들
  const [attachment, setAttachment] = useState("");
  //파일 업로드 input을 통해 업로드한 이미지를 DataURL로 변환
  const onChangeProfileImg = (event: any) => {
    const reader = new FileReader();
    if (event.target.files) {
      reader.readAsDataURL(event.target.files[0]);
    }
    reader.onloadend = (finishedEvent) => {
      const profileURL = finishedEvent.target?.result;
      if (typeof profileURL === "string") {
        setAttachment(profileURL);
        localStorage.setItem("profileURL", profileURL);
      }
    };
    console.log(attachment);
  };
  //firebase Storage에 프로필 이미지 저장 및 currentUser 정보에 반영
  const storeImg = async () => {
    if (attachment) {
      const imgRef = ref(
        storage,
        `${authService.currentUser?.uid}/profileUrl/${uuidv4()}/`
      );
      const profileURL = localStorage.getItem("profileURL");
      if (profileURL) {
        const response = await uploadString(imgRef, profileURL, "data_url");
        const tempUrl = await getDownloadURL(response.ref);
        if (authService.currentUser) {
          await updateProfile(authService.currentUser, {
            photoURL: tempUrl,
          });
        }
        alert("이미지 업로드가 완료되었습니다.");
      }
    }
  };
  return (
    <>
      <label htmlFor="imgInput">
        {attachment ? (
          <ProfileImg
            alt="프로필이미지"
            src={attachment || profileImgDefault}
          />
        ) : (
          <ProfileImg
            alt="프로필이미지"
            src={authService.currentUser?.photoURL || profileImgDefault}
          />
        )}
      </label>
      <input
        id="imgInput"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={onChangeProfileImg}
      />
      <button onClick={storeImg}>프로필이미지 변경</button>
    </>
  );
}
