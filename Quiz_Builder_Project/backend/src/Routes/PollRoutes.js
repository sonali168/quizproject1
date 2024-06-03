// PollRoutes.js

const express = require('express');
const router = express.Router();
const Poll = require('../models/PollData');

// Define routes for Model1
router.get('/Poll', async (req, res) => {
    try {
        // Logic to fetch data from Model1
        const Polldatas = await Poll.find();
        res.json(Polldatas);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

// Add other routes for Model1 as needed

module.exports = router;
