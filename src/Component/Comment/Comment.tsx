import React, { useEffect } from "react";
import styled from "styled-components";
import { useRef } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  setDoc,
} from "firebase/firestore";
import { authService, db } from "../../FireBase";
import { formatDate } from "../../utils/Data";
import Comments from "./Comments";

function Comment({ item }: any) {
  //유저의 아이디
  const heartRef = useRef<any>();
  //댓글아이디
  const commentId = item.cId;
  //시간
  const date = new Date().toString().slice(0, 25);
  //댓글달기
  const CommentRef = useRef<any>(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<any>([
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

  // 좋아요 불러오기
  // useEffect(() => {
  //   const likeCounts = query(collection(db, "Like"));
  //   onSnapshot(likeCounts, (snapshot) => {
  //     const Likes = snapshot.docs.map((doc: any) => {
  //       const like = {
  //         id: doc.id,
  //         ...doc.data(),
  //       };
  //       return like;
  //     });
  //     setLikeId(Likes);
  //   });
  // }, []);

  //좋아요 함수
  const [likeCount, setLikeCount] = useState<any>(0);
  const [likedByCurrentUser, setLikedByCurrentUser] = useState<any>(false);

  const handleLikeClick = async () => {
    const currentUserUid = authService?.currentUser?.uid;
    const contentsRef = doc(db, "reviews", item.id);

    try {
      await runTransaction(db, async (transaction) => {
        const commentDoc = await transaction.get(contentsRef);
        if (!commentDoc.exists()) {
          throw "Document does not exist!";
        }

        let likeUserList = Object.values(commentDoc.data().likeuser);
        let likeCount = commentDoc.data().like;

        if (likeUserList.includes(currentUserUid)) {
          likeUserList = likeUserList.filter((e: any) => e !== currentUserUid);
          likeCount--;
        } else {
          likeUserList.push(currentUserUid);
          likeCount++;
        }

        transaction.update(contentsRef, {
          likeuser: likeUserList,
          like: likeCount,
        });

        setLikeCount(likeCount);
        setLikedByCurrentUser(likeUserList.includes(currentUserUid));
      });
    } catch (error) {
      console.log("Transaction failed: ", error);
    }
  };

  return (
    <>
      <CommentLayout>
        <IconBox2>
          <span>
            <>
              <span ref={heartRef}>
                좋아요{item.like}
                <FontAwesomeIcon
                  onClick={handleLikeClick}
                  icon={faHeart}
                  ref={heartRef}
                  style={{
                    position: "relative",
                    cursor: "pointer",
                    marginTop: "10px",
                    marginRight: "3px",
                    color: "red",
                  }}
                />
              </span>
              {/* {likeCount} */}
            </>
          </span>

          {/* 댓글달기 버튼 */}
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
        {/* 로그인된 유저일때만 댓글입력창이 보이게*/}
        <CommentsBox>
          {/*프로필 이미지*/}
          <ProfileImg src={item.profileImg} />
          {/*댓글 입력창*/}
          <form onSubmit={commetsAdd}>
            <CommentsInput
              ref={CommentRef}
              placeholder="댓글을 입력해주세요."
              value={comment}
              onChange={commentChange}
            />
          </form>
        </CommentsBox>
      </CommentLayout>
      {comments
        //Content의 cId랑 Comment의 cid가 같읕거만 보여주게 필터를 걸었음
        .filter((c: any) => c.cid === commentId)
        .map((comment: any) => {
          return <Comments comment={comment} key={comment?.id} />;
        })}
    </>
  );
}

export default Comment;

const CommentLayout = styled.div`
  width: 100%;
  height: 90%;
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
  padding-left: 20px;
`;

const ProfileImg = styled.img`
  margin-top: 10px;
  margin-bottom: 10px;

  width: 30px;
  height: 30px;
  border: 1px solid #d3d3d3;
  border-radius: 50%;
`;
