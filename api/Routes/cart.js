const router = require('express').Router();
const Cart = require('../Models/Cart')
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');


// Push into cart
router.post('/', verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);

    try {
        const savedCart = await newCart.save();
        res.status(201).json(savedCart);
    }
    catch (err) { res.send(500).json(err) }
})

// update cart
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },
            { new: true }
        )
        res.status(200).json(updatedCart);
    }
    catch (err) {
        res.status(500).json(err);
    }
})


// delete product
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Item has been deleted Successfully");
    }
    catch (err) {
        res.status(500).json(err);
    }
})

// get single user cart on client side of application
router.get('/find/:userId',verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Cart.findOne({userId:req.params.userId});
        res.status(200).json(cart);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

// get All Carts of All the Users on client side of admin
router.get('/allcarts',verifyTokenAndAdmin ,async (req, res) => {

    try {
        const allCarts = await Cart.find();
        if(allCarts.length > 0)
        {
            res.status(200).json(allCarts);
        }
        else
        {
            res.status(200).json("No Cart Exists")
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;