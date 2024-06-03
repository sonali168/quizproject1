const express = require('express');
const cors = require('cors'); // Import the cors middleware
const mongoDB = require('./db');
const PollRoutes = require('./src/Routes/PollRoutes');
const QandARoutes = require('./src/Routes/QandARoutes');

const app = express();
const port = 5000;

// Connect to MongoDB
mongoDB()
  .then(() => {
    // Set up CORS middleware
    app.use(cors({
      origin: 'http://localhost:3000'
  }));

    // Middleware to parse JSON bodies
    app.use(express.json());

    // Routes
    app.use('/', require('./src/Routes/CreateUser'));
    app.use('/', require('./src/Routes/CreateQAndA'));
    app.use('/', require('./src/Routes/CreatePoll'));
    app.use('/api', require('./src/Routes/DisplayData'));
    app.use('/api', require('./src/Routes/DataRoutes'));
    app.use('/api/Poll', PollRoutes);
    app.use('/api/QAndA', QandARoutes);

    // Default route
    app.get('/', (req, res) => {
      res.send('Hello World!');
    });

    // Start the server
    app.listen(port, () => {
      console.log("Server is up...");
    });
  })
  .catch(error => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1); // Exit the process if MongoDB connection fails
  });
