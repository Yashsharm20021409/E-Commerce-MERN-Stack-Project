const mongoose = require('mongoose')
// const mongoURI = 
const dotenv = require('dotenv')


dotenv.config()

const connectToMongo =   () => {
    mongoose.connect(
        process.env.MONGO_URL
    ).then(()=>{
        console.log("Database Connected Successfully");
    }).catch((error) => console.log(error));
}

module.exports = connectToMongo;