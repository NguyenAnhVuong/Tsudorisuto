import { addTaskMutation } from "@/apollo-client/mutations";
import { getTasks } from "@/apollo-client/queries";
import AddTaskButton from "@/components/AddTaskButton";
import BulkActionBox from "@/components/BulkActionBox";
import Header from "@/components/Header";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import TaskDetail from "@/components/TaskDetail";
import ToDoList from "@/components/ToDoList";
import { useMutation } from "@apollo/client";
import { Form, Input, message } from "antd";
import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

export default function Home() {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [keyWord, setKeyWord] = useState<string>("");
  const [addTask, { data, loading, error }] = useMutation(addTaskMutation);

  const successMess = () => {
    messageApi.open({
      type: "success",
      content: "Added task successfully",
    });
  };

  const errorMess = () => {
    messageApi.open({
      type: "error",
      content: "Failed to add task",
    });
  };
  const onFinish = async (values: any) => {
    try {
      await addTask({
        variables: {
          title: values.title,
          description: values.description,
          piority: values.piority,
          dueDate: values.dueDate,
        },
        refetchQueries: [{ query: getTasks, variables: { keyWord } }],
      });
      successMess();
      form.resetFields();
    } catch (e) {
      errorMess();
    }
  };

  const onFinishFailed = (errorInfo: any) => {};

  return (
    <div className="pb-24">
      {contextHolder}
      <Header />
      <div className="m-4 mt-20 xl:flex xl:justify-center">
        <Input
          className="lg:hidden"
          size="large"
          placeholder="Search ..."
          prefix={<IoSearchSharp />}
          onChange={(e) => setKeyWord(e.target.value)}
        />
        <div className="lg:grid lg:grid-cols-2 lg:gap-4 lg:mt-4 xl:w-[1200px]">
          <div className="">
            <div className="hidden fixed lg:flex lg:flex-col justify-center lg:w-[48%] max-w-[616px] p-5 top-36 xl:top-56">
              <Input
                className="mb-8"
                size="large"
                placeholder="Search ..."
                prefix={<IoSearchSharp />}
                onChange={(e) => setKeyWord(e.target.value)}
              />
              <TaskDetail
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              />
            </div>
          </div>
          <ToDoList keyWord={keyWord} />
        </div>
      </div>
      <BulkActionBox keyWord={keyWord} />
      <AddTaskButton keyWord={keyWord} />
      <ScrollToTopButton />
    </div>
  );
}
