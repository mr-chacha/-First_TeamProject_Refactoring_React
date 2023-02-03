import styled from "styled-components";

const Headerstyle = styled.h1`
  padding: 0;
  margin: 0;
  color: blue;
  margin-left: 10px;
`;

const Layout = styled.div`
  width: 100%;
  height: 80px;
  background-color: white;
  display: flex;
  position: fixed;
  justify-content: space-between;
  align-items: center;
  margin-right: 10px;
  padding: 0px;
  margin: 0px;
`;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border: 1px solid #d3d3d3;
  border-radius: 50%;
  cursor: pointer;
`;
const Modal = styled.div`
  width: 100px;
  height: 200px;
  background-color: white;
  border: 1px solid black;
  border-radius: 20px;
`;
export { Headerstyle, Layout, ProfileImg, Modal };
