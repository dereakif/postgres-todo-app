const Router = require("express-promise-router");
const db = require("../db");

const router = new Router();

module.exports = router;

// Get all todos
router.get("/api/todos", async (req, res, next) => {
  try {
    const { rows } = await db.query(
      "SELECT * FROM todos ORDER BY updated_at DESC"
    );
    res.status(200).json({
      todoCount: rows.length,
      todos: rows,
    });
  } catch (error) {
    next(error);
  }
});

// Get a todo
router.get("/api/todos/:todo_id", async (req, res, next) => {
  try {
    const { todo_id } = req.params;
    const { rows } = await db.query("SELECT * FROM todos WHERE todo_id = $1", [
      todo_id,
    ]);
    res.status(200).json({
      todo: rows[0],
    });
  } catch (error) {
    next(error);
  }
});

// Create a todo
router.post("/api/todos", async (req, res, next) => {
  try {
    const { title, description, is_completed } = req.body;
    const date = new Date();
    const { rows } = await db.query(
      "INSERT INTO todos (title, description, is_completed, created_at, updated_at) values ($1, $2, $3, $4, $5) RETURNING *",
      [title, description, is_completed, date, date]
    );
    res.status(201).json({
      todo: rows[0],
    });
  } catch (error) {
    next(error);
  }
});

// Update a todo
router.put("/api/todos/:todo_id", async (req, res, next) => {
  try {
    const { title, description, is_completed } = req.body;
    const { todo_id } = req.params;
    const date = new Date();
    const { rows } = await db.query(
      "UPDATE todos SET title = $1, description = $2, is_completed = $3, updated_at = $4 WHERE todo_id = $5 RETURNING *",
      [title, description, is_completed, date, todo_id]
    );
    res.status(200).json({
      todo: rows[0],
    });
  } catch (error) {
    next(error);
  }
});

// Delete a todo
router.delete("/api/todos/:todo_id", async (req, res, next) => {
  try {
    const { todo_id } = req.params;
    const { rows } = await db.query("DELETE FROM todos WHERE todo_id = $1", [
      todo_id,
    ]);
    res.status(204).json({
      todo_id,
    });
  } catch (error) {
    next(error);
  }
});
