import { useCallback, useEffect, useState } from "react";
import { Row, Col, Card, PageHeader, Layout, notification, Form } from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import TodoForm from "./components/TodoForm";
import Todos from "./apis/Todos";
import TodoList from "./components/TodoList";
import "./App.css";

const style = { padding: "10px" };

function App() {
  const [todoState, setTodoState] = useState({
    loading: false,
    data: [],
    error: "",
  });
  const [idToEdit, setIdToEdit] = useState(null);
  const [form] = Form.useForm();

  const setData = useCallback((newData) => {
    setTodoState((prev) => ({
      ...prev,
      data: newData,
    }));
  }, []);

  const setLoading = useCallback((loading) => {
    setTodoState((prev) => ({
      ...prev,
      loading,
    }));
  }, []);

  const setError = useCallback((errorMsg) => {
    setTodoState((prev) => ({
      ...prev,
      error: errorMsg,
    }));
  }, []);
  const addData = useCallback((newData) => {
    setTodoState((prev) => ({
      ...prev,
      data: [newData, ...prev.data],
    }));
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    await Todos.get("/")
      .then((res) => {
        const { data } = res;
        if (data.todoCount > 0) {
          setData(data.todos);
        }
      })
      .catch((error) => {
        setError(error.message);
        openNotification(
          error.response?.statusText || "Error",
          error.message || "Some error occurred"
        );
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const onTodoRemoval = async (todo_id) => {
    setLoading(true);
    Todos.delete(`/${todo_id}`)
      .then((res) => {
        const { status } = res;
        if (status === 204) {
          let newList = todoState.data.filter(
            (item) => item.todo_id !== todo_id
          );
          setData(newList);
          openNotification(
            "Success",
            `Todo successfully deleted from the list.`
          );
        }
      })
      .catch((error) => {
        setError(error.message);
        openNotification(
          error.response?.statusText || "Error",
          error.message || "Some error occurred"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEdit = async (values) => {
    setLoading(true);
    await Todos.put(`/${idToEdit}`, values)
      .then((res) => {
        const { data } = res;
        if (data.todo.todo_id) {
          const todoIndex = todoState.data.findIndex(
            (item) => item.todo_id === idToEdit
          );
          const newList = [...todoState.data];
          newList[todoIndex] = data.todo;
          setData(newList);
          openNotification(
            "Success",
            `"${data.todo.title}" successfully updated.`
          );
        }
      })
      .catch((error) => {
        setError(error.message);
        openNotification(error.response.statusText, error.message);
      })
      .finally(() => {
        setIdToEdit(null);
        setLoading(false);
      });
  };

  const handleFormSubmit = async (values) => {
    setLoading(true);
    await Todos.post("/", values)
      .then((res) => {
        const { data } = res;
        if (data.todo.todo_id) {
          addData(data.todo);
          openNotification(
            "Success",
            `"${data.todo.title}" successfully added to the list.`
          );
        }
      })
      .catch((error) => {
        setError(error.message);
        openNotification(error.response.statusText, error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSelect = (todo_id) => {
    const selectedTodo = todoState.data.find(
      (item) => item.todo_id === todo_id
    );
    setIdToEdit(todo_id);
    form.setFieldsValue(selectedTodo);
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
              <TodoForm
                form={form}
                idToEdit={idToEdit}
                setIdToEdit={setIdToEdit}
                handleFormSubmit={handleFormSubmit}
                handleEdit={handleEdit}
              />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col style={style} span={24}>
            <Card title="Todo List">
              <TodoList
                todos={todoState.data}
                loading={todoState.loading}
                onTodoRemoval={onTodoRemoval}
                handleSelect={handleSelect}
              />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default App;
