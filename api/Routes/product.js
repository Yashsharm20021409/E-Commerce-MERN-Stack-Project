const router = require('express').Router();
const Product = require('../Models/Product')
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');


// Create Product
router.post('/', verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body);

    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    }
    catch (err) { res.send(500).json(err) }
})

// update product
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updateProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
            { new: true }
        )
        // send updated user
        res.status(200).json(updateProduct);
    }
    catch (err) {
        res.status(500).json(err);
    }
})


// delete product
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted Successfully");
    }
    catch (err) {
        res.status(500).json(err);
    }
})

// get product // not middleware require everyone can access products
router.get('/find/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

// get All Products
router.get('/allproducts', async (req, res) => {

    // query for fetching new data
    // use this syntax in req new use in below line
    const qNew = req.query.new;

    // query for category wise fetching of data
    // use this syntax in req category use in below line not qCategory or categories 
    const qCategory = req.query.category;
    try {
        let allProducts

        if (qNew) {
            // sort those Products which are newly added
            allProducts = await Product.find.sort({ createdAt: -1 }).limit(1);
        }
        else if (qCategory) {
            allProducts = await Product.find({
                categories: {
                    $in: [qCategory]
                },
            });
        }
        else {
            // show any Products
            allProducts = await Product.find();
        }

        res.status(200).json(allProducts);
    }
    catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;