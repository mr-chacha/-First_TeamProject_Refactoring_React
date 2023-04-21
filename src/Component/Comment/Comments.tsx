import React, { useRef, useState } from "react";
import { authService, db } from "../../FireBase";
import styled from "styled-components";
import { faCheck, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import defaultImg from "../../image/img1.png";

//
interface CommentProps {
  comment: {
    id: string;
    authId: string;
    cid: string;
    comment: string;
    createdAt: string;
    displayName: string;
    profileImg: string;
  };
}
export default function Comments({ comment }: CommentProps) {
  const sucRef = useRef<any>(null);
  const editRef = useRef<any>(null);
  const commentsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [comments, setComments] = useState<string>("");

  //댓글삭제하기
  const DeleteContent = async (Id: string) => {
    if (window.confirm("정말 삭제하겠습니까??")) {
      await deleteDoc(doc(db, "comment", Id));
      return;
    } else {
      return;
    }
  };

  // 수정 onChange
  const onChangeContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setComments(event.target.value);
  };
  //수정버튼
  const contentEditBtn = (event: React.MouseEvent<HTMLSpanElement>) => {
    sucRef.current!.style.display = "block";
    inputRef.current!.style.display = "block";
    editRef.current!.style.display = "none";
    commentsRef.current!.style.display = "none";
    setComments(comment.comment);
    inputRef.current!.focus();
  };
  //수정완료버튼
  const contentSuccessBtn = async (
    event: React.MouseEvent<HTMLSpanElement>
  ) => {
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
  //프로필 사진
  const ProfilPhoto = authService.currentUser?.photoURL;
  return (
    <>
      {/*로그인된 유저일때만 댓글이 보이게*/}
      {authService.currentUser ? (
        <Layout>
          <div style={{ display: "flex" }}>
            {/* 프로필 이미지*/}
            <ProfileImg src={ProfilPhoto ? ProfilPhoto : defaultImg} />
            <div>
              {/*프로필 닉네임*/}
              <CommentsHeader>
                <ProfileName>{comment.displayName}</ProfileName>
                <CommentsTime>{comment.createdAt}</CommentsTime>
              </CommentsHeader>
              <Comment ref={commentsRef}> {comment.comment}</Comment>

              <ConmmentsInput
                ref={inputRef}
                style={{ display: "none" }}
                value={comments}
                onChange={onChangeContent}
              />
            </div>
          </div>
          {/* 같은 id인경우에만 아이콘이 보이게하기 */}
          {comment.authId === authService.currentUser?.uid ? (
            <IconBox>
              {/* 댓글수정아이콘 */}
              <IconSpan onClick={contentEditBtn}>
                <FontAwesomeIcon
                  ref={editRef}
                  icon={faPen}
                  style={{
                    // position: "relative",
                    cursor: "pointer",
                    fontSize: "20px",
                  }}
                />
              </IconSpan>
              {/*댓글확인 아이콘 */}
              <IconSpan onClick={contentSuccessBtn}>
                <FontAwesomeIcon
                  ref={sucRef}
                  icon={faCheck}
                  style={{
                    // position: "relative",
                    cursor: "pointer",
                    display: "none",
                    fontSize: "20px",
                  }}
                />
              </IconSpan>
              {/*댓글삭제 아이콘*/}
              <IconSpan>
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => DeleteContent(comment.id)}
                  style={{
                    // position: "relative",
                    cursor: "pointer",
                    marginTop: "5px",
                    fontSize: "20px",
                  }}
                />
              </IconSpan>
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
const IconSpan = styled.span`
  :hover {
    color: #2e77ee;
  }
`;
const CommentsHeader = styled.div`
  display: flex;
  align-items: center;
`;
const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin: 10px 10px 10px 10px;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const ProfileImg = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
`;
const ProfileName = styled.div`
  font-size: 20px;
  margin-left: 10px;
  font-weight: 500;
`;
const Comment = styled.div`
  margin-top: 5px;
  font-size: 15px;
  margin-left: 10px;
  margin-right: 10px;
  font-weight: 400;
`;

const CommentsTime = styled.p`
  margin-left: 5px;
  font-size: 13px;
  color: gray;
`;
const ConmmentsInput = styled.input``;
const IconBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
`;
