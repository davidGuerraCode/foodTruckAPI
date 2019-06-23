const knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    database: 'foodTruck',
    password: ''
  }
});

module.exports = knex;
