const knex = require('../../../bin/database');

const create = async user => {
  const { firstname, lastname, email, password } = user;
  const emailExist = await knex('user').where('email', email);

  if (emailExist.length > 0) {
    throw new Error('The email is already exist!');
  }

  const userRecord = await knex('user')
    .returning('*')
    .insert({ firstname, lastname, email, password });

  return userRecord;
};

module.exports = { create };
