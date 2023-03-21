import AddTaskButton from "@/components/AddTaskButton";
import BulkActionBox from "@/components/BulkActionBox";
import Header from "@/components/Header";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import ToDoList from "@/components/ToDoList";
import { Input } from "antd";
import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

export default function Home() {
  const [keyWord, setKeyWord] = useState<string>("");
  return (
    <div className="pb-24">
      <Header />
      <div className="m-4 mt-20">
        <Input
          size="large"
          placeholder="Search ..."
          prefix={<IoSearchSharp />}
          onChange={(e) => setKeyWord(e.target.value)}
        />
        <ToDoList keyWord={keyWord} />
      </div>
      <BulkActionBox keyWord={keyWord} />
      <AddTaskButton keyWord={keyWord} />
      <ScrollToTopButton />
    </div>
  );
}
