import { useState } from "react";
import styled from "styled-components";
import { uuidv4 } from "@firebase/util";
import { db } from "../FireBase";
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
import { faComment, faImage } from "@fortawesome/free-solid-svg-icons";
import defaultImg from ".././image/img1.png";
type ContentItem = {
  displayName: string;
  content: string;
  id: string;
  uuid: string;
  profileImg: string;
  img: string;
  like: number;
  likeuser: string;
};
function MainPage(): JSX.Element {
  const commentId = uuidv4();
  //닉네임
  const nicName = authService.currentUser?.displayName;

  //프로필 사진
  const ProfilPhoto = authService.currentUser?.photoURL;

  //시간
  const date: string = new Date().toString().slice(0, 25);
  //content 추가하기
  const contentRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState<string>("");

  const [contents, setContents] = useState<ContentItem[]>([
    {
      displayName: "",
      content: "",
      id: commentId,
      uuid: "",
      profileImg: "",
      img: "",
      like: 0,
      likeuser: "",
    },
  ]);

  // 수정
  const contentChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
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
  const addContet = (
    event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement>
  ): void => {
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
      img: attachment || null,
      cId: commentId,
      like: 0,
      likeuser: "",
    });
    setAttachment("");
    return;
  };

  //input placeholder
  const hello = `${nicName} 님안녕하세요`;
  // 사진등록
  const [attachment, setAttachment] = useState<string>();

  // 파일 업로드 input을 통해 업로드한 이미지를 DataURL로 변환
  const onChangeProfileImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (event.target.files) {
      reader.readAsDataURL(event.target.files[0]);
    }
    reader.onloadend = (finishedEvent) => {
      const PhotoURL = finishedEvent.target?.result;
      if (typeof PhotoURL === "string") {
        setAttachment(PhotoURL);
      }
    };
  };

  return (
    <HomePageLayout>
      {/* 로그인된 유저일때 인풋이 보이고 */}
      {authService.currentUser ? (
        <Mainlayout>
          <InputBox onSubmit={addContet}>
            {/* 프로필 이지 없을때 디폴트 이미지 보여주기 */}
            <InputHeader>
              <ProfileImg src={ProfilPhoto ? ProfilPhoto : defaultImg} />
              {/* 글 등록 인풋*/}
              <Inputs
                placeholder={hello}
                value={content}
                onChange={contentChange}
                ref={contentRef}
              />{" "}
            </InputHeader>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "600px",
              }}
            >
              <InputImage
                src={attachment}
                style={{ marginTop: attachment ? "30px" : "0px" }}
              />
            </div>
            {/* 글 등록 아이콘*/}
            <InputBody>
              <IconSpan>
                <label>
                  <input
                    type="file"
                    onChange={onChangeProfileImg}
                    style={{ display: "none" }}
                  />
                  <FontAwesomeIcon
                    style={{
                      // position: "relative",
                      cursor: "pointer",
                      fontSize: "35px",
                      marginRight: "8px",
                    }}
                    icon={faImage}
                  />
                  Image
                </label>
              </IconSpan>

              <IconSpan onClick={addContet}>
                <FontAwesomeIcon
                  style={{
                    // position: "relative",
                    cursor: "pointer",
                    fontSize: "35px",
                    marginRight: "8px",
                  }}
                  icon={faComment}
                />
                send{" "}
              </IconSpan>
            </InputBody>
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
const InputImage = styled.img`
  max-width: 80%;
  height: auto;
`;
const IconSpan = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 20px;
  padding-right: 30px;
  padding-left: 30px;
  &:hover {
    color: #2e77ee;
  }
`;
const InputHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50%;
`;
const InputBody = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
  width: 100%;
  justify-content: space-between;
  height: 50%;
`;
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
  /* width: 1500px; */
  /* width: 100%; */
  width: 100%;
  height: 100%;
  /* max-width: 50%;
  min-width: 500px; */
  background-color: red;
`;

const InputBox = styled.form`
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin-top: 20px;
  border-radius: 15px;
  background-color: white;
  width: 100%;
  height: 100%;
  /* height: 120px; */
  display: flex;
  align-items: center;
  flex-direction: column;
  @media screen and (max-width: 1920px) {
    background-color: yellow;
    width: 40%;
  }
  @media screen and (max-width: 790px) {
    background-color: gray;
    width: 80%;
  }
  @media screen and (max-width: 490px) {
    background-color: green;
    width: 90%;
  }
`;

const Inputs = styled.input`
  display: flex;
  justify-content: center;
  padding-left: 20px;
  font-size: 20px;
  width: 80%;
  height: 60px;
  background-color: #efefef;
  border: none;
  border-radius: 50px;
  margin: 0px 20px 0px 20px;
  cursor: pointer;
  &:hover {
    background-color: #e3e3e3;
  }
`;

const ContentsBox = styled.div`
  width: 100%;
  height: 100%;
`;
const ProfileImg = styled.img`
  margin: auto;
  width: 60px;
  height: 60px;
  border: 1px solid #d3d3d3;
  border-radius: 50px;
`;
