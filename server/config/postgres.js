const { Pool } = require('pg');

module.exports = (app) => {

  return new Pool({
    user: app.get('PG_USER'),
    database: app.get('PG_DB'),
    password: app.get('PG_PASSWORD'),
    host: app.get('PG_HOST'),
    connectionTimeoutMillis: 30000,
    idleTimeoutMillis: 20000,
  });
};

