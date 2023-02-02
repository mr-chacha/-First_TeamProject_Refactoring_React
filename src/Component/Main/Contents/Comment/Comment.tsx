import React from "react";
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

function Comment({ item }: any) {
  //댓글달기
  const commetsAdd = () => {};
  return (
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
      <CommentsBox>
        <ProfileImg src={item.profileImg} />
        <CommentsInput placeholder="  댓글을 달아주세요." />
      </CommentsBox>
    </CommentLayout>
  );
}

export default Comment;
