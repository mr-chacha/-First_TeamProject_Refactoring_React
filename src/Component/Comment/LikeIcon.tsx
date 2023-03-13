import React from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { authService, db } from "../../FireBase";
import { collection, doc, setDoc } from "firebase/firestore";
export const LikeIcon = ({ id, item }: any) => {
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
  console.log();

  const likeCount = id?.id.length;
  return (
    <>
      <FontAwesomeIcon
        onClick={likeAdd}
        icon={faHeart}
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
  );
};
