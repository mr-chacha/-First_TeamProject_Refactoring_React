import React, { useEffect } from "react";
import {
  IconBox2,
  CommentsBox,
  CommentsInput,
  ProfileImg,
  CommentLayout,
} from "./style";
import { useRef } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { uuidv4 } from "@firebase/util";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { authService, db } from "../../../../FireBase";
import { formatDate } from "../../../../utils/Data";
import Comments from "./Comments/Comments";
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
