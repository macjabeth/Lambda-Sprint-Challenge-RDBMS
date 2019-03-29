const db = require('../data/db');

module.exports = {
  get: async (id) => {
    let query = db('actions')

    if (id) query = query.where({ id });

    const actions = await query;

    for (const action of actions) {
      action.contexts = await db({ c: 'contexts', ac: 'action_context', a: 'actions' })
        .where('a.id', 'ac.action_id').andWhere('c.id', 'ac.context_id')
        .select({ id: 'c.id', description: 'c.description' });
    }

    return actions;
  },
  add: (action) => db('actions').insert(action),
  update: (id, changes) => db('actions').where({ id }).update(changes),
  remove: (id) => db('actions').where({ id }).del()
}
