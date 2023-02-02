import styled from "styled-components";

const CommentLayout = styled.div`
  width: 100%;
  height: 90%;
`;

const ContentsBox = styled.div`
  box-shadow: 1px 2px 1px 1px #bdbdbd;
  padding: 20px;
  margin-top: 20px;
  border: 1px solid black;
  border-radius: 15px;
  background-color: white;
  width: 50%;
  height: 50%;
  display: inline;
`;

const IconBox2 = styled.span`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-top: 0.1px solid #999;
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
`;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border: 1px solid #d3d3d3;
  border-radius: 50%;
`;
export {
  ContentsBox,
  CommentLayout,
  IconBox2,
  ProfileImg,
  CommentsBox,
  CommentsInput,
};
