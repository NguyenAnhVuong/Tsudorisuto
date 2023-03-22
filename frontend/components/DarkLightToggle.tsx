import { Button } from "antd";
import React from "react";
import { BsFillSunFill } from "react-icons/bs";
import { FaMoon } from "react-icons/fa";
import HomeStyles from "../styles/Home.module.css";

type Props = {
  theme: string;
  setTheme: (theme: string) => void;
};

const DarkLightToggle = ({ theme, setTheme }: Props) => {
  const toggleDarkLight = () => {
    if (theme === "light") {
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };

  return (
    <Button
      className="bg-[#5cb85c] justify-center flex w-9 h-9 md:w-10 md:h-10 p-0 items-center"
      type="primary"
    >
      {theme === "dark" ? (
        <BsFillSunFill
          size={"24px"}
          color="#FFB200"
          onClick={() => toggleDarkLight()}
        />
      ) : (
        <FaMoon
          size={"24px"}
          color="#FFB200"
          onClick={() => toggleDarkLight()}
        />
      )}
    </Button>
  );
};

export default DarkLightToggle;
