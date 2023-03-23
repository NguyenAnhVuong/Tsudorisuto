import { addTaskMutation } from "@/apollo-client/mutations";
import { getTasks } from "@/apollo-client/queries";
import { useMutation } from "@apollo/client";
import { Button, Form, message, Modal, Tooltip } from "antd";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import TaskDetail from "./TaskDetail";

type Props = {
  keyWord: string;
};

const AddTaskButton = ({ keyWord }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values: any) => {
    try {
      await addTask({
        variables: {
          title: values.title,
          description: values.description || "",
          piority: values.piority,
          dueDate: values.dueDate,
        },
        refetchQueries: [{ query: getTasks, variables: { keyWord } }],
      });
      successMess();
      setIsModalOpen(false);
      form.resetFields();
    } catch (e) {
      errorMess();
    }
  };

  const onFinishFailed = (errorInfo: any) => {};

  return (
    <div className="lg:hidden">
      {contextHolder}
      <Tooltip placement="top" title="Add task">
        <Button
          className="bg-[#5cb85c] justify-center flex w-9 h-9 md:w-10 md:h-10 p-0 items-center md:bottom-16 z-50"
          type="primary"
          onClick={showModal}
        >
          <FiPlus size={28} />
        </Button>
      </Tooltip>
      <Modal
        title="New Task"
        okText="Add"
        open={isModalOpen}
        onOk={handleAdd}
        onCancel={handleCancel}
      >
        <TaskDetail
          useDarkmode={false}
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        />
      </Modal>
    </div>
  );
};

export default AddTaskButton;
