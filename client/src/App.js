import "./App.css";

import { Row, Col, Card, PageHeader, Layout } from "antd";
import { Content, Header } from "antd/lib/layout/layout";

const style = { padding: "10px" };

function App() {
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
            <Card title="Create a new todo">create todo</Card>
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
