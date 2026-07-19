const express = require('express');
const data = require('./data');

const app = express();
app.use(express.json());

function getParts() {
  return Array.isArray(data.parts) ? data.parts : [];
}

app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'Vercel API is running' });
});

app.get('/api/data/parts', (req, res) => {
  res.json(getParts());
});

app.get('/api/data/parts/:id', (req, res) => {
  const parts = getParts();
  const part = parts.find((item) => item._id === req.params.id);
  res.json(part || {});
});

app.post('/api/data/parts', (req, res) => {
  const parts = getParts();
  const newPart = {
    ...req.body,
    _id: `part-${Date.now()}`,
    _createdOn: Date.now(),
    _updatedOn: Date.now()
  };
  parts.push(newPart);
  res.status(201).json(newPart);
});

app.put('/api/data/parts/:id', (req, res) => {
  const parts = getParts();
  const index = parts.findIndex((item) => item._id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Part not found' });
  }
  parts[index] = { ...parts[index], ...req.body, _updatedOn: Date.now() };
  res.json(parts[index]);
});

app.delete('/api/data/parts/:id', (req, res) => {
  const parts = getParts();
  const filtered = parts.filter((item) => item._id !== req.params.id);
  res.status(204).send();
});

app.get('/api/data/comments', (req, res) => {
  res.json(data.comments || []);
});

app.post('/api/data/comments', (req, res) => {
  const comments = data.comments || [];
  const newComment = {
    ...req.body,
    _id: `comment-${Date.now()}`,
    _createdOn: Date.now(),
    _updatedOn: Date.now()
  };
  comments.push(newComment);
  res.status(201).json(newComment);
});

app.delete('/api/data/comments/:id', (req, res) => {
  const comments = (data.comments || []).filter((item) => item._id !== req.params.id);
  res.status(204).send();
});

app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;
  const users = data.users || {};
  const userKey = Object.keys(users).find((key) => users[key].email === email);
  if (!userKey) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const user = users[userKey];
  res.json({
    _id: userKey,
    email: user.email,
    username: user.username,
    accessToken: 'vercel-demo-token'
  });
});

app.post('/api/users/register', (req, res) => {
  res.status(201).json({ message: 'Registration is not enabled in demo mode' });
});

app.post('/api/users/logout', (req, res) => {
  res.status(204).send();
});

app.post('/api/users/update', (req, res) => {
  res.json(req.body);
});

module.exports = app;
