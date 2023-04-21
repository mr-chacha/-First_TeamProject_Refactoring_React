import { atom, selector } from "recoil";
import { authService } from "../FireBase";
// export const textState = atom({
//   key: "textState", // unique ID (with respect to other atoms/selectors)
//   default: [
//     {
//       displayName: "",
//       content: "",
//       id: "",
//       uuid: "",
//       profileImg: "",
//       img: "",
//     },
//   ], // default value (aka initial value)
// });
export const userName = atom({
  key: "userNames",
  default: authService?.currentUser?.displayName,
});
