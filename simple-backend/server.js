const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

const JWT_SECRET = 'super-secret-key-change-this-later';

let users = [];
let tasks = [];
let nextUserId = 1;
let nextTaskId = 1;

// Register
app.post('/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const role = users.length === 0 ? 'admin' : 'user';
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = { id: nextUserId++, name, email, password: hashedPassword, role };
  users.push(user);

  const token = jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
  res.json({ access_token: token });
});

// Login
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
  res.json({ access_token: token });
});

// Auth middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Tasks
app.get('/tasks', authenticate, (req, res) => {
  const tasksWithOwner = tasks.map(t => ({
    ...t,
    ownerName: users.find(u => u.id === t.ownerId)?.name || 'Unknown'
  }));
  res.json(tasksWithOwner);
});

app.post('/tasks', authenticate, (req, res) => {
  const { title } = req.body;
  const task = { id: nextTaskId++, title, ownerId: req.user.sub };
  tasks.push(task);
  res.json(task);
});

app.patch('/tasks/:id', authenticate, (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ message: 'Not found' });
  if (task.ownerId !== req.user.sub && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  Object.assign(task, req.body);
  res.json(task);
});

app.delete('/tasks/:id', authenticate, (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Not found' });
  const task = tasks[index];
  if (task.ownerId !== req.user.sub && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  tasks.splice(index, 1);
  res.json({ message: 'Deleted' });
});

// Users (admin only)
app.get('/users', authenticate, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
  res.json(users.map(u => ({ id: u.id, name: u.name, email: u.email, role: u.role })));
});

app.listen(3000, () => {
  console.log('SIMPLE BACKEND RUNNING ON http://localhost:3000');
  console.log('Register your first user to become ADMIN');
});