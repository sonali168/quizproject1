const mongoose = require('mongoose')

const { Schema } = mongoose

const QAndADataSchema = new Schema({

    question: {
        type: String,
        required: true
    },
    optionType: {
        type: String,
        required: true
    },
    timer: {
        type: String,
    },
    count: {
        type: String,
        required: true
    },
    quiztype: {
        type: String,
        required: true
    },
    quizName: {
        type: String,
        required: true
    },
    UUID: {
        type: String,
        required: true
    },
    options: {
        type: [String], // Array of strings
        required: true
    },
    correctAnswerIndex: {
        type: Number,
        default: -1 // Default value indicating no correct answer selected yet
    },
    date: {
        type: Date,
        default: Date.now 
    }
})

module.exports = mongoose.model('Qandadata', QAndADataSchema)