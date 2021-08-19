const tableNames = require("../../src/shared/constants/dbtables.js").tableNames

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex(tableNames.USER).del()
    .then(function () {
      // Inserts seed entries
      return knex(tableNames.USER).insert([
        {name: "admin", email: 'admin@admin.com', password:'password', isActive: true, username:'admin'},
      ]);
    });
};
