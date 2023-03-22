import { Task } from "@/models";
import { Button, DatePicker, Form, Input, Select } from "antd";
import moment from "moment";
import React from "react";

type Props = {
  useDarkmode?: boolean;
  form: any;
  onFinish: (value: any) => void;
  onFinishFailed: (value: any) => void;
  preValue?: Task;
};

const TaskDetail = ({
  useDarkmode = true,
  form,
  onFinish,
  onFinishFailed,
  preValue = {},
}: Props) => {
  let dueDate;
  if (preValue.dueDate) {
    dueDate = moment(preValue.dueDate, "YYYY-MM-DD");
  } else {
    dueDate = moment().endOf("day");
  }
  return (
    <Form
      className={"p-4 rounded-b-lg " + (useDarkmode && "dark:bg-dark")}
      layout="vertical"
      initialValues={{ piority: 1, ...preValue, dueDate }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      form={form}
    >
      <Form.Item
        label={
          <span
            className={"font-semibold " + (useDarkmode && "dark:text-white")}
          >
            Task
          </span>
        }
        name="title"
        rules={[{ required: true, message: "Please input task name!" }]}
      >
        <Input placeholder="Add new task..." />
      </Form.Item>

      <Form.Item
        label={
          <span
            className={"font-semibold " + (useDarkmode && "dark:text-white")}
          >
            Description
          </span>
        }
        name="description"
      >
        <Input.TextArea />
      </Form.Item>

      <div className="grid grid-cols-2 gap-4">
        <Form.Item
          label={
            <span
              className={"font-semibold " + (useDarkmode && "dark:text-white")}
            >
              Due Date
            </span>
          }
          name="dueDate"
        >
          <DatePicker
            className="w-full"
            disabledDate={(current) => {
              let customDate = moment().format("YYYY-MM-DD");
              return current && current < moment(customDate, "YYYY-MM-DD");
            }}
          />
        </Form.Item>
        <Form.Item
          label={
            <span
              className={"font-semibold " + (useDarkmode && "dark:text-white")}
            >
              Piority
            </span>
          }
          name="piority"
        >
          <Select
            options={[
              { value: 0, label: "Low" },
              { value: 1, label: "Normal" },
              { value: 2, label: "Hight" },
            ]}
          />
        </Form.Item>
      </div>

      {preValue && preValue.title ? (
        <Form.Item className="">
          <Button className="w-full" type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      ) : (
        <Form.Item className="hidden lg:block">
          <Button className="w-full" type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};

export default TaskDetail;
