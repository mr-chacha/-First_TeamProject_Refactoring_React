import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";
import { authService, db } from "../../FireBase";
export default function Icon({ like, item }: any) {
  const [likeId, setLikeId] = useState<any>();

  const commentId = item.cId;

  const b = likeId
    ?.filter((c: any) => c?.cId === commentId)
    .map((id: any) => id?.userId);
  //삭제버튼
  const Delete = async (id: any) => {
    await deleteDoc(doc(db, "Like", id));
  };

  const likebtn = (id: any) => {
    //좋아요 누른아이디랑 유저의 아이디가 같으면 삭제
    if (like.userId === authService.currentUser?.uid) {
      deleteDoc(doc(db, "Like", id));
      return;
      console.log("같음");
    }
    if (like.userId !== authService.currentUser?.uid) {
      //   const userId = authService.currentUser?.uid;
      //   const likeRef = collection(db, "Like");
      //   setDoc(doc(likeRef), {
      //     displayName: authService.currentUser?.displayName,
      //     userId,
      //     cId: item?.cId,
      //   });
      console.log("다름");

      return;
    }
  };
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

  return (
    <div>
      <span>
        좋아요 취소
        <FontAwesomeIcon
          onClick={() => {
            likebtn(like.id);
          }}
          icon={faHeart}
          //   ref={heartRef}
          style={{
            position: "relative",
            cursor: "pointer",
            marginTop: "10px",
            marginRight: "3px",
            color: "red",
          }}
        />
        {/* 좋아요{likeCount} */}
      </span>
    </div>
  );
}
