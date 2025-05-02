const express = require('express')
const { createTodo, getTodo, deleteTodo, todoUpdate, getTodoById } = require('../controller/todo')
const upload = require('../middleware/multer')
const router = express.Router()

router.post('/post', upload.single('image'), createTodo)

router.get('/gettodo', getTodo)

router.get('/gettodobyid/:id',getTodoById)

router.put('/updatetodo', upload.single('image'),todoUpdate)

router.delete('/deletetodo/:id',deleteTodo)

module.exports=router