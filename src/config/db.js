const mongoose = require('mongoose')

const cnocketDb = async () => {
    try {
        await mongoose.connect("mongodb+srv://avhradipghosh:HaDKMjF8kYklseN9@cluster0.uzlih4g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster08")
        console.log('mongodbCnnockted');
    } catch (error) {
        console.error('mongodb cnnoction faild', error.message)
        process.exit(1)
    }
}

module.exports = cnocketDb
























