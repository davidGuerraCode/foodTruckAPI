// * In this file we just make calls to the methos that are defined on the model.
const UserModel = require('./UserModel.js');

const signUp = async user => {
  try {
    const userRecord = await UserModel.create(user);

    // TODO: Make a function that filter all the data from the DB to exclude some attr.
    return {
      user: {
        email: userRecord.email,
        firstname: userRecord.firstname,
        lastname: userRecord.lastname,
        created_at: userRecord.created_at
      }
    };
  } catch (error) {
    throw new Error(error);
  }
};

const listUsers = async (offset, limit, fields) => {
  const users = await knex.select('*').from('user');

  return users;
};

module.exports = { listUsers, signUp };
