import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { authService } from "../../FifeBase";
function Mypage() {
  const [nic, setNic] = useState(authService.currentUser.displayName);
  const name = authService.currentUser.displayName;
  const inputref = useRef();
  const onChangeNicName = (event) => {
    setNic(event.target.value);
  };
  const onChangeNicNameBtn = () => {
    inputref.current.style.display = "block";
  };
  const onChangeNicNameBtn2 = () => {
    inputref.current.style.display = "none";
  };

  return (
    <div>
      <h1>{name}님의 마이페이지</h1>
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
      <button onClick={onChangeNicNameBtn2}>프로필닉네임변경 확인</button>
      <div>프로필이미지</div>
      <button>프로필이미지 변경</button>
      <button>프로필이미지 확인</button>
    </div>
  );
}

export default Mypage;
