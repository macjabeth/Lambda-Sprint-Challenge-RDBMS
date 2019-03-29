const db = require('../data/db');
const contextDB = require('./contexts');

module.exports = {
  get: async (id) => {
    let query = db('actions')

    if (id) query = query.where({ id });

    const actions = await query;

    for (const action of actions) {
      action.contexts = await contextDB.getByAction(action);
    }

    return actions;
  },
  getByProject: (project) => db('actions')
    .where('project_id', project.id)
    .select('id', 'description', 'notes', 'completed'),
  add: (action) => db('actions').insert(action),
  update: (id, changes) => db('actions').where({ id }).update(changes),
  remove: (id) => db('actions').where({ id }).del()
}
