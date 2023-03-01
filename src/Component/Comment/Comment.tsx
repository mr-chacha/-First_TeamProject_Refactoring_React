import React, { useEffect } from "react";
import styled from "styled-components";
import { useRef } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { authService, db } from "../../FireBase";
import { formatDate } from "../../utils/Data";
import Comments from "./Comments";
function Comment({ item }: any) {
  const commentId = item.cId;
  //시간
  const date = new Date().toString().slice(0, 25);
  //댓글달기
  const CommentRef = useRef<any>(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    {
      displayName: "",
      content: "",
      cid: "",
      uuid: "",
      profileImg: "",
    },
  ]);
  // 파이어베이스에서 comments 가져오기
  useEffect(() => {
    const q = query(collection(db, "comment"), orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const comments = snapshot.docs.map((doc: any) => {
        const comment = {
          id: doc.id,
          ...doc.data(),
          createdAt: formatDate(doc.data().createdAt),
        };
        return comment;
      });
      setComments(comments);
    });
  }, []);
  // 수정
  const commentChange = (event: any) => {
    setComment(event.target.value);
  };
  // comments 추가하기
  const commetsAdd = (event: any) => {
    event.preventDefault();
    if (!comment) {
      alert("댓글을 입력하세요");
      CommentRef.current!.focus();
      return;
    }
    setComment("");
    const authId = authService.currentUser?.uid;
    const usersRef = collection(db, "comment");
    setDoc(doc(usersRef), {
      displayName: authService.currentUser?.displayName,
      authId,
      comment,
      createdAt: date,
      profileImg: authService.currentUser?.photoURL,
      cid: commentId,
    });
    return;
  };

  return (
    <>
      <CommentLayout>
        <IconBox2>
          <span>
            <FontAwesomeIcon
              icon={faHeart}
              style={{
                position: "relative",
                cursor: "pointer",
                marginTop: "10px",
                marginRight: "3px",
                color: "red",
              }}
            />
            좋아요
          </span>
          <span onClick={commetsAdd} style={{ cursor: "pointer" }}>
            <FontAwesomeIcon
              icon={faComment}
              style={{
                position: "relative",
                cursor: "pointer",
                marginTop: "10px",
                marginRight: "3px",
                color: "blue",
              }}
            />
            댓글달기
          </span>
        </IconBox2>
        {authService.currentUser ? (
          <CommentsBox>
            <ProfileImg src={item.profileImg} />
            <CommentsInput
              ref={CommentRef}
              placeholder="  댓글을 달아주세요."
              value={comment}
              onChange={commentChange}
            />
          </CommentsBox>
        ) : (
          ""
        )}
      </CommentLayout>
      {comments
        //Content의 cId랑 Comment의 cid가 같읕거만 보여주게 필터를 걸었음
        .filter((c) => c.cid === commentId)
        .map((comment) => {
          return <Comments comment={comment} />;
        })}
    </>
  );
}

export default Comment;

const CommentLayout = styled.div`
  width: 100%;
  height: 90%;
`;

const ContentsBox = styled.div`
  box-shadow: 1px 2px 1px 1px #bdbdbd;
  padding: 20px;
  margin-top: 20px;
  border: 1px solid black;
  border-radius: 15px;
  background-color: white;
  width: 50%;
  height: 50%;
  display: inline;
`;

const IconBox2 = styled.span`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-top: 1px solid #cccccc;
`;
const CommentsBox = styled.div`
  height: 90%;
  width: 100%;
  border-top: 0.1px solid #999;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const CommentsInput = styled.input`
  border: none;
  background-color: #f3f3f3;
  width: 400px;
  height: 25px;
  border-radius: 20px;
  margin-top: 5px;
`;

const ProfileImg = styled.img`
  margin-top: 10px;
  margin-bottom: 10px;

  width: 30px;
  height: 30px;
  border: 1px solid #d3d3d3;
  border-radius: 50%;
`;