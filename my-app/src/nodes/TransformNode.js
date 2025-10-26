// src/nodes/TransformNode.js
import React from "react";
import BaseNode from "./BaseNode";

export default function TransformNode({ id, data }) {
  const render = () => <div style={{ fontSize: 13 }}>{data.operation || "map/transform"}</div>;
  return (
    <BaseNode
      id={id}
      data={{
        ...data,
        title: data.title || "Transform",
        icon: "TF",
        inputs: data.inputs || [{ name: "input" }],
        outputs: data.outputs || [{ name: "output" }],
        render,
      }}
    />
  );
}
