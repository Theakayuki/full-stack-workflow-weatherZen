const knex = require('../db/connection');

function create(newObservation) {
  return knex('observations').insert(newObservation).returning('*');
}

function list() {
  return knex('observations').select('*');
}

function read(observationId) {
  return knex('observations').select('*').where({ observation_id: observationId }).first();
}

function update(updatedObservation) {
  return knex('observations')
    .where({ observation_id: updatedObservation.observation_id })
    .update({
      sky_condition: updatedObservation.sky_condition,
      latitude: updatedObservation.latitude,
      longitude: updatedObservation.longitude,
      air_temperature: updatedObservation.air_temperature,
      air_temperature_unit: updatedObservation.air_temperature_unit,
    })
    .returning('*');
}

function destroy(observationId) {
  return knex('observations').where({ observation_id: observationId }).del();
}

module.exports = {
  create,
  list,
  read,
  update,
  delete: destroy,
};
