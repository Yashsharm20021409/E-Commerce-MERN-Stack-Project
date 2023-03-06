const jwt = require('jsonwebtoken');



// to verify the user with the help of token allocated to that user
const verifyToken = (req, res, next) => {

    // fetch token from header
    const authToken = req.headers.token

    // if token exists
    if (authToken) {

        // to remove Bearer keyWord we used in header
        const token = authToken.split(" ")[1];

        // verify user if exist then store that user otherwise return the error
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) {
                return res.status(403).json("Token is not valid!");
            }
            else {
                req.user = user;

                // when everything is okay now after exe of next function it leaves this function and return to the router
                next();
            }
        })
    }
    else {
        return res.status(401).json("You are Not Authenticated");
    }
}


// means only admin or user can update this that why we declare this function user every where we need
const verifyTokenAndAuthorization = (req, res, next) => {
    // here this time next function is verTokenAndAuth itself
    verifyToken(req, res, () => { 

        // if user or admin
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not alowed to do that!");
        }
    })
}


// this function is required to allowed only admins to manage the products on the site like add delete etc
const verifyTokenAndAdmin = (req,res,next)=>{

    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }
        else{
            res.status(403).json("You are not alowed to do that!");
        }
    })
}

module.exports = {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin};