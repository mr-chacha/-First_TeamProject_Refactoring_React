import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { uuidv4 } from "@firebase/util";
import { db, storage } from "../FireBase";
import { useRef } from "react";
import { authService } from "../FireBase";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { useEffect } from "react";
import Contents from "../Component/Contents/Contents";
import { formatDate } from "../utils/Data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "react-query";
function MainPage() {
  const commentId = uuidv4();
  //닉네임
  const nicName = authService.currentUser?.displayName;
  //프로필 사진
  const ProfilPhoto = authService.currentUser?.photoURL;

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
      displayName: authService.currentUser?.displayName,
      authId,
      content,
      createdAt: date,
      profileImg: authService.currentUser?.photoURL,
      img: "",
      cId: commentId,
    });
    return;
  };

  //input placeholder
  const hello = `${nicName} 님안녕하세요`;
  return (
    <HomePageLayout>
      {/* 로그인된 유저일때 인풋이 보이고 */}
      {authService.currentUser ? (
        <Mainlayout>
          <InputBox onSubmit={addContet}>
            {/* 프로필 이지 없을때 디폴트 이미지 보여주기 */}
            <ProfileImg src={ProfilPhoto ? ProfilPhoto : "default-image-url"} />
            {/* 글 등록 인풋*/}
            <Inputs
              placeholder={hello}
              value={content}
              onChange={contentChange}
              ref={contentRef}
            />
            {/* 글 등록 아이콘*/}
            <FontAwesomeIcon
              style={{
                position: "relative",
                cursor: "pointer",
              }}
              icon={faComment}
              onClick={addContet}
            />
          </InputBox>
          {/* 등록된 글 컴포넌트*/}
          {contents.map((item) => {
            return <Contents item={item} key={item?.id} />;
          })}
        </Mainlayout>
      ) : (
        <>
          {/* 로그인 안된 유저일때는 인풋이 안보임*/}
          <Mainlayout>
            <ContentsBox>
              {contents.map((item) => {
                return <Contents item={item} key={item?.id} />;
              })}
            </ContentsBox>
          </Mainlayout>
        </>
      )}
    </HomePageLayout>
  );
}

export default MainPage;
const HomePageLayout = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f3f3f3;
`;
const Mainlayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 80px 0px 50px 0px;
  width: 900px;
  height: 100%;
`;
const MainTitle = styled.div`
  font-size: 20px;
`;

const MainBox = styled.div`
  box-shadow: 1px 2px 1px 1px #bdbdbd;
  padding: 20px;
  margin-top: 20px;
  border: 1px solid black;
  border-radius: 15px;
  background-color: white;
  width: 50%;
  height: 100px;
`;

const InputBox = styled.form`
  box-shadow: 1px 2px 1px 1px #bdbdbd;
  padding: 20px;
  margin-top: 20px;
  border: 1px solid black;
  border-radius: 15px;
  background-color: white;
  width: 50%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Inputs = styled.input`
  width: 80%;
  height: 80%;
  background-color: #f7f7f7;
  border: none;
  border-radius: 50px;
  margin: 0px 20px 0px 20px;
`;

const InPutBtn = styled.button``;
const ContentsBox = styled.div`
  width: 100%;
  height: 100%;
`;
const ProfileImg = styled.img`
  position: relative;
  margin: auto;
  width: 40px;
  height: 40px;
  border: 1px solid #d3d3d3;
  border-radius: 50px;
`;

const Img = styled.img`
  position: relative;
  margin: auto;
  width: 40px;
  height: 40px;
  border: 1px solid #d3d3d3;
  border-radius: 50%;
`;
