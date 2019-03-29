const db = require('../data/db');

module.exports = {
  get: (id, action) => {
    let query = db('contexts as c');

    if (Boolean(id)) {
      query = !action
        ? query.where({ id })
        : query.join('action_context as ac', 'c.id', 'ac.context_id')
            .join('actions as a', 'a.id', 'ac.action_id')
            .where('a.id', id)
            .select('c.id', 'c.description');
    };

    return query;
  },
  add: (action) => db('contexts').insert(action),
  update: (id, changes) => db('contexts').where({ id }).update(changes),
  remove: (id) => db('contexts').where({ id }).del()
}
