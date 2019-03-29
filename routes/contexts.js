const Joi = require('joi');
const debug = require('debug')('server:db');
const router = require('express').Router();
const contextDB = require('../models/contexts');

// Validation
const schema = Joi.object().keys({
  description: Joi.string().required()
});

// C - POST
router.post('/', async ({ body: newContext }, res) => {
  const { error } = Joi.validate(newContext, schema);
  if (error) return res.status(400).json({
    error: error.details[0].message
  });

  try {
    const [id] = await contextDB.add(newContext);
    const [context] = await contextDB.get(id);
    res.status(201).json(context);
  } catch (error) {
    debug(error); res.status(500).json({
      error: 'Something went wrong; the context could not be created.'
    });
  }
});

// R - GET
router.get('/', async (req, res) => {
  try {
    const contexts = await contextDB.get();
    res.status(200).json(contexts);
  } catch (error) {
    debug(error); res.status(500).json({
      error: 'Something went wrong; the contexts could not be retrieved.'
    });
  }
});

router.get('/:id', async ({ params: { id } }, res) => {
  try {
    const [context] = await contextDB.get(id);
    Boolean(context)
      ? res.status(200).json(context)
      : res.status(404).json({ error: 'The specified context could not be found.' });
  } catch (error) {
    debug(error); res.status(500).json({
      error: 'Something went wrong; the context could not be retrieved.'
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
    const count = await contextDB.update(id, changes);
    Boolean(count)
      ? res.status(200).json({ count })
      : res.status(404).json({ error: 'The specified context could not be found.' });
  } catch (error) {
    debug(error); res.status(404).json({
      error: 'Something went wrong; the context could not be modified.'
    });
  }
});

// D - DELETE
router.delete('/:id', async ({ params: { id } }, res) => {
  try {
    const count = await contextDB.remove(id);
    Boolean(count)
      ? res.status(204).end()
      : res.status(404).json({ error: 'The specified context could not be found.' });
  } catch (error) {
    debug(error); res.status(500).json({
      error: 'Something went wrong; the context could not be removed.'
    });
  }
});

module.exports = router;
