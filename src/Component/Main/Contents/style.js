import styled from "styled-components";

const ContentsLayout = styled.div`
  width: 100%;
  height: 80%;
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
  height: 80px;
`;
const ProfileImg = styled.img`
  position: relative;
  margin: auto;
  width: 80px;
  height: 80px;
  border: 1px solid #d3d3d3;
  border-radius: 50%;
`;
export { ContentsBox, ContentsLayout, ContentsBtn, ContetnsInput, ProfileImg };
