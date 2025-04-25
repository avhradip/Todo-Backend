const mongoose = require('mongoose')

const cnocketDb = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/test')
        console.log('mongodbCnnockted');
    } catch (error) {
        console.error('mongodb cnnoction faild', error.message)
        process.exit(1)
    }
}

module.exports = cnocketDb
























