const express = require('express');
const router = express.Router();
const { UserService } = require('../services');

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

router.get('/', async (req, res) => {
  const users = await UserService.listUsers();
  res.status(200).json(users);
});

module.exports = router;
