const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

const PORT = 3000;
const DB_FILE = 'db.json';

// Utility function to read the database file
const readDB = () => {
  const data = fs.readFileSync(DB_FILE, 'utf-8');
  return JSON.parse(data);
};

// Utility function to write to the database file
const writeDB = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// API to get all todos
app.get('/todos', (req, res) => {
  const db = readDB();
  res.json(db.todos);
});

// API to add a new todo
app.post('/todos', (req, res) => {
  const newTodo = req.body;
  const db = readDB();
  newTodo.id = db.todos.length ? db.todos[db.todos.length - 1].id + 1 : 1;
  db.todos.push(newTodo);
  writeDB(db);
  res.status(201).json(newTodo);
});

// API to update the status of todos with even IDs from false to true
app.patch('/todos/even-status', (req, res) => {
  const db = readDB();
  db.todos.forEach(todo => {
    if (todo.id % 2 === 0 && todo.status === false) {
      todo.status = true;
    }
  });
  writeDB(db);
  res.json(db.todos);
});

// API to delete all todos with status true
app.delete('/todos/completed', (req, res) => {
  const db = readDB();
  db.todos = db.todos.filter(todo => todo.status === false);
  writeDB(db);
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
