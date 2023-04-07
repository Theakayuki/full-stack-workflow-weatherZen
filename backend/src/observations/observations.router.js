const controller = require('./observations.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');
const router = require('express').Router();

router.route('/').get(controller.list).post(controller.create).all(methodNotAllowed);

router
  .route('/:observationId')
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete)
  .all(methodNotAllowed);

module.exports = router;
