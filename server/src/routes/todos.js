const Router = require("express-promise-router");
const db = require("../db");

const router = new Router();

module.exports = router;

// Get all todos
router.get("/api/todos", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM todos");
    res.status(200).json({
      results: rows.length,
      data: {
        todos: rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Get a todo
router.get("/api/todos/:todo_id", async (req, res) => {
  try {
    const { todo_id } = req.params;
    console.log(todo_id);
    const { rows } = await db.query("SELECT * FROM todos WHERE todo_id = $1", [
      todo_id,
    ]);
    res.status(200).json({
      data: {
        todo: rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Create a todo
router.post("/api/todos", async (req, res) => {
  try {
    const { title, description, is_completed } = req.body;
    const date = new Date();
    const { rows } = await db.query(
      "INSERT INTO todos (title, description, is_completed, created_at, updated_at) values ($1, $2, $3, $4, $5) RETURNING *",
      [title, description, is_completed, date, date]
    );
    res.status(200).json({
      data: {
        todo: rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});
