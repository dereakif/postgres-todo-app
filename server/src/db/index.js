const { Pool } = require("pg");
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
});
const createTable = () => {
  let sql = `CREATE TABLE IF NOT EXISTS  todos (
    todo_id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(255) NOT NULL,
    is_completed BOOL NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
 );`;
  pool.query(sql).then((result) => {
    console.log("Table created with result ->", result);
  });
};

createTable();
module.exports = {
  query: (text, params) => pool.query(text, params),
};
