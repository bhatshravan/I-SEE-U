const express = require('express');
const router = express.Router();

const User_controller = require('../controllers/Users_controllers');

router.get('/Login',User_controller.login);

// router.post('/Login',)

module.exports = router;
