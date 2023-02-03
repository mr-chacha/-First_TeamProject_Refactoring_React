import styled from "styled-components";
const Layout = styled.div`
  width: 100%;
  height: 700px;
  background-color: #f3f3f3;
  margin: 0px;
  padding: 0px;
`;
const ProfileImg = styled.img`
  position: relative;
  margin: auto;
  width: 150px;
  height: 150px;
  border: 1px solid #d3d3d3;
  border-radius: 50%;
  cursor: pointer;
`;
const ProfileInput = styled.input``;

export { ProfileImg, ProfileInput, Layout };
