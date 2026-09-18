const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Import Vercel API handlers for local server parity
const coursesHandler = require('./api/courses');
const messageHandler = require('./api/message');

app.get('/api/courses', (req, res) => coursesHandler(req, res));
app.post('/api/message', (req, res) => messageHandler(req, res));

// Serve static frontend files
app.use(express.static(__dirname));

// Serve index.html for root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`SkillBridge AI server running at http://localhost:${PORT}`);
});
