import React from "react";
import {
  ContentsBox,
  ContentsLayout,
  ContentsBtn,
  ContetnsInput,
  ProfileImg,
  Title,
  Contnet,
  Header,
  Time,
} from "./style";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { authService, db } from "../../../FireBase";
import { useRef } from "react";
import { useState } from "react";

export default function Contents({ item }: any) {
  const sucBtnRef = useRef<HTMLInputElement>(null);
  const editBtnRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [contents, setContents] = useState("");
  //댓글삭제하기
  const DeleteContent = async (Id: any) => {
    await deleteDoc(doc(db, "reviews", Id));
  };

  // 수정 onChange
  const onChangeContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setContents(event.target.value);
  };
  //수정버튼
  const contentEditBtn = (event: React.MouseEvent<HTMLElement>) => {
    sucBtnRef.current!.style.display = "block";
    inputRef.current!.style.display = "block";
    editBtnRef.current!.style.display = "none";
    setContents(item.content);
    inputRef.current!.focus();
  };
  //수정완료버튼
  const contentSuccessBtn = async (reviewId: any) => {
    const contentsRef = doc(db, "reviews", item.id);
    try {
      await updateDoc(contentsRef, {
        content: contents,
      });
      sucBtnRef.current!.style.display = "none";
      sucBtnRef.current!.style.display = "none";
      inputRef.current!.style.display = "none";
      editBtnRef.current!.style.display = "block";
    } catch (err) {
      console.log(err);
    }
  };
  const ProfilPhoto = authService.currentUser?.photoURL;
  return (
    <>
      <ContentsLayout>
        <ContentsBox>
          <Header>
            <ProfileImg src={ProfilPhoto} />
            <Title>{item.displayName}</Title>
          </Header>
          <Contnet>{item.content}</Contnet>
          <Time> {item.createdAt}</Time>
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
