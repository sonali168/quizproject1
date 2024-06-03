const express = require('express')
const router = express.Router()
const Polldata = require('../models/PollData')

// signup page router
router.post("/PollQuestion", async (req, res) => {

    try {
        await Polldata.create({
            question: req.body.question,
            optionType: req.body.optionType,
            count: req.body.count,
            quiztype: req.body.quiztype,
            quizName: req.body.quizName,
            UUID: req.body.UUID,
            options: req.body.options,
            correctAnswerIndex: req.body.correctAnswerIndex,
            date: new Date().toISOString()
        })
        .then(res.json({ success: true, status: 400 }))
    } catch (err) {
        console.log(err)
        res.json({
            success: false,
            status: 200
        })
    }
})


module.exports = router