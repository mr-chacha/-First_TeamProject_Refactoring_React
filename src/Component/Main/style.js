import styled from "styled-components";

const Mainlayout = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  flex-direction: column;
  align-items: center;
  margin: 0;
  width: 90%;
  height: 90%;
`;
const MainTitle = styled.div`
  font-size: 20px;
`;

const MainBox = styled.div`
  box-shadow: 1px 2px 1px 1px #bdbdbd;
  padding: 20px;
  margin-top: 20px;
  border: 1px solid black;
  border-radius: 15px;
  background-color: white;
  width: 50%;
  height: 100px;
`;

const InputBox = styled.div`
  box-shadow: 1px 2px 1px 1px #bdbdbd;
  padding: 20px;
  margin-top: 20px;
  border: 1px solid black;
  border-radius: 15px;
  background-color: white;
  width: 50%;
  height: 100px;
  display: flex;
`;

const Inputs = styled.input`
  width: 90%;
  height: 80%;
  background-color: #f7f7f7;
  border: none;
  border-radius: 50px;
  margin: 0px 20px 0px 20px;
`;

const InPutBtn = styled.button``;
const ContentsBox = styled.div`
  width: 100%;
  height: 100%;
`;
const ProfileImg = styled.img`
  position: relative;
  margin: auto;
  width: 40px;
  height: 40px;
  border: 1px solid #d3d3d3;
  border-radius: 50%;
`;
export {
  Mainlayout,
  MainTitle,
  MainBox,
  InputBox,
  Inputs,
  InPutBtn,
  ContentsBox,
  ProfileImg,
};
