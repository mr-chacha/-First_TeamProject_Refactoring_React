import styled from "styled-components";
const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin: 10px 10px 10px 10px;
`;
const CommentsImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 30px;
`;
const CommentsTitle = styled.div`
  font-size: 17;
  margin-left: 10px;
  font-weight: 500;
`;
const Comment = styled.div`
  margin-top: 5px;
  font-size: 12px;
  margin-left: 10px;
`;

const CommentsTime = styled.div`
  margin-left: 5px;
  font-size: 10px;
  color: gray;
`;
export { Layout, CommentsImg, CommentsTitle, Comment, CommentsTime };
