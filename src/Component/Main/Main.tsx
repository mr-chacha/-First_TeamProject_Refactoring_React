import React from "react";
import { useState } from "react";
import {
  Mainlayout,
  InputBox,
  Inputs,
  InPutBtn,
  ContentsBox,
  ProfileImg,
  Img,
} from "./style";
import { uuidv4 } from "@firebase/util";
import { db, storage } from "../../FireBase";
import { useRef } from "react";
import { authService } from "../../FireBase";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { useEffect } from "react";
import Contents from "./Contents/Contents";
import { formatDate } from "../../utils/Data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faTrash } from "@fortawesome/free-solid-svg-icons";
function Main() {
  const commentId = uuidv4();
  //닉네임
  const nicName = authService.currentUser?.displayName;
  //프로필 사진
  const [ProfilPhoto, setPProfilPhoto] = useState<any>(
    authService.currentUser?.photoURL
  );
  //시간
  const date = new Date().toString().slice(0, 25);
  //content 추가하기
  const contentRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState("");
  const [contents, setContents] = useState([
    {
      displayName: "",
      content: "",
      id: commentId,
      uuid: "",
      profileImg: "",
      img: "",
    },
  ]);

  // 수정
  const contentChange = (event: any) => {
    setContent(event.target.value);
  };
  // content 파이어베이스에서 가져오기
  useEffect(() => {
    const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const contents = snapshot.docs.map((doc: any) => {
        const content = {
          id: doc.id,
          ...doc.data(),
          createdAt: formatDate(doc.data().createdAt),
        };
        return content;
      });
      setContents(contents);
    });
  }, []);

  // content 파에어베이스에 추가하기
  const addContet = (event: any) => {
    event.preventDefault();
    //로그인 안했으면 추가못함
    if (!authService.currentUser) {
      alert("로그인이 필요합니다");
      return;
    } else if (!content) {
      alert("글을 작성하세요");
      contentRef.current!.focus();
      return;
    }
    setContent("");
    alert("글이 등록됐습니다.");
    //파이어베이스 데이터베이스에 등록한글 넣어놓기
    const authId = authService.currentUser?.uid;
    const usersRef = collection(db, "reviews");
    setDoc(doc(usersRef), {
      displayName: authService.currentUser.displayName,
      authId,
      content,
      createdAt: date,
      profileImg: authService.currentUser.photoURL,
      img: "",
      cId: commentId,
    });
    return;
  };

  //input placeholder
  const hello = `${nicName} 님안녕하세요`;
  return (
    <>
      {authService.currentUser ? (
        <Mainlayout>
          <InputBox>
            <ProfileImg src={ProfilPhoto} />
            <Inputs
              placeholder={hello}
              value={content}
              onChange={contentChange}
              ref={contentRef}
            />
            <FontAwesomeIcon
              style={{
                position: "relative",
                cursor: "pointer",
              }}
              icon={faComment}
              onClick={addContet}
            />
          </InputBox>
          {contents.map((item) => {
            return <Contents item={item} />;
          })}
        </Mainlayout>
      ) : (
        <Mainlayout>
          <InputBox>
            <Inputs
              placeholder={hello}
              value={content}
              onChange={contentChange}
              ref={contentRef}
            />
            <FontAwesomeIcon
              style={{
                position: "relative",
                cursor: "pointer",
              }}
              icon={faComment}
              onClick={addContet}
            />
          </InputBox>
          <ContentsBox>
            {contents.map((item) => {
              return <Contents item={item} />;
            })}
          </ContentsBox>
        </Mainlayout>
      )}
    </>
  );
}

export default Main;
