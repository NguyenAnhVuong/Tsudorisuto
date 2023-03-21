import { Task } from "@/models";
import { Checkbox, Collapse, Form, message } from "antd";
import React from "react";
import TaskDetail from "./TaskDetail";
import { AiOutlineDelete } from "react-icons/ai";
import { useMutation } from "@apollo/client";
import {
  deleteTaskMutation,
  updateTaskMutation,
} from "@/apollo-client/mutations";
import { getTasks } from "@/apollo-client/queries";
import { NoticeType } from "antd/es/message/interface";
import { useAppDispatch } from "@/app/hook";
import { taskActions } from "@/features/task";

type Props = {
  task: Task;
  keyWord: string;
};

const Task = ({ task, keyWord }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  message.config({
    top: 100,
  });
  const [form] = Form.useForm();
  const [updateTask, { data, loading, error }] =
    useMutation(updateTaskMutation);
  const [
    deleteTask,
    { data: dataDelete, loading: loadingDelete, error: errorDelete },
  ] = useMutation(deleteTaskMutation);
  const dispatch = useAppDispatch();
  const onFinish = async (values: any) => {
    try {
      await updateTask({
        variables: {
          id: Number(task.id),
          title: values.title,
          description: values.description,
          piority: values.piority,
          dueDate: values.dueDate,
          completed: false,
        },
        refetchQueries: [{ query: getTasks, variables: { keyWord } }],
      });
      pushMessage("success", "Task updated successfully!");
    } catch (e) {
      pushMessage("error", "Task update failed!");
    }
  };

  const onFinishFailed = (errorInfo: any) => {};

  const pushMessage = (type: NoticeType, content: string) => {
    messageApi.open({
      type,
      content,
    });
  };

  const handleDeleteTask = async () => {
    try {
      await deleteTask({
        variables: {
          ids: [Number(task.id)],
        },
        refetchQueries: [{ query: getTasks, variables: { keyWord } }],
      });
      pushMessage("success", "Task deleted successfully!");
    } catch (e) {
      pushMessage("error", "Task delete failed!");
    }
  };

  const handleCheckTask = (checked: boolean) => {
    if (checked) {
      dispatch(taskActions.pushTask(task));
    } else {
      dispatch(taskActions.removeTask(task));
    }
  };

  const getBackgroundColor = (piority?: number) => {
    switch (piority) {
      case 0:
        return "bg-green-200";
      case 1:
        return "bg-yellow-200";
      case 2:
        return "bg-red-200";
      default:
        return "";
    }
  };
  return (
    <div className="relative my-2">
      {contextHolder}
      <div className="flex justify-between items-center gap-2 absolute right-3 top-3 z-10">
        <AiOutlineDelete
          className="hover:text-primary cursor-pointer"
          size={20}
          onClick={handleDeleteTask}
        />
        <Checkbox
          onChange={(e) => handleCheckTask(e.target.checked)}
        ></Checkbox>
      </div>
      <Collapse className={getBackgroundColor(task.piority)}>
        <Collapse.Panel header={task.title} key={"1"}>
          <TaskDetail
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            preValue={task}
          />
        </Collapse.Panel>
      </Collapse>
    </div>
  );
};

export default Task;
