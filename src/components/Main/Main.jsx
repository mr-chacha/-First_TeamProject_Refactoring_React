import React from "react";
import { useState } from "react";
import { Mainlayout, InputBox, Inputs, InPutBtn } from "./style";
import { uuidv4 } from "@firebase/util";
import { db } from "../../FifeBase";
import { useRef } from "react";
import { authService } from "../../FifeBase";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import Contents from "./Contents/Contents";
function Main() {
  //content 추가하기
  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [contents, setContents] = useState([
    {
      displayName: "",
      content: "하이",
      id: uuidv4(),
      uuid: "",
    },
  ]);
  const contentChange = (event) => {
    setContent(event.target.value);
  };
  //content 파이어베이스에서 가져오기
  useEffect(() => {
    const q = collection(db, "reviews");
    onSnapshot(q, (snapshot) => {
      const contents = snapshot.docs.map((doc) => {
        const content = {
          id: doc.id,
          ...doc.data(),
        };
        return content;
      });
      setContents(contents);
    });
  }, []);

  // content 파에어베이스에 추가하기
  const addContet = (event) => {
    event.preventDefault();
    //로그인 안했으면 추가못함
    if (!authService.currentUser) {
      alert("로그인이 필요합니다");
      return;
    } else if (!content) {
      alert("글을 작성하세요");
      contentRef.current.focus();
      return;
    }
    //파이어베이스 데이터베이스에 등록한글 넣어놓기
    const authId = authService.currentUser?.uid;
    const usersRef = collection(db, "reviews");
    setDoc(doc(usersRef), {
      displayName: authService.currentUser.displayName,
      authId,
      content,
    });
    setContent("");
    alert("글이 등록됐습니다.");
    return;
  };

  const name = authService.currentUser.displayName;
  console.log(name);
  return (
    <Mainlayout>
      닉네임 : {authService.currentUser.displayName}
      <InputBox>
        작성자 : {name}
        <Inputs
          placeholder="글을 작성하세요"
          value={content}
          onChange={contentChange}
          ref={contentRef}
        />
        <InPutBtn onClick={addContet}>등록</InPutBtn>
      </InputBox>
      {contents.map((item) => {
        return <Contents item={item} />;
      })}
    </Mainlayout>
  );
}

export default Main;
