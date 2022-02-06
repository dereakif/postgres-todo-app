import React from "react";
import { Tooltip, Tag, List, Button, Popconfirm, Popover } from "antd";
import { EditOutlined } from "@ant-design/icons";

export const TodoItem = ({ todo, onTodoRemoval, handleSelect }) => {
  return (
    <List.Item
      actions={[
        <Tooltip title={`Edit ${todo.title}`}>
          <Button onClick={() => handleSelect(todo.todo_id)}>
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
      <Popover
        placement="rightTop"
        content={todo.description}
        title={todo.title}
        trigger="hover"
      >
        <Tag color={todo.is_completed ? "cyan" : "red"}>{todo.title}</Tag>
      </Popover>
    </List.Item>
  );
};
