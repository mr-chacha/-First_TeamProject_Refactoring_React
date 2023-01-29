import React from "react";
import {
  ContentsBox,
  ContentsLayout,
  ContentsBtn,
  ContetnsInput,
} from "./style";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../FifeBase";
export default function Contents({ item }) {
  //댓글삭제하기
  const DeleteContent = async (Id) => {
    await deleteDoc(doc(db, "reviews", Id));
  };
  return (
    <ContentsLayout>
      <ContentsBox>
        {item.content}
        <ContetnsInput style={{ display: "none" }}></ContetnsInput>
        <ContentsBtn onClick={() => DeleteContent(item.id)}>삭제</ContentsBtn>
        <ContentsBtn>수정</ContentsBtn>
      </ContentsBox>
    </ContentsLayout>
  );
}
