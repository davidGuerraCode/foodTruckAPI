const express = require('express');
const router = express.Router();
const { UserService } = require('../services');

router.get('/', async (req, res) => {
  const queryOptions = req.query;
  const users = await UserService.listUsers(queryOptions);

  if (users.length < 1) {
    return res.status(404).json({ message: 'There is no records on DB' });
  }

  return res.status(200).json({ message: 'List of users', users });
});

router.post('/', async (req, res) => {
  try {
    const userDTO = req.body;
    const user = await UserService.signUp(userDTO);

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: 'The email already exist! Try singup whit a diferent one!' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const userDTO = req.body;
  const updatedUser = await UserService.updateUser(id, userDTO);

  if (updatedUser.length < 1) {
    return res.status(404).json({ message: 'Error trying to update the user' });
  }

  return res.status(200).json({ message: 'User updated', user: updatedUser });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deletedUser = await UserService.deleteUser(id);

  if (deletedUser.length < 1) {
    return res.status(400).json({ message: 'Error trying to delete the user' });
  }

  return res.status(200).json({ message: 'User deleted' });
});

module.exports = router;
