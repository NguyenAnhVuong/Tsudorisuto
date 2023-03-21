import { getTasks } from "@/apollo-client/queries";
import { useQuery } from "@apollo/client";
import { Empty } from "antd";
import Loading from "./Loading";
import Task from "./Task";

type Props = {
  keyWord: string;
};

const ToDoList = ({ keyWord }: Props) => {
  const { loading, error, data } = useQuery(getTasks, {
    variables: { keyWord },
  });
  if (loading) return <Loading />;
  console.log("length: ", data.length);
  if (!data.searchTodo.length)
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  return (
    <div>
      {data &&
        data.searchTodo.map((task: any) => {
          return <Task key={task.id} task={task} keyWord={keyWord} />;
        })}
    </div>
  );
};

export default ToDoList;
