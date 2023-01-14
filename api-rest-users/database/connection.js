var secrets = require('./secrets');

var knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      user : secrets.user,
      password : secrets.password,
      database : 'apiusers'
    }
  });

module.exports = knex