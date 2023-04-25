import { useEffect } from "react";
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
  runTransaction,
  setDoc,
} from "firebase/firestore";
import { authService, db } from "../../FireBase";
import { formatDate } from "../../utils/Data";
import Comments from "./Comments";

import defaultImg from "../../image/img1.png";
import { log } from "console";

// item Type지정
interface CommentItem {
  item: {
    authId: string;
    cId: string;
    content: string;
    createdAt: string;
    displayName: string;
    id: string;
    img: string;
    like: number;
    likeuser: any;
    profileImg: string;
  };
}
function Comment({ item }: any) {
  //유저의 아이디
  const heartRef = useRef<any>();
  //댓글아이디
  const commentId = item.cId;
  //시간
  const date = new Date().toString().slice(0, 25);
  //댓글달기
  const CommentRef = useRef<HTMLInputElement>(null);
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

  //좋아요 함수
  const [likeCount, setLikeCount] = useState<number>(0);
  const [likedByCurrentUser, setLikedByCurrentUser] = useState<boolean>(false);

  const handleLikeClick = async () => {
    //로그인한 유저의 아이디
    const currentUserUid = authService?.currentUser?.uid;
    //리뷰의 아이디
    const contentsRef = doc(db, "reviews", item.id);

    try {
      await runTransaction(db, async (transaction) => {
        const commentDoc = await transaction.get(contentsRef);
        if (!commentDoc.exists()) {
          throw "Document does not exist!";
        }
        //좋아요누른 유저의리스트
        let likeUserList = Object.values(commentDoc.data().likeuser);
        //좋아요숫자
        let likeCount = commentDoc.data().like;

        if (likeUserList.includes(currentUserUid)) {
          // 리스트에 유저의 아이디가 있으면 카운트를 -1
          likeUserList = likeUserList.filter((e: any) => e !== currentUserUid);
          likeCount--;
        } else {
          // 리스트에 유저의 아이디가 없으면 카운트를 +1
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
  //좋아요가 0 이면 안보이면 0이 아닌경우만 보여주게
  const likecount = item.like === 0 ? "" : item.like;
  //프로필 사진
  const ProfilPhoto = authService.currentUser?.photoURL;
  //좋아요 누른 유저인지아닌지 판단
  const likeuser = item.likeuser.includes(authService.currentUser?.uid);

  return (
    <>
      <CommentLayout>
        <IconBox2>
          <>
            <IconSpan onClick={handleLikeClick}>
              <FontAwesomeIcon
                ref={heartRef}
                icon={faHeart}
                style={{
                  // position: "relative",
                  cursor: "pointer",
                  marginTop: "10px",
                  marginRight: "3px",

                  color: likeuser ? "red" : "gray",
                }}
              />
              좋아요 {likecount}
            </IconSpan>

            {/* {likeCount} */}
          </>

          {/* 댓글달기 버튼 */}
          <IconSpan onClick={commetsAdd}>
            <FontAwesomeIcon
              icon={faComment}
              style={{
                // position: "relative",
                cursor: "pointer",
                marginTop: "10px",
                marginRight: "3px",
                color: "blue",
              }}
            />
            댓글달기
          </IconSpan>
        </IconBox2>
        {/* 로그인된 유저일때만 댓글입력창이 보이게*/}
        <CommentsBox>
          {/*프로필 이미지*/}
          <ProfileImg src={ProfilPhoto ? ProfilPhoto : defaultImg} />
          {/*댓글 입력창*/}
          <form onSubmit={commetsAdd} style={{ width: "92%", height: "40px" }}>
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
const IconSpan = styled.span`
  cursor: pointer;
  margin: 5px 30px;
  @media screen and (max-width: 1920px) {
    font-size: 20px;
  }
  @media screen and (max-width: 790px) {
    font-size: 15px;
  }
  @media screen and (max-width: 490px) {
    font-size: 13px;
  }
`;
const CommentLayout = styled.div`
  width: 100%;
  height: 90%;
`;

const IconBox2 = styled.span`
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-top: 0.1px solid #cccccc;
`;
const CommentsBox = styled.div`
  height: 90%;
  width: 100%;
  border-top: 0.1px solid #cccccc;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const CommentsInput = styled.input`
  font-size: 20px;
  border: none;
  background-color: #efefef;
  width: 95%;
  height: 100%;
  border-radius: 20px;
  margin-top: 5px;
  padding-left: 20px;
  cursor: pointer;
  @media screen and (max-width: 1920px) {
    font-size: 20px;
  }
  @media screen and (max-width: 790px) {
    font-size: 15px;
  }
  @media screen and (max-width: 490px) {
    font-size: 13px;
  }
  &:hover {
    background-color: #e3e3e3;
  }
`;

const ProfileImg = styled.img`
  margin-top: 20px;
  margin-bottom: 10px;
  width: 40px;
  height: 40px;
  border: 1px solid #d3d3d3;
  border-radius: 50%;
`;
