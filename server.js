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
  const { username, password, characterList, leaderImageId, baseImageId, shop1List, shop2List, shop3List, shop4List } = req.body;
  try {
    // Check if username exists
    const exists = await pool.query('SELECT 1 FROM players WHERE username = $1', [username]);
    if (exists.rows.length > 0) {
      return res.status(409).json({ error: 'Username already exists, please log in or choose another username' });
    }

    // Insert new user
    const result = await pool.query(
      `INSERT INTO players (username, password, arcane_track, bandit_track, ghoul_track, legion_track, pirate_track, bond, wisdom)
      VALUES ($1, $2, 1, 1, 1, 1, 1, 0, 0) RETURNING *`,
      [username, password]
    );

    // Sanitize table names
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

    // Insert all characters in characterList
    await pool.query(`
      INSERT INTO ${cardsTable} (name, type, heirloom_id, image_id, health_max, ability1_name, ability1_desc, ability1_cost, ability1_uses, ability2_name, ability2_desc, ability2_cost, ability2_uses, initial_protection)
      SELECT name, 'shop', heirloom_id, image_id, health_max, ability1_name, ability1_desc, ability1_cost, ability1_uses, ability2_name, ability2_desc, ability2_cost, ability2_uses, initial_protection
      FROM characters_base
      WHERE image_id = ANY($1)
    `, [characterList]);

    // update types to shops
    await pool.query(`
      UPDATE ${cardsTable}
      SET type = 'shop1'
      WHERE image_id = ANY($1)
    `, [shop1List]);

    await pool.query(`
      UPDATE ${cardsTable}
      SET type = 'shop2'
      WHERE image_id = ANY($1)
    `, [shop2List]);

    await pool.query(`
      UPDATE ${cardsTable}
      SET type = 'shop3'
      WHERE image_id = ANY($1)
    `, [shop3List]);

    await pool.query(`
      UPDATE ${cardsTable}
      SET type = 'shop4'
      WHERE image_id = ANY($1)
    `, [shop4List]);

    // Set type = 'leader' for leaderImageId
    await pool.query(`
      UPDATE ${cardsTable}
      SET type = 'leader'
      WHERE image_id = $1
    `, [leaderImageId]);

    // Set type = 'base' for baseImageId
    await pool.query(`
      UPDATE ${cardsTable}
      SET type = 'base'
      WHERE image_id = $1
    `, [baseImageId]);

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
    // Try characters_base first
    let result = await pool.query(
      'SELECT * FROM characters_base WHERE image_id = $1',
      [image_id]
    );
    if (result.rows.length > 0) {
      return res.json(result.rows[0]);
    }

    // If not found, try summons (for max health info)
    result = await pool.query(
      'SELECT * FROM summons WHERE image_id = $1',
      [image_id]
    );
    if (result.rows.length > 0) {
      return res.json(result.rows[0]);
    }

    // Not found in either table
    return res.status(404).json({ error: 'Character not found' });
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

app.get('/api/summons/helper', async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM summons WHERE type = 'helper'"
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No helper summons found' });
    }
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/summons/small-creature', async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM summons WHERE type = 'smallCreature'"
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No small creature summons found' });
    }
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/summons/large-creature', async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM summons WHERE type = 'largeCreature'"
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No large creature summons found' });
    }
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/enemy/ability1/:ability1_name', async (req, res) => {
  const { ability1_name } = req.params;
  try {
    const result = await pool.query(
      'SELECT ability1_ammount FROM enemy WHERE ability1_name = $1',
      [ability1_name]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No enemy found with that ability1_name' });
    }
    res.json({ ability1_ammount: result.rows[0].ability1_ammount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/enemy_leader/:location/ability/:number', async (req, res) => {
  const { location, number } = req.params;
  try {
    const result = await pool.query(
      `SELECT ability${number}_ammount FROM enemy_leader WHERE type = $1`,
      [location]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No enemy leader found for this location' });
    }
    res.json({ ammount: result.rows[0][`ability${number}_ammount`] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/players/:username/plusBond', async (req, res) => {
  const { username } = req.params;
  const { amount } = req.body; // amount to add to bond
  try {
    // Increment bond by the given amount
    const result = await pool.query(
      'UPDATE players SET bond = bond + $1 WHERE username = $2 RETURNING bond',
      [amount, username]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Player not found' });
    }
    res.json({ bond: result.rows[0].bond });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/players/:username/minusBond', async (req, res) => {
  const { username } = req.params;
  const { amount } = req.body; // amount to subtract from bond
  try {
    // Decrement bond by the given amount
    const result = await pool.query(
      'UPDATE players SET bond = bond - $1 WHERE username = $2 RETURNING bond',
      [amount, username]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Player not found' });
    }
    res.json({ bond: result.rows[0].bond });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/enemy_leader/:location', async (req, res) => {
  const { location } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM enemy_leader WHERE type = $1',
      [location]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No enemy leader found for this location' });
    }
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/enemy_leader/health/:image_id', async (req, res) => {
  const { image_id } = req.params;
  try {
    const result = await pool.query(
      'SELECT health_max FROM enemy_leader WHERE image_id = $1',
      [image_id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No enemy leader found with that image_id' });
    }
    res.json({ health_max: result.rows[0].health_max });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/players/:username/faction/all', async (req, res) => {
  const { username } = req.params;
  const { bandit, ghoul, arcane, legion, pirate } = req.body;
  try {
    const result = await pool.query(
      `UPDATE players SET 
        bandit_track = $1,
        ghoul_track = $2,
        arcane_track = $3,
        legion_track = $4,
        pirate_track = $5
      WHERE username = $6
      RETURNING bandit_track, ghoul_track, arcane_track, legion_track, pirate_track`,
      [bandit, ghoul, arcane, legion, pirate, username]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Player not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/:username/cards/shop/:shopNumber', async (req, res) => {
  const { username, shopNumber } = req.params;
  // Sanitize table name
  const safeUsername = username.replace(/[^a-zA-Z0-9_]/g, '');
  const cardsTable = `${safeUsername}_cards`;
  const shopType = `shop${shopNumber}`;
  try {
    const result = await pool.query(
      `SELECT * FROM ${cardsTable} WHERE type = $1`,
      [shopType]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/:username/cards/name/:cardName', async (req, res) => {
  const { username, cardName } = req.params;
  // Sanitize table name
  const safeUsername = username.replace(/[^a-zA-Z0-9_]/g, '');
  const cardsTable = `${safeUsername}_cards`;
  try {
    const result = await pool.query(
      `SELECT * FROM ${cardsTable} WHERE name = $1`,
      [cardName]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Card not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/:username/cards/update', async (req, res) => {
  const { username } = req.params;
  const {
    name, // the card's name (used to identify the row)
    protection, // 
    ability1_cost,
    ability2_name,
    ability2_desc,
    ability2_cost,
    ability2_uses
  } = req.body;

  // Sanitize table name
  const safeUsername = username.replace(/[^a-zA-Z0-9_]/g, '');
  const cardsTable = `${safeUsername}_cards`;

  try {
    const result = await pool.query(
      `UPDATE ${cardsTable}
       SET initial_protection = $1, ability1_cost = $2, ability2_name = $3, ability2_desc = $4, ability2_cost = $5, ability2_uses = $6
       WHERE name = $7
       RETURNING *`,
      [protection, ability1_cost, ability2_name, ability2_desc, ability2_cost, ability2_uses, name]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Card not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

