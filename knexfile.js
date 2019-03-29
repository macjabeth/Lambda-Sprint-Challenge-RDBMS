module.exports = Object.assign({},
  require('config').get('knex'), {
  pool: { // *grumble*
    afterCreate: (conn, done) => {
      conn.run('PRAGMA foreign_keys = ON', done);
    }
  }
});
