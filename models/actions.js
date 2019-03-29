const db = require('../data/db');
const contextDB = require('./contexts');

module.exports = {
  get: async (id, project) => {
    let query = db('actions')

    if (Boolean(id)) {
      query = !project
        ? query.where({ id })
        : query.where('project_id', id)
            .select('id', 'description', 'notes', 'completed');
    }

    const actions = await query;

    for (const action of actions) {
      action.contexts = await contextDB.get(action.id, true);
    }

    return actions;
  },
  add: (action) => db('actions').insert(action),
  update: (id, changes) => db('actions').where({ id }).update(changes),
  remove: (id) => db('actions').where({ id }).del()
}
