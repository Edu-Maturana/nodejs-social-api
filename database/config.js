const mongoose = require('mongoose');

const MongoDBConnection = async() => {

    try {

        await mongoose.connect( process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
    
        console.log('Connected to database!');

    } catch (error) {
        console.log(error);
        throw new Error("Error connecting to database");
    }
}

module.exports = {
    MongoDBConnection
}
