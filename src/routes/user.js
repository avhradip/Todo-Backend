const express = require('express');
const router = express.Router();
const { createUser, getUser, getUserById, updateUser, deleteUser, updateUserPartial, login, getUserByToken } = require('../controller/user');
const authenticateToken = require('../middleware/auth');
const upload = require('../middleware/multer')

router.post('/post',upload.single('image'), createUser)
router.get('/getuser', getUser)
router.get('/getuserbyid/:id', getUserById)
router.put('/updateuser', updateUser)
router.patch('/updateparts', updateUserPartial)
router.delete('/deleteuser', deleteUser)
router.post('/login', login)
router.get('/getUserByToken',authenticateToken,getUserByToken)

module.exports = router;
