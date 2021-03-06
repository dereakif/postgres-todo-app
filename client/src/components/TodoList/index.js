import { List } from "antd";
import React from "react";
import { TodoItem } from "../TodoItem";

function TodoList({ todos, loading, onTodoRemoval, handleSelect }) {
  return (
    <List
      locale={{
        emptyText: loading ? "Loading..." : "List is empty.",
      }}
      dataSource={todos}
      renderItem={(todo) => (
        <TodoItem
          todo={todo}
          onTodoRemoval={onTodoRemoval}
          handleSelect={handleSelect}
        />
      )}
      pagination={{
        position: "bottom",
        pageSize: 10,
      }}
    />
  );
}

export default TodoList;
