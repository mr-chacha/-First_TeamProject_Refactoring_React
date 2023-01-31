import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { authService, db, storage } from "../../FifeBase";
import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { uuidv4 } from "@firebase/util";
import ProfileImage from "../../components/ProfileImage/ProfileImage";
function Mypage() {
  //닉네임변경함수들
  const [nic, setNic] = useState(authService.currentUser.displayName);
  const inputref = useRef();
  // onChange
  const onChangeNicName = (event) => {
    setNic(event.target.value);
  };
  // 수정버튼
  const onChangeNicNameBtn = (event) => {
    inputref.current.style.display = "block";
    setNic(event.target.value);
    inputref.current.focus();
  };
  // 수정완료버튼
  const HandleChangeNicNameBtn = async () => {
    if (authService.currentUser?.displayName) {
      await updateProfile(authService.currentUser, {
        displayName: nic,
      })
        .then(() => {
          alert("닉네임 변경완료");
          return;
        })
        .catch((error) => console.log(error));
    } else if (!nic) {
      alert("닉네임을 입력하세요");
      return;
    }
  };
  console.log(authService.currentUser.displayName);

  //프로필 사진변경 함수들
  const [attachment, setAttachment] = useState();
  //파일 업로드 input을 통해 업로드한 이미지를 DataURL로 변환
  const onChangeProfileImg = (event) => {
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
    <div>
      {authService.currentUser ? <h1>{nic}님의 마이페이지</h1> : ""}
      <div>
        <input
          style={{ display: "none" }}
          ref={inputref}
          type="text"
          value={nic}
          onChange={onChangeNicName}
          placeholder="변경할 닉네임을 입력하세요"
        />
      </div>
      <button onClick={onChangeNicNameBtn}>프로필닉네임변경 변경</button>
      <button onClick={HandleChangeNicNameBtn}>프로필닉네임변경 확인</button>
      <div></div>
      <ProfileImage
        attachment={attachment}
        onChangeProfileImg={onChangeProfileImg}
      />

      <div></div>
      <button>프로필이미지 변경</button>
      <button onClick={storeImg}>프로필이미지 확인</button>
    </div>
  );
}

export default Mypage;
