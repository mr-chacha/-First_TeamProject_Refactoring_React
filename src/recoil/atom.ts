import { atom, selector } from "recoil";
export const textState = atom({
  key: "textState", // unique ID (with respect to other atoms/selectors)
  default: [
    {
      displayName: "",
      content: "",
      id: "",
      uuid: "",
      profileImg: "",
      img: "",
    },
  ], // default value (aka initial value)
});
