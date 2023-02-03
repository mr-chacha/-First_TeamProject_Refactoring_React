import React from "react";
import { Layout, CommentsImg, CommentsTitle, Comment } from "./style";
export default function Comments({ comment }: any) {
  const ProfileImg = comment.profileImg;
  return (
    <Layout>
      <div>
        <CommentsImg src={ProfileImg} />
        <CommentsTitle>{comment.displayName}</CommentsTitle>
      </div>
      <div>
        <Comment>{comment.comment}</Comment>
      </div>
    </Layout>
  );
}
