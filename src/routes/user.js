const express = require('express');
const router = express.Router();
const { createUser, getUser } = require('../controller/user'); 

router.post('/post', createUser)
router.get('/getuser',getUser)

module.exports = router;
