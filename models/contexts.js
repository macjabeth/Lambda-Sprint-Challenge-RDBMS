const db = require('../data/db');

module.exports = {
  get: (id) => {
    let query = db('contexts');
    if (id) query = query.where({ id });
    return query;
  },
  add: (action) => db('contexts').insert(action),
  update: (id, changes) => db('contexts').where({ id }).update(changes),
  remove: (id) => db('contexts').where({ id }).del()
}
