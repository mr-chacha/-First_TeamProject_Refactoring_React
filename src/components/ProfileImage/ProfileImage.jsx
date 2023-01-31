import React from "react";
import { ProfileImg } from "./style";
import profileImgDefault from "../assets/profile.png";
import { authService } from "../../FifeBase";
export default function ProfileImage({ attachment, onChangeProfileImg }) {
  return (
    <>
      <label htmlFor="">
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
        style={{ display: "block" }}
        onChange={onChangeProfileImg}
      />
    </>
  );
}
