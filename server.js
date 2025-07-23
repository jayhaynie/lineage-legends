const express = require('express');
const cors = require('cors');
const { Pool } = require('pg'); //postgres


require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors({
  origin: '*'  //allowing all local origins
}));

//postgres connection
const pool = new Pool({
  user: process.env.DB_USER,         // Fetch from .env
  host: process.env.DB_HOST,         // Fetch from .env
  database: process.env.DB_DATABASE, // Fetch from .env
  password: process.env.DB_PASSWORD, // Fetch from .env
  port: process.env.DB_PORT          // Fetch from .env
});