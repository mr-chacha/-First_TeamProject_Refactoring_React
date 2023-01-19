import React from "react";
import { Mainlayout, MainTitle, MainBox, InputBox, Inputs } from "./style";
function Main() {
  return (
    <Mainlayout>
      <InputBox>
        내용 : <Inputs />
      </InputBox>
      <MainBox>
        <h4>아이디</h4>
        <p>내용</p>
      </MainBox>
      <MainBox>
        <h4>아이디</h4>
        <p>내용</p>
      </MainBox>
      <MainBox>
        <h4>아이디</h4>
        <p>내용</p>
      </MainBox>
    </Mainlayout>
  );
}


export default Main;
