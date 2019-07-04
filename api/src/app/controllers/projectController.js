const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Post = require('../models/posts');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('user');

        return res.send({ posts });
    } catch (error) {
        return res.status(400).send({ error: 'Error ao listar posts!' })
    }
});

router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId).populate('user');

        return res.send({ post });
    } catch (error) {
        return res.status(400).send({ error: 'Error ao lista o post!' })
    }
});

router.post('/', async (req, res) => {
    try {
        const post = await Post.create({ ...req.body, user: req.userId });

        return res.send({ post });
    } catch (error) {
        return res.status(400).send({ error: 'Error ao criar um post!' })
    }
});

router.put('/:postId', async (req, res) => {
    res.send({ user: req.userId });
});

router.delete('/:postId', async (req, res) => {
    try {
        await Post.findByIdAndRemove(req.params.postId).populate('user');

        return res.send();
    } catch (error) {
        return res.status(400).send({ error: 'Error ao deletar posts!' })
    }
});

module.exports = app => app.use('/timeline', router);