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

const listUsers = async (offset = 0, limit = 0, fields = []) => {
  const usersRecordList = await knex('user')
    .where('deleted', false)
    .select('*')
    .limit(limit)
    .offset(offset);

  return usersRecordList;
};

const updateUser = async (id, payload) => {
  const updatedUserRecord = await knex('user')
    .where('user_id', '=', id)
    .update(payload);

  return updatedUserRecord;
};

const deleteUser = async id => {
  const deleteUserRecord = await knex('user')
    .where('user_id', id)
    .update({ deleted: true });

  return deleteUserRecord;
};

module.exports = { create, listUsers, updateUser, deleteUser };
