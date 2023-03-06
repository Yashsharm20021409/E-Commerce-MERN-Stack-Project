const router = require('express').Router();
const CryptoJs = require('crypto-js');
const User = require('../Models/User');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');


// update user
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {

    // if need to update password then encyrpt that again
    if (req.body.password) {
        req.body.password = CryptoJs.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString();
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
            { new: true }
        )

        // send updated user
        res.status(200).json(updatedUser);
    }
    catch (err) {
        res.status(500).json(err);
    }
})


// delete user
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted Successfully");
    }
    catch (err) {
        res.status(500).json(err);
    }
})

// get user
router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

// get Allusers
router.get('/allusers', verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
        const user = query ? await User.find().sort({ _id: -1 }).limit(1) : await User.find();
        // const {password,...others} = user._doc;
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

// get User Stats :- number of users monthly

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  
    try {
      const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;