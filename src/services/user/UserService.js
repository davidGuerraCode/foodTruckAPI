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

const listUsers = async queryOptions => {
  let { offset, limit, fields } = queryOptions;
  offset = Number(offset);
  limit = Number(limit);
  limit = Math.min(limit, 50);
  fields = fields ? fields.split(',') : undefined;

  const usersRecordList = UserModel.listUsers(offset, limit, fields);

  return usersRecordList;
};

const updateUser = async (id, payload) => {
  const updatedUserRecord = await UserModel.updateUser(id, payload);

  return updatedUserRecord;
};

const deleteUser = async id => {
  const deletedUserRecord = await UserModel.deleteUser(id);

  return deletedUserRecord;
};

module.exports = { listUsers, signUp, updateUser, deleteUser };
