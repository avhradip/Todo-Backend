const express = require('express')
const app = express()
const port = 8080
const path = require('path')
const cnnockerDb = require('./config/db')
const todoRoute = require('./routes/todo.js')
const userRouter = require('./routes/user.js')
const cors = require('cors')
cnnockerDb()

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
app.use(express.static(__dirname))

app.get('/', (req, res) => {
    res.json({
        message:'server is running'
    })
})

// app.get('/newone', (req, res) => {
//     res.json({
//         message: 'server newone is running'
//     })
// })

// app.get('/html', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'))
// })

app.use('/todo', todoRoute)
app.use('/user',userRouter)


app.listen(port, () => {
    console.log(`serverruningatport ${port}`);
})


// const http = require('http')
// const port = 8000
// const server = http.createServer((req, res) => {
//     if (req.url === '/') {
//         res.end('hi')
//     } else if(req.url == '/abc') {
//         res.end('hello')
//     }
        
// })

// server.listen(port, () => {
//     console.log(`serverruningatport${8000}`);
// })

// C: \Users\abirg\AppData\Local\Programs\mongosh