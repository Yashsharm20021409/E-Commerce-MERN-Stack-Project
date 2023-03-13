const router = require('express').Router();
const User = require('../Models/User');
const CryptoJs = require('crypto-js');
const jwt = require("jsonwebtoken");


router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJs.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString(),
    })

    try {
        const savedUser = await newUser.save();
        res.status(201).send(savedUser);
    }
    catch (err) {
        res.status(500).send(err);
    }
})

router.post('/login', async (req, res) => {

    try {

        const user = await User.findOne({
            username: req.body.username
        });

        if (!user) {
            return res.status(401).json("Wrong Username");
        }


        //decrypt => decode the pass
        const hashedPassword = CryptoJs.AES.decrypt(
            user.password, process.env.PASS_SEC
        );

        // convert from hasspass string to pass + resolve some special char if you have used in your PASS_SEC
        const orgPass = hashedPassword.toString(CryptoJs.enc.Utf8);
        const inputPass = req.body.password;

        orgPass !== inputPass && res.status(401).json("Wrong password");

        const jsonWebToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
            // means token expires in three days and after that again you have to login
            { expiresIn: "3d" }
        )


        // const {password,email,...others} = user._doc;
        const { password, ...others } = user._doc;

        // if all Okay return the user
        res.status(200).json({ ...others, jsonWebToken });

    } catch (err) {
        // here if we send response our server get crashed
        // res.status(500).json(err);
        console.log(err)
    }
})


module.exports = router;