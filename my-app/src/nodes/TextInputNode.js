// src/nodes/TextInputNode.js
import React from "react";
import BaseNode from "./BaseNode";

export default function TextInputNode({ id, data }) {
  const render = () => <div style={{ fontSize: 13 }}>{data.value || "text value"}</div>;
  return (
    <BaseNode
      id={id}
      data={{
        ...data,
        title: data.title || "TextInput",
        icon: "TX",
        inputs: [],
        outputs: [{ name: "text" }],
        render,
      }}
    />
  );
}
