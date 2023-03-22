import { deleteTaskMutation } from "@/apollo-client/mutations";
import { getTasks } from "@/apollo-client/queries";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { RootState } from "@/app/store";
import { taskActions } from "@/features/task";
import { useMutation } from "@apollo/client";
import { message, Popconfirm, Tooltip } from "antd";
import { NoticeType } from "antd/es/message/interface";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
type Props = {
  keyWord: string;
};

const BulkActionBox = ({ keyWord }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const tasks = useAppSelector((state: RootState) => state.task.tasks);
  const dispatch = useAppDispatch();
  const [deleteTasks, { data, loading, error }] =
    useMutation(deleteTaskMutation);

  const pushMessage = (type: NoticeType, content: string) => {
    messageApi.open({
      type,
      content,
    });
  };

  const handleDeleteTasks = async () => {
    try {
      await deleteTasks({
        variables: {
          ids: tasks.map((task) => task.id),
        },
        refetchQueries: [{ query: getTasks, variables: { keyWord } }],
      });
      pushMessage("success", "Tasks deleted successfully!");
      dispatch(taskActions.setTasks([]));
    } catch (e) {
      pushMessage("error", "Tasks delete failed!");
    }
  };

  const confirm = () => {
    handleDeleteTasks();
  };

  const cancel = () => {};

  return (
    <div
      className={
        (tasks.length ? "bottom-0" : "bottom-[-64px]") +
        " fixed w-full flex justify-center transition-all "
      }
    >
      {contextHolder}
      <div
        className="flex justify-between w-[60%] max-w-[640px] py-3 px-4 rounded-t-lg bg-white"
        style={{ boxShadow: "0px -2px 8px 0px rgba(0, 0, 0, 0.3)" }}
      >
        <span>Bulk Action:</span>
        <div>
          <Popconfirm
            title="Delete selected tasks"
            description="Are you sure to delete selected tasks?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip placement="top" title="delete">
              <AiOutlineDelete
                className="hover:text-primary cursor-pointer"
                size={20}
              />
            </Tooltip>
          </Popconfirm>
        </div>
      </div>
    </div>
  );
};

export default BulkActionBox;
