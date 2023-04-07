
exports.up = function(knex) {
  return knex.schema.alterTable('observations', (table) => {
    table.string('air_temperature_unit').notNullable().defaultTo('F');
    table.integer('air_temperature').notNullable().defaultTo(0);
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('observations', (table) => {
    table.dropColumn('air_temperature_unit');
    table.dropColumn('air_temperature');
  });
};
