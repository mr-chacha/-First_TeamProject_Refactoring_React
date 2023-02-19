import styled from "styled-components";

const NavStyle = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid;
  border-radius: 5px;
  background-color: #f3f3f3;
  position: fixed;
  top: 80px;
  right: 0;
  bottom: 0;
  left: 1;
  z-index: 99;
`;
const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
`;
const Btn = styled.span`
  cursor: pointer;
  margin: 5px;
`;
export { NavStyle, BtnBox, Btn };
