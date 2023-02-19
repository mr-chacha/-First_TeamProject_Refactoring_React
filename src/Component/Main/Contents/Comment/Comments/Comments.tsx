import React, { useRef, useState } from "react";
import { authService, db } from "../../../../../FireBase";
import {
  Layout,
  CommentsImg,
  CommentsTitle,
  Comment,
  CommentsTime,
  IconBox,
  ContetnsInput,
} from "./style";
import { faCheck, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
export default function Comments({ comment }: any) {
  const ProfileImg = comment.profileImg;
  const sucRef = useRef<any>(null);
  const editRef = useRef<any>(null);
  const commentsRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [comments, setComments] = useState("");
  //댓글삭제하기
  const DeleteContent = async (Id: any) => {
    await deleteDoc(doc(db, "comment", Id));
  };
  // 수정 onChange
  const onChangeContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setComments(event.target.value);
  };
  //수정버튼
  const contentEditBtn = (event: any) => {
    sucRef.current!.style.display = "block";
    inputRef.current!.style.display = "block";
    editRef.current!.style.display = "none";
    commentsRef.current!.style.display = "none";
    setComments(comment.content);
    inputRef.current!.focus();
  };
  //수정완료버튼
  const contentSuccessBtn = async (commentId: any) => {
    const commentRef = doc(db, "comment", comment.id);
    try {
      await updateDoc(commentRef, {
        comment: comments,
      });
      sucRef.current!.style.display = "none";
      sucRef.current!.style.display = "none";
      inputRef.current!.style.display = "none";
      editRef.current!.style.display = "block";
      commentsRef.current!.style.display = "block";
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {authService.currentUser ? (
        <Layout>
          <CommentsImg src={ProfileImg} />
          <div>
            <CommentsTitle>{comment.displayName}</CommentsTitle>
            <Comment ref={commentsRef}> {comment.comment}</Comment>
            <ContetnsInput
              ref={inputRef}
              style={{ display: "none" }}
              value={comments}
              onChange={onChangeContent}
            />
          </div>

          <CommentsTime>{comment.createdAt}</CommentsTime>
          {comment.authId === authService.currentUser?.uid ? (
            <IconBox>
              <FontAwesomeIcon
                ref={editRef}
                icon={faPen}
                onClick={contentEditBtn}
                style={{
                  position: "relative",
                  cursor: "pointer",
                }}
              />
              <FontAwesomeIcon
                ref={sucRef}
                icon={faCheck}
                onClick={contentSuccessBtn}
                style={{
                  position: "relative",
                  cursor: "pointer",
                  display: "none",
                }}
              />
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => DeleteContent(comment.id)}
                style={{
                  position: "relative",
                  cursor: "pointer",
                  marginTop: "5px",
                }}
              />
            </IconBox>
          ) : (
            ""
          )}
          <></>
        </Layout>
      ) : (
        ""
      )}
    </>
  );
}
