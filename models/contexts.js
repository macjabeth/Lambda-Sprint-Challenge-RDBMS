const db = require('../data/db');

module.exports = {
  get: (id) => {
    let query = db('contexts');
    if (id) query = query.where({ id });
    return query;
  },
  getByAction: (action) => db('contexts as c')
    .join('action_context as ac', 'c.id', 'ac.context_id')
    .join('actions as a', 'a.id', 'ac.action_id')
    .where('a.id', action.id)
    .select({ id: 'c.id', description: 'c.description' }),
  add: (action) => db('contexts').insert(action),
  update: (id, changes) => db('contexts').where({ id }).update(changes),
  remove: (id) => db('contexts').where({ id }).del()
}
