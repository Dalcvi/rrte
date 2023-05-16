import React from "react";
import { Editor } from "@rrte/editor";
import { Heading } from "@rrte/extension-heading";
// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  Heading,
  Editor,
};
export default ReactLiveScope;
