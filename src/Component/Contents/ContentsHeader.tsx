import { faCheck, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { authService, db } from "../../FireBase";
import styled from "styled-components";
function ContentsHeader({ item }: any) {
  const sucRef = useRef<any>(null);
  const editRef = useRef<any>(null);
  const contentRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [contents, setContents] = useState("");
  //본문삭제하기
  const DeleteContent = async (Id: any) => {
    await deleteDoc(doc(db, "reviews", Id));
  };
  // 수정 onChange
  const onChangeContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setContents(event.target.value);
  };
  //수정버튼
  const contentEditBtn = (event: any) => {
    sucRef.current!.style.display = "block";
    inputRef.current!.style.display = "block";
    editRef.current!.style.display = "none";
    contentRef.current!.style.display = "none";
    setContents(item.content);
    inputRef.current!.focus();
  };
  //수정완료버튼
  const contentSuccessBtn = async (reviewId: any) => {
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
          <ProfileImg src={item.profileImg} />
          <div>
            <Title> {item.displayName}</Title>
            <Contnet ref={contentRef}> {item.content}</Contnet>
          </div>
          <Time> {item.createdAt}</Time>
        </HeaderBox>
        {/* 같은 id인경우에만 아이콘이 보이게하기 */}
        {item.authId === authService.currentUser?.uid ? (
          <div>
            <IconBox>
              <FontAwesomeIcon
                ref={editRef}
                icon={faPen}
                onClick={contentEditBtn}
                style={{
                  position: "relative",
                  cursor: "pointer",
                }}
              />
              <FontAwesomeIcon
                ref={sucRef}
                icon={faCheck}
                onClick={contentSuccessBtn}
                style={{
                  position: "relative",
                  cursor: "pointer",
                  display: "none",
                }}
              />
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => DeleteContent(item.id)}
                style={{
                  position: "relative",
                  cursor: "pointer",
                  marginTop: "5px",
                }}
              />
            </IconBox>
          </div>
        ) : (
          ""
        )}
      </Header>

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

const ContetnsInput = styled.input``;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border: 1px solid #d3d3d3;
  border-radius: 50%;
`;
const Title = styled.span`
  font-size: 17;
  margin-left: 10px;
  font-weight: 500;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Time = styled.span`
  margin-left: 5px;
  font-size: 10px;
  color: gray;
`;
const IconBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderBox = styled.div`
  display: flex;
`;
const Contnet = styled.div`
  margin-top: 3px;
  font-size: 15px;
  margin-bottom: 10px;
  margin-left: 10px;
`;
