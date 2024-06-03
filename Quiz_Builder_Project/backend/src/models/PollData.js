const mongoose = require('mongoose')

const { Schema } = mongoose

const PollDataSchema = new Schema({

    question: {
        type: String,
        require: true
    },
    optionType: {
        type: String,
        require: true
    },
    count: {
        type: String,
        require: true
    },
    quiztype: {
        type: String,
        require: true
    },
    quizName: {
        type: String,
        require: true
    },
    UUID: {
        type: String,
        require: true
    },
    options: {
        type: [String], // Array of strings
        required: true
    },
    correctAnswerIndex: {
        type: Number,
        default: -1 
    },
    date: {
        type: Date,
        default: Date.now 
    }

})

module.exports = mongoose.model('Polldata', PollDataSchema)
