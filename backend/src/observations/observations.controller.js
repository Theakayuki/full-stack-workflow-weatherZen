const service = require('./observations.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const validSkyConditions = [100, 101, 102, 103, 104, 105, 106, 107, 108, 109];

function hasData(req, res, next) {
  if (req.body.data) return next();
  next({
    status: 400,
    message: 'body must have a data property',
  });
}

function hasLatitude(req, res, next) {
  const { latitude } = req.body.data;
  if (latitude >= -90 && latitude <= 90) return next();
  next({
    status: 400,
    message: 'latitude must be between -90 and 90',
  });
}

function hasLongitude(req, res, next) {
  const { longitude } = req.body.data;
  if (longitude >= -180 && longitude <= 180) return next();
  next({
    status: 400,
    message: 'longitude must be between -180 and 180',
  });
}

function hasSkyCondition(req, res, next) {
  const { sky_condition } = req.body.data;

  if (validSkyConditions.includes(+sky_condition)) {
    return next();
  }
  next({
    status: 400,
    message: `sky_condition must be one of ${validSkyConditions.join(', ')}`,
  });
}

function hasObservationId(req, res, next) {
  const { observationId } = req.params;
  if (observationId) return next();
  next({
    status: 400,
    message: 'observationId must be provided',
  });
}

async function observationExists(req, res, next) {
  const { observationId } = req.params;
  const observation = await service.read(observationId);
  if (observation) {
    res.locals.observation = observation;
    return next();
  }
  next({
    status: 404,
    message: `Observation id not found: ${observationId}`,
  });
}

async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}

async function create(req, res) {
  const newObservation = await service.create(req.body.data);

  res.status(201).json({ data: newObservation });
}

async function read(req, res) {
  const { observation } = res.locals;
  res.json({ data: observation });
}

async function update(req, res) {
  const updatedObservation = {
    ...req.body.data,
  };
  const data = await service.update(updatedObservation);
  res.json({ data });
}

async function destroy(req, res) {
  const { observationId } = req.params;
  await service.delete(observationId);
  res.sendStatus(204);
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [hasData, hasLatitude, hasLongitude, hasSkyCondition, asyncErrorBoundary(create)],
  read: [hasObservationId, asyncErrorBoundary(observationExists), asyncErrorBoundary(read)],
  update: [
    hasObservationId,
    asyncErrorBoundary(observationExists),
    hasData,
    hasLatitude,
    hasLongitude,
    hasSkyCondition,
    asyncErrorBoundary(update),
  ],
  delete: [hasObservationId, asyncErrorBoundary(observationExists), asyncErrorBoundary(destroy)],
};
