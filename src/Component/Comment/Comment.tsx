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
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { authService, db } from "../../FireBase";
import { uuidv4 } from "@firebase/util";
import { formatDate } from "../../utils/Data";
import Comments from "./Comments";
import { LikeIcon } from "./LikeIcon";
function Comment({ item, id }: any) {
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

  //파이어베이스에서 불러온 좋아요리스트
  const [likeId, setLikeId] = useState<any>();

  //좋아요의 아이디
  const likeIds = likeId?.map((id: any) => id?.cId);

  const likeIdssss = likeId?.map((id: any) => id?.id);

  //좋아요의 아이디와 포스트의 cId랑 같은거만 분리해줌
  const like = likeIds?.filter((id: any) => id === item?.cId);
  //분리해준거를 카운트해줌
  const likeCount = like?.length;
  //좋아요 누른아이디
  const likeUserIds = likeId?.map((id: any) => id?.userId);

  //좋아요추가하기함수
  const likeAdd = (): any => {
    if (!authService?.currentUser) {
      alert("로그인후 사용 가능합니다");
      return;
    } else {
      const userId = authService.currentUser?.uid;
      const likeRef = collection(db, "Like");
      setDoc(doc(likeRef), {
        displayName: authService.currentUser?.displayName,
        userId,
        cId: item?.cId,
      });
      return;
    }
  };

  // 좋아요 불러오기
  useEffect(() => {
    const likeCounts = query(collection(db, "Like"));
    onSnapshot(likeCounts, (snapshot) => {
      const Likes = snapshot.docs.map((doc: any) => {
        const like = {
          id: doc.id,
          ...doc.data(),
        };
        return like;
      });
      setLikeId(Likes);
    });
  }, []);

  //좋아요 삭제
  const Delete = async (id: any) => {
    await deleteDoc(doc(db, "Like", id));
    return;
  };
  const test = () => {
    likeId?.filter((c: any) => c.cId === commentId).map((i: any) => {});
  };
  return (
    <>
      <CommentLayout>
        <IconBox2>
          <span>
            <>
              <FontAwesomeIcon
                onClick={() => {
                  likeId
                    ?.filter((c: any) => c.cId === commentId)
                    .map((i: any) => {
                      if (i.userId === authService.currentUser?.uid) {
                        Delete(i.id);
                        return;
                      }
                    });
                }}
                // onClick={likeAdd}
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
              좋아요{likeCount}
            </>
          </span>

          {/* 댓글달기 버튼*/}
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
          return (
            <Comments
              comment={comment}
              key={comment?.id}
              likeUserIds={likeUserIds}
            />
          );
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
