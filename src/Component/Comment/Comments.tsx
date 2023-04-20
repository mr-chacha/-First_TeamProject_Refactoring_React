import React, { useRef, useState } from "react";
import { authService, db } from "../../FireBase";
import styled from "styled-components";
import { faCheck, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
export default function Comments({ comment }: any) {
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
      {/*로그인된 유저일때만 댓글이 보이게*/}
      {authService.currentUser ? (
        <Layout>
          {/* 프로필 이미지*/}
          <ProfileImg src={comment.profileImg} />
          <div>
            {/*프로필 닉네임*/}
            <ProfileName>{comment.displayName}</ProfileName>
            <Comment ref={commentsRef}> {comment.comment}</Comment>
            <ContetnsInput
              ref={inputRef}
              style={{ display: "none" }}
              value={comments}
              onChange={onChangeContent}
            />
          </div>

          <CommentsTime>{comment.createdAt}</CommentsTime>
          {/* 같은 id인경우에만 아이콘이 보이게하기 */}
          {comment.authId === authService.currentUser?.uid ? (
            <IconBox>
              {/* 댓글수정아이콘 */}
              <FontAwesomeIcon
                ref={editRef}
                icon={faPen}
                onClick={contentEditBtn}
                style={{
                  position: "relative",
                  cursor: "pointer",
                }}
              />
              {/*댓글확인 아이콘 */}
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
              {/*댓글삭제 아이콘*/}
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

const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin: 10px 10px 10px 10px;
`;
const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 30px;
`;
const ProfileName = styled.div`
  font-size: 17;
  margin-left: 10px;
  font-weight: 500;
`;
const Comment = styled.div`
  margin-top: 5px;
  font-size: 12px;
  margin-left: 10px;
`;

const CommentsTime = styled.div`
  margin-left: 5px;
  font-size: 10px;
  color: gray;
`;
const ContetnsInput = styled.input``;
const IconBox = styled.div``;
