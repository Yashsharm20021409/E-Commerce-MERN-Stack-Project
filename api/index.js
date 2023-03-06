const express = require('express')
const dotenv = require('dotenv')
const connectToMongo = require('./DB');
const userRoute = require('./Routes/user');
const authRoute = require('./Routes/auth');
const productRoute = require('./Routes/product');

const app = express();
// to make server able to take json requests
app.use(express.json());

// dotenc file configure
dotenv.config(); 

 
// Connection to MongoDb 
connectToMongo();


// routes
//1. Auth Routes
app.use('/api/routes',authRoute);
app.use('/api/users',userRoute);
app.use('/api/products',productRoute);


// Listening app
app.listen(process.env.PORT || 5000,()=>{
    console.log(`Shop. app listening on port http://localhost:${process.env.PORT}`)
})