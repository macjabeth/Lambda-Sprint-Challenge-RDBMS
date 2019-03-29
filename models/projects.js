const db = require('../data/db');
const actionDB = require('./actions');

module.exports = {
  get: async (id) => {
    let query = db('projects')

    if (id) query = query.where({ id });

    const projects = await query;

    for (const project of projects) {
      project.actions = await actionDB.get(project.id, true);
    }

    return projects;
  },
  add: (project) => db('projects').insert(project),
  update: (id, changes) => db('projects').where({ id }).update(changes),
  remove: (id) => db('projects').where({ id }).del()
}
