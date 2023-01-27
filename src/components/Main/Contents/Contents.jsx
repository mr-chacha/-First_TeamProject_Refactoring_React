import React from "react";
import { MainBox } from "./style";
export default function Contents({ item }) {
  return <MainBox>{item.content}</MainBox>;
}
