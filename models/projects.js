const db = require('../data/db');
const actionDB = require('./actions');
const contextDB = require('./contexts');

module.exports = {
  get: async (id) => {
    let query = db('projects')

    if (id) query = query.where({ id });

    const projects = await query;

    for (const project of projects) {
      project.actions = await actionDB.getByProject(project);

      for (const action of project.actions) {
        action.contexts = await contextDB.getByAction(action);
      }
    }

    return projects;
  },
  add: (project) => db('projects').insert(project),
  update: (id, changes) => db('projects').where({ id }).update(changes),
  remove: (id) => db('projects').where({ id }).del()
}
