const express = require('express');
const router = express.Router();
const {users} = require('../data/usersData');

router.get('/', (req, res) => {
    res.json(users);
})

router.post('/', (req, res) => {
    const { name} = req.body;

    if (!name) {
        return res.status(400).json({
            error: 'É necessário preencher o nome.'
        })
    }

    const newUser = {
        id: users.length + 1,
        name
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

module.exports = router;