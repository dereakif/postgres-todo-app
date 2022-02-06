require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./src/routes/todos");

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
