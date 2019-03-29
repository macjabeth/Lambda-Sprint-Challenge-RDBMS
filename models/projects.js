const db = require('../data/db');

module.exports = {
  get: async (id) => {
    let query = db('projects')

    if (id) query = query.where({ id });

    const projects = await query;

    for (const project of projects) {
      project.actions = await db('actions')
        .where('project_id', project.id)
        .select('id', 'description', 'notes', 'completed');
    }

    return query;
  },
  add: (project) => db('projects').insert(project),
  update: (id, changes) => db('projects').where({ id }).update(changes),
  remove: (id) => db('projects').where({ id }).del()
}
