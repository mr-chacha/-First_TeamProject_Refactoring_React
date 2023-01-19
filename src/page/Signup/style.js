import styled from "styled-components";

const SignUpLayout = styled.div`
  width: 100%;
  height: 1080px;
`;
const SignUpBox = styled.div`
  width: 450px;
  height: 400px;
  border: 3px solid green;

  //글씨 중앙에 위치하게하기
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  //박스 중앙에 위치하게하기
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const SinupTitle = styled.h1``;
const Signupcontainer = styled.div`
  width: 400px;
  margin-left: 200px;
`;
const SinupForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const InputBox = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
`;
const BtnBox = styled.div`
  margin-top: 5px;
  display: flex;
`;
const CheckMsg = styled.p`
  color: #f03e3e;
  margin: 0px;
  display: none;
  font-size: 10px;
`;
export {
  SignUpBox,
  SignUpLayout,
  SinupTitle,
  SinupForm,
  InputBox,
  BtnBox,
  CheckMsg,
  Signupcontainer,
};
