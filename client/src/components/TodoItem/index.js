import React from "react";
import { Tooltip, Tag, List, Button, Popconfirm } from "antd";
import { EditOutlined } from "@ant-design/icons";

export const TodoItem = ({ todo, onTodoRemoval }) => {
  return (
    <List.Item
      actions={[
        <Tooltip title={`Edit ${todo.title}`}>
          <Button>
            <EditOutlined />
          </Button>
        </Tooltip>,
        <Popconfirm
          title="Are you sure you want to delete this item?"
          onConfirm={() => {
            onTodoRemoval(todo.todo_id);
          }}
        >
          <Button type="primary" danger>
            X
          </Button>
        </Popconfirm>,
      ]}
      key={todo.todo_id}
    >
      <Tag color={todo.is_completed ? "cyan" : "red"}>{todo.title}</Tag>
    </List.Item>
  );
};
