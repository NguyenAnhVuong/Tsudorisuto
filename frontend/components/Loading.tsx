import { Spin } from "antd";
import React from "react";

type Props = {
  height?: string;
};

const Loading = ({ height = "" }: Props) => {
  return (
    <div
      className={"w-full flex justify-center items-center"}
      style={{ height: height ? height : "100vh" }}
    >
      <Spin />
    </div>
  );
};

export default Loading;
