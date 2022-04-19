const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const connectMongo = async () => {
    try {
        const conn = await mongoose.connect(process.env.mongo_uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        });
        console.log(`Mongo Db connected with ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error:${error.message}`);
        process.exit();
    }
}

module.exports = connectMongo;