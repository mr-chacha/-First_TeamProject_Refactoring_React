import React from "react";
import {
  ContentsBox,
  ContentsLayout,
  ContentsBtn,
  ContetnsInput,
} from "./style";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { apiKeys, authService, db } from "../../../FifeBase";
import { useRef } from "react";
import { useState } from "react";

export default function Contents({ item }) {
  const sucBtnRef = useRef();
  const editBtnRef = useRef();
  const inputRef = useRef();
  const [contents, setContents] = useState();
  //댓글삭제하기
  const DeleteContent = async (Id) => {
    await deleteDoc(doc(db, "reviews", Id));
  };

  // 수정 onChange
  const onChangeContent = (event) => {
    event.preventDefault();
    setContents(event.target.value);
  };
  //수정버튼
  const contentEditBtn = () => {
    sucBtnRef.current.style.display = "block";
    inputRef.current.style.display = "block";
    editBtnRef.current.style.display = "none";
    setContents(item.content);
    inputRef.current.focus();
  };
  //수정완료버튼
  const contentSuccessBtn = async (reviewId) => {
    const contentsRef = doc(db, "reviews", item.id);
    try {
      await updateDoc(contentsRef, {
        content: contents,
      });
      sucBtnRef.current.style.display = "none";
      inputRef.current.style.display = "none";
      editBtnRef.current.style.display = "block";
    } catch (err) {
      console.log(err);
    }
  };

  //새로고침해도 닉네임 유지 방법 1 => 새로고침 할 때 깜빡임 없어서 선택
  //닉네임 유지용
  let userObj = sessionStorage.getItem(
    `firebase:authUser:${apiKeys}:[DEFAULT]`
  );
  let userObjParsed;
  if (userObj) {
    userObjParsed = JSON.parse(userObj);
  }

  return (
    <>
      <ContentsLayout>
        <ContentsBox>
          {/* <img
            src={authService.currentUser.photoURL}
            style={{ width: "40px", height: "40px", borderRadius: "50" }}
          /> */}
          작성자 : {item.displayName}
          <br></br>
          {item.content}
          <br></br>
          <ContetnsInput
            ref={inputRef}
            style={{ display: "none" }}
            value={contents}
            onChange={onChangeContent}
          />
          {item.authId === authService.currentUser?.uid ? (
            <div>
              <ContentsBtn ref={editBtnRef} onClick={contentEditBtn}>
                수정
              </ContentsBtn>
              <ContentsBtn
                style={{ display: "none" }}
                ref={sucBtnRef}
                onClick={contentSuccessBtn}
              >
                완료
              </ContentsBtn>
              <ContentsBtn onClick={() => DeleteContent(item.id)}>
                삭제
              </ContentsBtn>
            </div>
          ) : (
            ""
          )}
        </ContentsBox>
      </ContentsLayout>
    </>
  );
}
