const tableNames = require("../../src/shared/constants/dbtables.js").tableNames

exports.up = function (knex) {
   return knex.schema
   //user
   .createTable(tableNames.USER, (table) => {
      table.increments('id');
      table.string('name', 255).notNullable();
      table.string('email', 255).unique().notNullable();
      table.string('username', 255).unique().notNullable();
      table.string('password',255).notNullable();
      table.boolean('isActive').notNullable();
      table.timestamps(true, true)
   })
   //location
   .createTable(tableNames.LOCATION, (table) => {
      table.increments('id');
      table.string('latitude', 255).notNullable();
      table.string('longitude', 255).notNullable();
      table.string('localityName', 255).notNullable();
      table.string('city', 100).notNullable();
      table.string('address', 255).notNullable();
      table.string('address2', 255).notNullable();
      table.string('street', 255);
      table.integer('pinCode').notNullable();
      table.string('state', 100).notNullable();
      table.string('country', 100).notNullable();
      table.timestamps(true, true)
   })
 .then((result)=>{
      console.log(result,'All tables created')
   }).catch((error)=>{
      console.log(error)
   })

};

exports.down = function (knex) {
   return knex.schema
   .dropTable(tableNames.USER)
   .dropTable(tableNames.LOCATION)
};

exports.config = { transaction: false };