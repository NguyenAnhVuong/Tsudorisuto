import { Button, Tooltip } from "antd";
import React from "react";
import { IoIosArrowUp } from "react-icons/io";

type Props = {};

const ScrollToTopButton = (props: Props) => {
  const gotoTop = () => {
    window.scrollTo({
      top: 0,
    });
  };
  return (
    <Tooltip placement="top" title="Scroll to top">
      <Button
        className="bg-[#5cb85c] justify-center flex w-9 h-9 md:w-10 md:h-10 p-0 items-center"
        type="primary"
        onClick={gotoTop}
      >
        <IoIosArrowUp size={28} />
      </Button>
    </Tooltip>
  );
};

export default ScrollToTopButton;
