const express = require('express')
const { createTodo, getTodo, deleteTodo, todoUpdate, getTodoById } = require('../controller/todo')
const router = express.Router()

router.post('/post', createTodo)

router.get('/gettodo', getTodo)

router.get('/gettodobyid/:id',getTodoById)

router.put('/updatetodo',todoUpdate)

router.delete('/deletetodo/:id',deleteTodo)

module.exports=router