const express = require('express');
const router = express.Router();
const Poll = require('../models/PollData');
const QAndA = require('../models/QAndAData');

router.post("/dbdata", async (req, res) => {
    try {
        const { UUID } = req.body;

        // Fetch data from both models based on UUID
        const pollData = await Poll.find({ UUID });
        const qAndAData = await QAndA.find({ UUID });

        // Combine and send the fetched data
        res.send({ pollData, qAndAData });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
