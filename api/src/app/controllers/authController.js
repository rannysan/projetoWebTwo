const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('../../dataBase/index');

const authConfig = require('../../config/auth');

const User = require('../models/user');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name } = req.body;

  try {

    if (await User.findOne({ name }))
      return res.status(400).send({ error: 'Usuario já cadastrado' });

    console.log(req.body);
    const user = await User.create(req.body);
    console.log('oioi');

    user.password = undefined;

    return res.send({ user });
  } catch (err) {
    return res.status(400).send({ error: 'Falha ao registrar.' });
  }
});

router.post('/login', async (req, res) => {
  const { name, password } = req.body;
  console.log( req.body );
  console.log( name );

  const user = await User.findOne({ name }).select('+password');

  if (!user)
    return res.status(400).send({ error: 'Usuário não encontrado!' });

  if (!await bcryptjs.compare(password, user.password))
    return res.status(400).send({ error: 'Senha inválida!' });

  user.password = undefined;

  const token = jwt.sign({ id: user.id }, authConfig.secret, {
    expiresIn: 86400,
  });


  res.send({ user, token });
});

module.exports = app => app.use('/auth', router);