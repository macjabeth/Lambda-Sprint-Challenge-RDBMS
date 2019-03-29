const Joi = require('joi');
const debug = require('debug')('server:db');
const router = require('express').Router();
const projectDB = require('../models/projects');

// Validation
const schema = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string().required(),
  completed: Joi.boolean()
});

// C - POST
router.post('/', async ({ body: newProject }, res) => {
  const { error } = Joi.validate(newProject, schema);
  if (error) return res.status(400).json({
    error: error.details[0].message
  });

  try {
    const [id] = await projectDB.add(newProject);
    const [project] = await projectDB.get(id);
    res.status(201).json(project);
  } catch (error) {
    debug(error); res.status(500).json({
      error: 'Something went wrong; the project could not be created.'
    });
  }
});

// R - GET
router.get('/', async (req, res) => {
  try {
    const projects = await projectDB.get();
    res.status(200).json(projects);
  } catch (error) {
    debug(error); res.status(500).json({
      error: 'Something went wrong; the projects could not be retrieved.'
    });
  }
});

router.get('/:id', async ({ params: { id } }, res) => {
  try {
    const [project] = await projectDB.get(id);
    Boolean(project)
      ? res.status(200).json(project)
      : res.status(404).json({ error: 'The specified project could not be found.' });
  } catch (error) {
    debug(error); res.status(500).json({
      error: 'Something went wrong; the project could not be retrieved.'
    });
  }
});

// U - PUT
router.put('/:id', async ({ params: { id }, body: changes }, res) => {
  const { error } = Joi.validate(changes, schema);
  if (error) return res.status(400).json({
    error: error.details[0].message
  });

  try {
    const count = await projectDB.update(id, changes);
    Boolean(count)
      ? res.status(200).json({ count })
      : res.status(404).json({ error: 'The specified project could not be found.' });
  } catch (error) {
    debug(error); res.status(404).json({
      error: 'Something went wrong; the project could not be modified.'
    });
  }
});

// D - DELETE
router.delete('/:id', async ({ params: { id } }, res) => {
  try {
    const count = await projectDB.remove(id);
    Boolean(count)
      ? res.status(204).end()
      : res.status(404).json({ error: 'The specified project could not be found.' });
  } catch (error) {
    debug(error); res.status(500).json({
      error: 'Something went wrong; the project could not be removed.'
    });
  }
});

module.exports = router;
