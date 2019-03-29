const Joi = require('joi');
const debug = require('debug')('server:db');
const router = require('express').Router();
const actionDB = require('../models/actions');

// Validation
const schema = Joi.object().keys({
  name: Joi.string().required(),
  project_id: Joi.number().integer().required(),
  description: Joi.string().required(),
  notes: Joi.string(),
  completed: Joi.boolean()
});

// C - POST
router.post('/', async ({ body: newAction }, res) => {
  const { error } = Joi.validate(newAction, schema);
  if (error) return res.status(400).json({
    error: error.details[0].message
  });

  try {
    const [id] = await actionDB.add(newAction);
    const [action] = await actionDB.get(id);
    res.status(201).json(action);
  } catch (error) {
    debug(error); res.status(500).json({
      error: 'Something went wrong; the action could not be created.'
    });
  }
});

// R - GET
router.get('/', async (req, res) => {
  try {
    const actions = await actionDB.get();
    res.status(200).json(actions);
  } catch (error) {
    debug(error); res.status(500).json({
      error: 'Something went wrong; the actions could not be retrieved.'
    });
  }
});

router.get('/:id', async ({ params: { id } }, res) => {
  try {
    const [action] = await actionDB.get(id);
    Boolean(action)
      ? res.status(200).json(action)
      : res.status(404).json({ error: 'The specified action could not be found.' });
  } catch (error) {
    debug(error); res.status(500).json({
      error: 'Something went wrong; the action could not be retrieved.'
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
    const count = await actionDB.update(id, changes);
    Boolean(count)
      ? res.status(200).json({ count })
      : res.status(404).json({ error: 'The specified action could not be found.' });
  } catch (error) {
    debug(error); res.status(404).json({
      error: 'Something went wrong; the action could not be modified.'
    });
  }
});

// D - DELETE
router.delete('/:id', async ({ params: { id } }, res) => {
  try {
    const count = await actionDB.remove(id);
    Boolean(count)
      ? res.status(204).end()
      : res.status(404).json({ error: 'The specified action could not be found.' });
  } catch (error) {
    debug(error); res.status(500).json({
      error: 'Something went wrong; the action could not be removed.'
    });
  }
});

module.exports = router;
