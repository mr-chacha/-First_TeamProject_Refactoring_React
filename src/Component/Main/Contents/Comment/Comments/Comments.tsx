import React from "react";
import {
  Layout,
  CommentsImg,
  CommentsTitle,
  Comment,
  CommentsTime,
} from "./style";
export default function Comments({ comment }: any) {
  const ProfileImg = comment.profileImg;
  return (
    <Layout>
      <CommentsImg src={ProfileImg} />
      <div>
        <CommentsTitle>{comment.displayName}</CommentsTitle>
        <Comment>{comment.comment}</Comment>
      </div>
      <CommentsTime>{comment.createdAt}</CommentsTime>
    </Layout>
  );
}
