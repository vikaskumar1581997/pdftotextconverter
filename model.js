const mongoose = require('mongoose')
const schema = mongoose.Schema

const bookSchema = new schema({
    title: {
        type: String
    },
    textContent: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


const Book = mongoose.model('book', bookSchema)

module.exports = Book
