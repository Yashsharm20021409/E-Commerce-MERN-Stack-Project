const express = require('express')
const dotenv = require('dotenv')
const connectToMongo = require('./DB')
// const userRoute = require('./Routes/user')
const auth = require('./Routes/auth');

const app = express();
// to make server able to take json requests
app.use(express.json());

// dotenc file configure
dotenv.config(); 

 
// Connection to MongoDb 
connectToMongo();


// routes
//1. Auth Routes
app.use('/api/routes',auth);
app.use('/api/routes',auth);


// Listening app
app.listen(process.env.PORT || 5000,()=>{
    console.log(`Shop. app listening on port http://localhost:${process.env.PORT}`)
})