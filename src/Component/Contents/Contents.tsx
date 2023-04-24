import styled from "styled-components";
import ContentsHeader from "./ContentsHeader";
import Comment from "../Comment/Comment";

export default function Contents({ item }: any) {
  return (
    <>
      {/*컨텐츠 레이아웃 */}
      <ContentsLayout>
        <ContentsBox>
          {/* 컨텐츠 수정 삭제 헤더*/}
          <ContentsHeader item={item} />
          {/* 댓글 부분*/}
          <Comment item={item} />
        </ContentsBox>
      </ContentsLayout>
    </>
  );
}
// 메인 전체부분?
const ContentsLayout = styled.div`
  /* width: 1500px; */
  height: 50%;
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 10px;
  @media screen and (max-width: 1920px) {
    width: 100%;
  }
  @media screen and (max-width: 790px) {
    width: 100%;
  }
  @media screen and (max-width: 490px) {
    width: 90%;
  }
`;

//코멘트 부분
const ContentsBox = styled.div`
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin-top: 20px;
  border-radius: 15px;
  background-color: white;
  width: 50%;
  height: 100%;
  display: inline;
  @media screen and (max-width: 1920px) {
    width: 50%;
  }
  @media screen and (max-width: 790px) {
    width: 80%;
  }
  @media screen and (max-width: 490px) {
    width: 90%;
  }
`;

const IconBox2 = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-top: 0.1px solid #999;
`;
const CommentsBox = styled.span`
  display: flex;
  border-top: 0.1px solid #999;
  margin-top: 10px;
`;
const CommentsInput = styled.input`
  border: none;
  background-color: #f3f3f3;
  width: 80%;
  height: 20px;
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
  ContentsLayout,
  IconBox2,
  ProfileImg,
  CommentsBox,
  CommentsInput,
};
