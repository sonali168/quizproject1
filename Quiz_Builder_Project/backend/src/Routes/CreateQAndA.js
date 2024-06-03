const express = require('express')
const router = express.Router()
const Qandadata = require('../models/QAndAData')

// signup page router
router.post("/QAndAQuestion", async (req, res) => {

    try {
        await Qandadata.create({
            question: req.body.question,
            optionType: req.body.optionType,
            timer: req.body.timer,
            count: req.body.count,
            quiztype: req.body.quiztype,
            quizName: req.body.quizName,
            UUID: req.body.UUID,
            options: req.body.options,
            correctAnswerIndex:req.body.correctAnswerIndex
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