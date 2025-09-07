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
  const { username, password, leader_image_id, base_image_id } = req.body;
  try {
    // Check if username exists
    const exists = await pool.query('SELECT 1 FROM players WHERE username = $1', [username]);
    if (exists.rows.length > 0) {
      return res.status(409).json({ error: 'Username already exists, please log in or choose another username' });
    }
    // Insert new user
    const result = await pool.query(
    `INSERT INTO players (username, password, arcane_track, bandit_track, ghoul_track, legion_track, pirate_track, bond, wisdom)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
    [username, password, 0, 0, 0, 0, 0, 0, 0]
    );
    // Sanitize table names (only allow alphanumeric and underscore)
    const safeUsername = username.replace(/[^a-zA-Z0-9_]/g, '');
    const cardsTable = `${safeUsername}_cards`;


    // Create cards table
     await pool.query(`
      CREATE TABLE IF NOT EXISTS ${cardsTable} (
        name VARCHAR(30),
        type VARCHAR(30),
        heirloom_id VARCHAR(30),
        image_id VARCHAR(30),
        health_max INT,
        ability1_name VARCHAR(30),
        ability1_desc VARCHAR(100),
        ability1_cost INT,
        ability1_uses INT,
        ability2_name VARCHAR(30),
        ability2_desc VARCHAR(100),
        ability2_cost INT,
        ability2_uses INT,
        initial_protection INT
      )
    `);

    // Copy leader row
    await pool.query(`
      INSERT INTO ${cardsTable} (name, type, heirloom_id, image_id, health_max, ability1_name, ability1_desc, ability1_cost, ability1_uses, ability2_name, ability2_desc, ability2_cost, ability2_uses, initial_protection)
      SELECT name, type, heirloom_id, image_id, health_max, ability1_name, ability1_desc, ability1_cost, ability1_uses, ability2_name, ability2_desc, ability2_cost, ability2_uses, initial_protection
      FROM characters_leader WHERE image_id = $1
    `, [leader_image_id]);

    // Copy base row
    await pool.query(`
      INSERT INTO ${cardsTable} (name, type, heirloom_id, image_id, health_max, ability1_name, ability1_desc, ability1_cost, ability1_uses, ability2_name, ability2_desc, ability2_cost, ability2_uses, initial_protection)
      SELECT name, type, heirloom_id, image_id, health_max, ability1_name, ability1_desc, ability1_cost, ability1_uses, ability2_name, ability2_desc, ability2_cost, ability2_uses, initial_protection
      FROM characters_base WHERE image_id = $1
    `, [base_image_id]);

    // Update type column for leader card
    await pool.query(`
      UPDATE ${cardsTable}
      SET type = 'leader'
      WHERE image_id = $1
    `, [leader_image_id]);

    // Update type column for base card
    await pool.query(`
      UPDATE ${cardsTable}
      SET type = 'base'
      WHERE image_id = $1
    `, [base_image_id]);


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

app.get('/api/enemies/type/:type', async (req, res) => {
  const { type } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM enemy WHERE type = $1',
      [type]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No enemies found for this type' });
    }
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/leader/:image_id', async (req, res) => {
  const { image_id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM characters_leader WHERE image_id = $1',
      [image_id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Leader not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/:username/cards/leader', async (req, res) => {
  const { username } = req.params;
  const safeUsername = username.replace(/[^a-zA-Z0-9_]/g, '');
  const cardsTable = `${safeUsername}_cards`;
  try {
    const result = await pool.query(
      `SELECT * FROM ${cardsTable} WHERE type = 'leader' LIMIT 1`
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Leader card not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/:username/cards/base', async (req, res) => {
  const { username } = req.params;
  const safeUsername = username.replace(/[^a-zA-Z0-9_]/g, '');
  const cardsTable = `${safeUsername}_cards`;
  try {
    const result = await pool.query(
      `SELECT * FROM ${cardsTable} WHERE type = 'base'`
    );
    res.json(result.rows); // returns an array of base cards
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/enemy/:image_id', async (req, res) => {
  const { image_id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM enemy WHERE image_id = $1',
      [image_id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Enemy not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/summons/canine', async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM summons WHERE type = 'canine'"
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No canine summons found' });
    }
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

