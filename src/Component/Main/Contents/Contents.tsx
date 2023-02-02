import { ContentsBox, ContentsLayout } from "./style";

import ContentsHeader from "./ContentsHeader/ContentsHeader";
import Comment from "./Comment/Comment";
export default function Contents({ item }: any) {
  return (
    <>
      <ContentsLayout>
        <ContentsBox>
          <ContentsHeader item={item} />
          <Comment item={item} />
        </ContentsBox>
      </ContentsLayout>
    </>
  );
}
