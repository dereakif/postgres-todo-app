require("dotenv").config();
const express = require("express");
const cors = require("cors");
const todoRoutes = require("./src/routes/todos");
const middlewares = require("./src/middlewares");

const app = express();

app.use(express.json());

app.use(cors());

app.use(todoRoutes);

app.use(middlewares.notFoundHandler);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
