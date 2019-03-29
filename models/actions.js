const db = require('../data/db');

module.exports = {
  get: (id) => {
    let query = db('actions');
    if (id) query = query.where({ id });
    return query;
  },
  add: (action) => db('actions').insert(action),
  update: (id, changes) => db('actions').where({ id }).update(changes),
  remove: (id) => db('actions').where({ id }).del()
}
