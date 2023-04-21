import { faCheck, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { authService, db } from "../../FireBase";
import styled from "styled-components";
import defaultImg from "../../image/img1.png";
import { log } from "console";
interface CommentItem {
  item: {
    authId: string;
    cId: string;
    content: string;
    createdAt: string;
    displayName: string;
    id: string;
    img: string;
    like: number;
    likeuser: string;
    profileImg: string;
  };
}
function ContentsHeader({ item }: CommentItem) {
  const sucRef = useRef<any>(null);
  const editRef = useRef<any>(null);
  const contentRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [contents, setContents] = useState("");
  //본문삭제하기
  const DeleteContent = async (Id: string) => {
    if (window.confirm("정말 삭제하겠습니까??")) {
      await deleteDoc(doc(db, "reviews", Id));
      return;
    } else {
      return;
    }
  };
  // 수정 onChange
  const onChangeContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setContents(event.target.value);
  };
  //수정버튼
  const contentEditBtn = (event: React.MouseEvent<HTMLSpanElement>) => {
    sucRef.current!.style.display = "block";
    inputRef.current!.style.display = "block";
    editRef.current!.style.display = "none";
    contentRef.current!.style.display = "none";
    setContents(item.content);
    inputRef.current!.focus();
  };

  //수정완료버튼
  const contentSuccessBtn = async (
    event: React.MouseEvent<HTMLSpanElement>
  ) => {
    const contentsRef = doc(db, "reviews", item.id);
    try {
      await updateDoc(contentsRef, {
        content: contents,
      });
      sucRef.current!.style.display = "none";
      sucRef.current!.style.display = "none";
      inputRef.current!.style.display = "none";
      editRef.current!.style.display = "block";
      contentRef.current!.style.display = "block";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header>
        <HeaderBox>
          {/* 프로필 이미지*/}
          <ProfileImg
            src={
              item.profileImg === null || undefined
                ? defaultImg
                : item.profileImg
            }
          />
          <div style={{ marginLeft: "10px" }}>
            {/* 프로필 닉네임*/}
            <ContentHeader>
              <ProfileName>{item.displayName}</ProfileName>
              {/* 등록된 시간*/}
              <Time> {item.createdAt}</Time>
            </ContentHeader>
            {/* 등록된 컨텐츠*/}
            <Contnet ref={contentRef}> {item.content}</Contnet>

            <PostImg src={item?.img} />
          </div>
        </HeaderBox>
        {/* 같은 id인경우에만 수정 삭제 아이콘 보이게하기 */}
        {item.authId === authService.currentUser?.uid ? (
          <div>
            {/* 수정 아이콘*/}
            <IconBox>
              <IconSpan onClick={contentEditBtn}>
                <FontAwesomeIcon
                  ref={editRef}
                  icon={faPen}
                  style={{
                    // position: "relative",
                    cursor: "pointer",
                    fontSize: "20px",
                  }}
                />
              </IconSpan>
              {/* 수정 확인 아이콘*/}
              <IconSpan onClick={contentSuccessBtn}>
                <FontAwesomeIcon
                  ref={sucRef}
                  icon={faCheck}
                  style={{
                    // position: "relative",
                    cursor: "pointer",
                    display: "none",
                    fontSize: "20px",
                  }}
                />
              </IconSpan>
              {/* 삭제 아이콘*/}
              <IconSpan>
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => DeleteContent(item.id)}
                  style={{
                    // position: "relative",
                    cursor: "pointer",
                    marginTop: "5px",
                    fontSize: "20px",
                  }}
                />
              </IconSpan>
            </IconBox>
          </div>
        ) : (
          ""
        )}
      </Header>
      {/* 수정 인풋창*/}
      <ContetnsInput
        ref={inputRef}
        style={{ display: "none" }}
        value={contents}
        onChange={onChangeContent}
      />
    </>
  );
}

export default ContentsHeader;
const PostImg = styled.img`
  max-width: 90%;
  height: auto;
`;
const IconSpan = styled.span`
  :hover {
    color: #2e77ee;
  }
`;
const ContentHeader = styled.div`
  display: flex;
  align-items: center;
`;
const ContetnsInput = styled.input``;

const ProfileImg = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 50%;
`;
const ProfileName = styled.p`
  font-size: 25px;
  margin-left: 10px;
  font-weight: 600;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const Time = styled.p`
  margin-top: 5px;
  margin-left: 5px;
  font-size: 15px;
  color: gray;
`;
const IconBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderBox = styled.div`
  display: flex;
  margin-bottom: 20px;
`;
const Contnet = styled.p`
  font-weight: 400;
  margin-top: 3px;
  font-size: 22px;
  margin: 10px;

  overflow-wrap: break-word;
`;
