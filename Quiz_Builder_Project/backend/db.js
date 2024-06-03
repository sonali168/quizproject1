const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const mongoURL = process.env.mongoURL;

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURL);

        console.log('Connected to MongoDB');

        const fetched_data_QAndA = await mongoose.connection.db.collection("qandadatas").find({}).toArray();
        const fetched_data_Poll = await mongoose.connection.db.collection("polldatas").find({}).toArray();

        global.QAndAData = fetched_data_QAndA;
        global.PollData = fetched_data_Poll;

        console.log('Data fetched and stored in global variables');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error; // Rethrow the error to indicate failure
    }
}

module.exports = mongoDB;
