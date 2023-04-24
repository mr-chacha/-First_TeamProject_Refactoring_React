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
        {/* 프로필 이미지*/}
        <ProfileImg
          src={
            item.profileImg === null || undefined ? defaultImg : item.profileImg
          }
        />
        <div style={{ marginLeft: "10px", width: "100%" }}>
          {/* 프로필 닉네임*/}
          <ContentHeader>
            <div style={{ display: "flex", gap: "15px" }}>
              {/*유저의 이름 */}
              <ProfileName>{item.displayName}</ProfileName>
              {/* 등록된 시간*/}
              <Time> {item.createdAt}</Time>
            </div>

            {item.authId === authService.currentUser?.uid ? (
              <div>
                {/* 수정 아이콘*/}
                <div>
                  <div onClick={contentEditBtn}>
                    <FontAwesomeIcon
                      ref={editRef}
                      icon={faPen}
                      style={{
                        // position: "relative",
                        cursor: "pointer",
                        fontSize: "20px",
                      }}
                    />
                  </div>
                  {/* 수정 확인 아이콘*/}
                  <div onClick={contentSuccessBtn}>
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
                  </div>
                  {/* 삭제 아이콘*/}
                  <div>
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
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </ContentHeader>
          {/* 등록된 컨텐츠*/}
        </div>

        {/* 같은 id인경우에만 수정 삭제 아이콘 보이게하기 */}
      </Header>
      {/* 수정 인풋창*/}
      <ContetnsInput
        ref={inputRef}
        style={{ display: "none" }}
        value={contents}
        onChange={onChangeContent}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "20px",
        }}
      >
        <Contnet ref={contentRef}>{item.content}</Contnet>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            // marginLeft: "-20px",
          }}
        >
          <PostImg src={item?.img} />
        </div>
      </div>
    </>
  );
}

export default ContentsHeader;
const PostImg = styled.img`
  /* margin-top: 30px;
  margin-bottom: 10px; */
  max-width: 80%;
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
  justify-content: space-between;
  width: 100%;
`;
const ContetnsInput = styled.input``;

const ProfileImg = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  @media screen and (max-width: 1920px) {
    width: 90px;
    height: 90px;
  }
  @media screen and (max-width: 790px) {
    width: 80px;
    height: 80px;
  }
  @media screen and (max-width: 490px) {
    width: 90%;
  }
`;
const ProfileName = styled.p`
  font-size: 25px;
  margin-left: 10px;
  font-weight: 600;
  @media screen and (max-width: 1920px) {
    font-size: 25px;
  }
  @media screen and (max-width: 790px) {
    font-size: 20px;
  }
  @media screen and (max-width: 490px) {
    font-size: 15px;
  }
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const Time = styled.p`
  margin-top: 10px;
  margin-left: 5px;
  font-size: 13px;
  color: gray;

  @media screen and (max-width: 1920px) {
    font-size: 13px;
  }
  @media screen and (max-width: 790px) {
    font-size: 10px;
  }
  @media screen and (max-width: 490px) {
    font-size: 10px;
  }
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
  font-size: 22px;
  margin: 10px;
  margin-bottom: 20px;
  width: 100%;
  word-break: break-all;
`;
