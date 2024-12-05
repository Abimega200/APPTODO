const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory database
let todos = [];

// Routes
// Get all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// Add a new todo
app.post('/todos', (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }
    const newTodo = { id: Date.now(), text, completed: false };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Update a todo
app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;

    const todo = todos.find((todo) => todo.id === parseInt(id));
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }

    todo.completed = completed;
    res.json(todo);
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;

    todos = todos.filter((todo) => todo.id !== parseInt(id));
    res.status(204).end();
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
