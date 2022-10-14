const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(db);
        console.log(`Mongo DB connected..!`)
    } catch (error) {
        console.log(error.message);
        process.exit(1); // Exit process with failure
    }
}

module.exports = connectDB;
