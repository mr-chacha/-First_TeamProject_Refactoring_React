import styled from "styled-components";

const ContetnsInput = styled.input``;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border: 1px solid #d3d3d3;
  border-radius: 50%;
`;
const Title = styled.span`
  font-size: 17;
  margin-left: 10px;
  font-weight: 500;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Time = styled.span`
  margin-left: 5px;
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
  margin-top: 3px;
  font-size: 15px;
  margin-bottom: 10px;
  margin-left: 10px;
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
