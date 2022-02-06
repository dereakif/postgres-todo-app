import "./App.css";

import { Row, Col, Card, PageHeader, Layout, notification } from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import TodoForm from "./components/TodoForm";
import Todos from "./apis/Todos";
import { useState } from "react";

const style = { padding: "10px" };

function App() {
  const [todoState, setTodoState] = useState({
    loading: false,
    data: [],
    error: "",
  });

  const handleFormSubmit = async (values) => {
    setTodoState((prev) => ({ ...prev, loading: true }));
    await Todos.post("/", values)
      .then((res) => {
        const { data } = res;
        if (data.todo.todo_id) {
          setTodoState((prev) => ({
            ...prev,
            data: [...prev.data, data.todo],
          }));
          openNotification(
            "Success",
            `"${data.todo.title}" successfully added to the list.`
          );
        }
      })
      .catch((error) => {
        setTodoState((prev) => ({ ...prev, error: error.message }));
        openNotification(error.response.statusText, error.message);
      })
      .finally(() => {
        setTodoState((prev) => ({ ...prev, loading: false }));
      });
  };

  const openNotification = (title, description) => {
    notification.open({
      message: title,
      description,
    });
  };

  return (
    <Layout>
      <Header>
        <PageHeader
          className="page-header"
          title="Todo App"
          subTitle="Be more productive"
        />
      </Header>
      <Content>
        <Row>
          <Col style={style} span={24}>
            <Card title="Create a new todo">
              <TodoForm handleFormSubmit={handleFormSubmit} />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col style={style} span={24}>
            <Card title="Todo List">todo list</Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default App;
