import { DataSource } from "typeorm";
import express from 'express';
import cors from 'cors';
import pkg from 'pg';
const { Pool, Client } = pkg;
import path from 'node:path';
import dotenv from 'dotenv';
dotenv.config();
import { fileURLToPath } from 'url';
import { dirname } from 'path';

//Jay testing deployment1
console.log('Jay testing deployment1');
console.log(process.env.DB_HOST);


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 443;
const host = process.env.HOST || '0.0.0.0';
app.listen(port, host);

app.use(express.static(__dirname));

app.use(cors({
  origin: '*'  //allowing all local origins
}));

app.use(express.json());

export const AppDataSource = new DataSource({
  type: "postgres", 
  url: process.env.DATABASE_URL,
  logging: false,
  // entities: [Student],
  ssl: { rejectUnauthorized: false },
  migrations: [],
  subscribers: []

});

let sslConfig = false;
if (process.env.DB_SSL === 'true') {
  sslConfig = { rejectUnauthorized: false };
}

const client = new Client({
  user: process.env.DB_USER,         // Fetch from .env
  host: process.env.DB_HOST,         // Fetch from .env
  database: process.env.DB_DATABASE, // Fetch from .env
  password: process.env.DB_PASSWORD, // Fetch from .env
  port: process.env.DB_PORT,         // Fetch from .env
  ssl: sslConfig // Enable SSL
  // ssl: false
});

client.connect((err) => {
  if (err) {
    console.error('Error connecting to PostgreSQL:', err);
  } else {
    console.log('Connected to PostgreSQL with SSL.');
    // Perform database operations
    // client.end();
  }
});

// local postgres connection
// const pool = new Pool({
//   user: process.env.DB_USER,         // Fetch from .env
//   host: process.env.DB_HOST,         // Fetch from .env
//   database: process.env.DB_DATABASE, // Fetch from .env
//   password: process.env.DB_PASSWORD, // Fetch from .env
//   port: process.env.DB_PORT          // Fetch from .env
// });

