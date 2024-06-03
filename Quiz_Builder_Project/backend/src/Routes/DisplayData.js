const express = require('express');
const router = express.Router();

// Initialize variables to hold data
let qAndAData = null;
let pollData = null;

// Function to fetch data
const fetchData = () => {
    // Simulate fetching data from database or global variables
    qAndAData = global.QAndAData;
    pollData = global.PollData;
    console.log(pollData)
    console.log("Data fetched at: ", new Date().toLocaleTimeString());
};

// Fetch data initially and every few seconds
fetchData(); // Fetch data initially
const interval = setInterval(fetchData, 1000); // Fetch data every 5 seconds

router.post("/fetchedData", async (req, res) => {
    try {
        // Check if the data is available
        if (!qAndAData || !pollData) {
            throw new Error("Data not available");
        }
      
        res.send([qAndAData, pollData]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
