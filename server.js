const express = require('express');
const cors = require('cors');
const { Pool } = require('pg'); //postgres


require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors({
  origin: '*'  //allowing all local origins
}));

app.use(express.json());

//postgres connection
const pool = new Pool({
  user: process.env.DB_USER,         // Fetch from .env
  host: process.env.DB_HOST,         // Fetch from .env
  database: process.env.DB_DATABASE, // Fetch from .env
  password: process.env.DB_PASSWORD, // Fetch from .env
  port: process.env.DB_PORT          // Fetch from .env
});

// Create a new user
app.post('/api/players', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO players (username, password) VALUES ($1, $2) RETURNING *',
      [username, password]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a user by username
app.get('/api/players/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM players WHERE username = $1',
      [username]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/character/:image_id', async (req, res) => {
  const { image_id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM characters_base WHERE image_id = $1',
      [image_id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Character not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/characters', async (req, res) => {
  try {
    const result = await pool.query('SELECT image_id FROM characters_base');
    res.json(result.rows.map(row => row.image_id));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});






app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

