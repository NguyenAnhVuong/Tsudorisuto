import { Button } from "antd";
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
    <Button
      className="bg-[#5cb85c] justify-center flex w-9 h-9 md:w-10 md:h-10 p-0 items-center fixed right-4 bottom-4 z-50"
      type="primary"
      onClick={gotoTop}
    >
      <IoIosArrowUp size={28} />
    </Button>
  );
};

export default ScrollToTopButton;
