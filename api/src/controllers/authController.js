const express = require('express');
const mongoose = require('../dataBase/index');

const User = require('../models/user');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.create(req.body);
    console.log('oioi');

    return res.send({ user });
  } catch (err) {
    return res.status(400).send({ error: 'Falha ao registrar.' });
  }
});

module.exports = app => app.use('/auth', router);