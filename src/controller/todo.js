const Todo = require("../models/todo")

exports.createTodo = async (req, res) => {
    try {
        const { title, completed, content } = req.body
        const filePath = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
        
        const NewTodo = new Todo({
            title, completed, content, image:filePath
        })
        await NewTodo.save()
        res.status(201).json(NewTodo)
    } catch (error) {
        res.status(500).json({ message: 'Error to creating todo', error })
    }

}

exports.getTodo = async (req, res) => {
    try {
        const todoList = await Todo.find()
        res.status(200).json(todoList)
    } catch (error) {
        res.status(500).json({ message: 'Todo not found' })
    }
}

exports.getTodoById = async (req, res) => {
    try {
        const { id } = req.params
        console.log({ id })
        const item = await Todo.findById(id)
        res.status(200).json(item)
    } catch (error) {
        res.status(500).json({ message: 'Todo not found' })
    }
}

exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params
        const deleteTodoData = await Todo.findByIdAndDelete(id)
        res.status(200).json("todo deleted sucesfully", deleteTodoData)
    } catch (error) {
        res.status(500).json({ message: 'Todo not found' })
    }
}

exports.todoUpdate = async (req, res) => {
    try {
        const { id, title, completed, content } = req.body
        const filePath = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
        console.log({ id, title, completed, content })
        if (id) {
            const updatedTodo = await Todo.findByIdAndUpdate(id, {
                title, completed, content, image: req.file.filename? filePath:''
            }, {
                new:true
            })
            res.status(200).json(({message:'Todo Updated sucesfully', updatedTodo}))
        } else {
            res.status(400).json('enter id')
        }

    } catch (error) {
        res.status(500).json({ message: 'Todo not found',error })
    }
}







