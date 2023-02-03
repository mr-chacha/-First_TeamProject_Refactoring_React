import styled from "styled-components";
const Layout = styled.div`
  width: 80%;
  height: 100%;

  display: flex;
  margin-top: 5px;
`;
const CommentsImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 30px;
`;
const CommentsTitle = styled.div`
  font-size: 14px;
`;
const Comment = styled.div`
  display: flex;
  align-items: center;
  background-color: #f3f3f3;
  border: 1px solid;
  border: none;
  border-radius: 30px;
  font-size: 13px;
  width: 400px;
  height: 30px;
`;
export { Layout, CommentsImg, CommentsTitle, Comment };
