const { Pool } = require('pg');

const PG_URI = process.env.PG_URI;

const pool = new Pool({
  connectionString: PG_URI,
  max: 20
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};
