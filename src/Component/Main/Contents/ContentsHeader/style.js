import styled from "styled-components";

const ContetnsInput = styled.input``;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border: 1px solid #d3d3d3;
  border-radius: 50%;
`;
const Title = styled.span`
  margin-left: 10px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Time = styled.span`
  font-size: 10px;
  color: gray;
`;
const IconBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderBox = styled.div`
  display: flex;
`;
const Contnet = styled.div`
  margin-bottom: 10px;
`;
export {
  ProfileImg,
  Title,
  Header,
  Time,
  IconBox,
  HeaderBox,
  ContetnsInput,
  Contnet,
};
