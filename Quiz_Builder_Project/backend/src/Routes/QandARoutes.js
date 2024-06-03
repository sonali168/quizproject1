// QAndARoutes.js

const express = require('express');
const router = express.Router();
const QAndA = require('../models/QAndAData');

// Define routes for Model2
router.get('/QAndA', async (req, res) => {
    try {
        // Logic to fetch data from Model2
        const QAndAdatas = await QAndA.find();
        res.json(QAndAdatas);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

// Add other routes for Model2 as needed

module.exports = router;