// Create a new user
app.post('/api/players', async (req, res) => {
  const { username, password, characterList, leaderImageId, baseImageId, shop1List, shop2List, shop3List, shop4List, bypassKey } = req.body;
  try {
    if (bypassKey === null) {
    // Check if username exists
        const exists = await client.query('SELECT 1 FROM players WHERE username = $1', [username]);
        if (exists.rows.length > 0) {
          return res.status(409).json({ error: 'Username already exists, please log in or choose another username' });
        }

        // Insert new user
        const result = await client.query(
          `INSERT INTO players (username, password, arcane_track, bandit_track, ghoul_track, legion_track, pirate_track, bond, wisdom, ghoul_bribed, legion_bribed, arcane_bribed, redbotLink, flaminglasersword, yellowbotlink, batterybelt, summonerlight, etherbow, righteouswings, potency, elvenmetronome, riverrock, stethoscope, techglasses, shieldoflight, mjolnirarmor, wolfwhistle, trenchcoat, bluebotlink, staffofjustice)
          VALUES ($1, $2, 1, 1, 1, 1, 1, 0, 0, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false) RETURNING *`,
          [username, password]
        );

        // Sanitize table names
        const safeUsername = username.replace(/[^a-zA-Z0-9_]/g, '');
        const cardsTable = `${safeUsername}_cards`;

        // Create cards table
        await client.query(`
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
        await client.query(`
          INSERT INTO ${cardsTable} (name, type, heirloom_id, image_id, health_max, ability1_name, ability1_desc, ability1_cost, ability1_uses, ability2_name, ability2_desc, ability2_cost, ability2_uses, initial_protection)
          SELECT name, 'shop', heirloom_id, image_id, health_max, ability1_name, ability1_desc, ability1_cost, ability1_uses, ability2_name, ability2_desc, ability2_cost, ability2_uses, initial_protection
          FROM characters_base
          WHERE image_id = ANY($1)
        `, [characterList]);

        // update types to shops
        await client.query(`
          UPDATE ${cardsTable}
          SET type = 'shop1'
          WHERE image_id = ANY($1)
        `, [shop1List]);

        await client.query(`
          UPDATE ${cardsTable}
          SET type = 'shop2'
          WHERE image_id = ANY($1)
        `, [shop2List]);

        await client.query(`
          UPDATE ${cardsTable}
          SET type = 'shop3'
          WHERE image_id = ANY($1)
        `, [shop3List]);

        await client.query(`
          UPDATE ${cardsTable}
          SET type = 'shop4'
          WHERE image_id = ANY($1)
        `, [shop4List]);

        // Set type = 'leader' for leaderImageId
        await client.query(`
          UPDATE ${cardsTable}
          SET type = 'leader'
          WHERE image_id = $1
        `, [leaderImageId]);

        // Set type = 'base' for baseImageId
        await client.query(`
          UPDATE ${cardsTable}
          SET type = 'base'
          WHERE image_id = $1
        `, [baseImageId]);
    } else if (bypassKey === true) {
      // Insert new user without checking for existing username
      // Sanitize table names
        const safeUsername = username.replace(/[^a-zA-Z0-9_]/g, '');
        const cardsTable = `${safeUsername}_cards`;

        // Create cards table
        await client.query(`
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
        await client.query(`
          INSERT INTO ${cardsTable} (name, type, heirloom_id, image_id, health_max, ability1_name, ability1_desc, ability1_cost, ability1_uses, ability2_name, ability2_desc, ability2_cost, ability2_uses, initial_protection)
          SELECT name, 'shop', heirloom_id, image_id, health_max, ability1_name, ability1_desc, ability1_cost, ability1_uses, ability2_name, ability2_desc, ability2_cost, ability2_uses, initial_protection
          FROM characters_base
          WHERE image_id = ANY($1)
        `, [characterList]);

        // update types to shops
        await client.query(`
          UPDATE ${cardsTable}
          SET type = 'shop1'
          WHERE image_id = ANY($1)
        `, [shop1List]);

        await client.query(`
          UPDATE ${cardsTable}
          SET type = 'shop2'
          WHERE image_id = ANY($1)
        `, [shop2List]);

        await client.query(`
          UPDATE ${cardsTable}
          SET type = 'shop3'
          WHERE image_id = ANY($1)
        `, [shop3List]);

        await client.query(`
          UPDATE ${cardsTable}
          SET type = 'shop4'
          WHERE image_id = ANY($1)
        `, [shop4List]);

        // Set type = 'leader' for leaderImageId
        await client.query(`
          UPDATE ${cardsTable}
          SET type = 'leader'
          WHERE image_id = $1
        `, [leaderImageId]);

        // Set type = 'base' for baseImageId
        await client.query(`
          UPDATE ${cardsTable}
          SET type = 'base'
          WHERE image_id = $1
        `, [baseImageId]);
    }
    

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a user by username
app.get('/api/players/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const result = await client.query(
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
    let result = await client.query(
      'SELECT * FROM characters_base WHERE image_id = $1',
      [image_id]
    );
    if (result.rows.length > 0) {
      return res.json(result.rows[0]);
    }

    // If not found, try summons (for max health info)
    result = await client.query(
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
    //Jay testing deployment
    console.log('Jay testing deployment');
    const result = await client.query('SELECT image_id FROM characters_base');
    res.json(result.rows.map(row => row.image_id));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/enemies/type/:type', async (req, res) => {
  const { type } = req.params;
  try {
    const result = await client.query(
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
    const result = await client.query(
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
  let { username } = req.params;
  // Sanitize username
  username = String(username || '').replace(/[^a-zA-Z0-9_]/g, '');
  const cardsTable = `${username}_cards`;
  try {
    const result = await client.query(
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
  let { username } = req.params;
  // Sanitize username
  username = String(username || '').replace(/[^a-zA-Z0-9_]/g, '');
  const cardsTable = `${username}_cards`;
  try {
    const result = await client.query(
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
    const result = await client.query(
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
    const result = await client.query(
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

app.get('/api/summons/strong-canine', async (req, res) => {
  try {
    const result = await client.query(
      "SELECT * FROM summons WHERE type = 'canineStrong'"
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No strong canine summons found' });
    }
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/summons/helper', async (req, res) => {
  try {
    const result = await client.query(
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
    const result = await client.query(
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
    const result = await client.query(
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
    const result = await client.query(
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
    const result = await client.query(
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
    const result = await client.query(
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
    const result = await client.query(
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
    const result = await client.query(
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
    const result = await client.query(
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
    const result = await client.query(
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
  let { username, shopNumber } = req.params;
  // Sanitize username
  username = String(username || '').replace(/[^a-zA-Z0-9_]/g, '');
  const cardsTable = `${username}_cards`;
  const shopType = `shop${shopNumber}`;
  try {
    const result = await client.query(
      `SELECT * FROM ${cardsTable} WHERE type = $1`,
      [shopType]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/:username/cards/name/:cardName', async (req, res) => {
  let { username, cardName } = req.params;
  // Sanitize username
  username = String(username || '').replace(/[^a-zA-Z0-9_]/g, '');
  const cardsTable = `${username}_cards`;
  try {
    const result = await client.query(
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
  let { username } = req.params;
  const {
    name, // the card's name (used to identify the row)
    protection, // 
    ability1_cost,
    ability2_name,
    ability2_desc,
    ability2_cost,
    ability2_uses
  } = req.body;

  // Sanitize username
  username = String(username || '').replace(/[^a-zA-Z0-9_]/g, '');
  const cardsTable = `${username}_cards`;

  try {
    const result = await client.query(
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

app.get('/api/:username/cards/image/:imageId', async (req, res) => {
  let { username, imageId } = req.params;
  // Sanitize username
  username = String(username || '').replace(/[^a-zA-Z0-9_]/g, '');
  const cardsTable = `${username}_cards`;
  try {
    const result = await client.query(
      `SELECT * FROM ${cardsTable} WHERE image_id = $1`,
      [imageId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Card not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/:username/cards/setBase', async (req, res) => {
  let { username } = req.params;
  const { image_id } = req.body;

  // Sanitize username
  username = String(username || '').replace(/[^a-zA-Z0-9_]/g, '');
  const cardsTable = `${username}_cards`;

  try {
    const result = await client.query(
      `UPDATE ${cardsTable} SET type = 'base' WHERE image_id = $1 RETURNING *`,
      [image_id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Card not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/players/:username/bribedTraders', async (req, res) => {
  const { username } = req.params;
  const { ghoulTraderBribed, legionTraderBribed, arcaneTraderBribed } = req.body;

  try {
    const result = await client.query(
      `UPDATE players
       SET ghoul_bribed = $1,
           legion_bribed = $2,
           arcane_bribed = $3
       WHERE username = $4
       RETURNING *`,
      [ghoulTraderBribed, legionTraderBribed, arcaneTraderBribed, username]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/players/:username/bribedTraders', async (req, res) => {
  const { username } = req.params;
  try {
    const result = await client.query(
      `SELECT ghoul_bribed, legion_bribed, arcane_bribed FROM players WHERE username = $1`,
      [username]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Player not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/players/:username/trueColumns', async (req, res) => {
  const { username } = req.params;
  // List the columns you want to check
  const columnsToCheck = ['redbotlink', 'flaminglasersword', 'yellowbotlink', 'batterybelt', 'summonerlight', 'etherbow', 'righteouswings', 'potency', 'elvenmetronome', 'riverrock', 'stethoscope', 'techglasses', 'shieldoflight', 'mjolnirarmor', 'wolfwhistle', 'trenchcoat', 'bluebotlink', 'staffofjustice']; 

  try {
    const result = await client.query(
      `SELECT ${columnsToCheck.join(', ')} FROM players WHERE username = $1`,
      [username]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Player not found' });
    }
    const row = result.rows[0];
    // Collect column names where value is true
    const trueColumns = [];
    for (const col of columnsToCheck) {
      if (row[col] === true || row[col] === 'true' || row[col] === 1) {
        trueColumns.push(col);
      }
    }
    res.json({ trueColumns });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/:username/cards/baseOrLeader', async (req, res) => {
  let { username } = req.params;
  // Sanitize username
  username = String(username || '').replace(/[^a-zA-Z0-9_]/g, '');
  const cardsTable = `${username}_cards`;
  try {
    const result = await client.query(
      `SELECT * FROM ${cardsTable} WHERE type = 'base' OR type = 'leader'`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/:username/cards/updateAbility1ByHeirloom', async (req, res) => {
  let { username } = req.params;
  const { heirloom_id, ability1_name, ability1_desc } = req.body;

  // Sanitize username
  username = String(username || '').replace(/[^a-zA-Z0-9_]/g, '');
  const cardsTable = `${username}_cards`;

  try {
    const result = await client.query(
      `UPDATE ${cardsTable}
       SET ability1_name = $1, ability1_desc = $2
       WHERE heirloom_id = $3
       RETURNING *`,
      [ability1_name, ability1_desc, heirloom_id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Card not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/players/:username/forge/:heirloomKey', async (req, res) => {
  const { username, heirloomKey } = req.params;

  try {
    const result = await client.query(
      `UPDATE players
       SET ${heirloomKey} = true,
           arcane_track = 1,
           bandit_track = 1,
           ghoul_track = 1,
           legion_track = 1,
           pirate_track = 1,
           bond = 0,
           arcane_bribed = false,
           ghoul_bribed = false,
           legion_bribed = false
       WHERE username = $1
       RETURNING *`,
      [username]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Player not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/:username/cards/deleteTable', async (req, res) => {
  let { username } = req.params;
  // Sanitize username
  username = String(username || '').replace(/[^a-zA-Z0-9_]/g, '');
  const cardsTable = `${username}_cards`;

  try {
    await client.query(`DROP TABLE IF EXISTS ${cardsTable}`);
    res.json({ message: `Table ${cardsTable} deleted.` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

