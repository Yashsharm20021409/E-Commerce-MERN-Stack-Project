const express = require('express')
const dotenv = require('dotenv')
const connectToMongo = require('./DB');
const userRoute = require('./Routes/user');
const authRoute = require('./Routes/auth');
const productRoute = require('./Routes/product');
const cartRoute = require('./Routes/cart');
const orderRoute = require('./Routes/order');
const stripeRoute = require('./Routes/stripe')
const cors = require("cors")


const app = express();
// to make server able to take json requests
app.use(express.json());

// dotenc file configure
dotenv.config(); 

 
// Connection to MongoDb 
connectToMongo();


// routes


// use of cors
// it is used when client is put any req (api req for data) which is at differ host ex:3000 and backend is at differ host ex:5000 to full fill client req we need cors and without it it can't be possible to do so
app.use(cors())
app.use('/api/auth',authRoute);
app.use('/api/users',userRoute);
app.use('/api/products',productRoute);
app.use('/api/carts',cartRoute);
app.use('/api/orders',orderRoute);
app.use('/api/checkout',stripeRoute);


// Listening app
app.listen(process.env.PORT || 5000,()=>{
    console.log(`Shop. app listening on port http://localhost:${process.env.PORT}`)
})