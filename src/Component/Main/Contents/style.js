import styled from "styled-components";

const ContentsLayout = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
`;
const ContentsBtn = styled.button``;
const ContetnsInput = styled.input``;
const ContentsBox = styled.div`
  box-shadow: 1px 2px 1px 1px #bdbdbd;
  padding: 20px;
  margin-top: 20px;
  border: 1px solid black;
  border-radius: 15px;
  background-color: white;
  width: 50%;
  height: 90px;
  display: inline;
`;
const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border: 1px solid #d3d3d3;
  border-radius: 50%;
`;
const Title = styled.div`
  margin-left: 10px;
`;
const Contnet = styled.div``;
const Header = styled.div`
  display: flex;
`;

const Time = styled.div`
  font-size: 10px;
  color: gray;
  margin-right: 0;
`;

export {
  ContentsBox,
  ContentsLayout,
  ContentsBtn,
  ContetnsInput,
  ProfileImg,
  Title,
  Contnet,
  Header,
  Time,
};
