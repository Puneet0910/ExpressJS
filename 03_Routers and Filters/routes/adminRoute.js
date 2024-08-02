const express = require('express');

const router = express.Router();

router.get('/add-product', (req,res,next)=>{
    res.send(`
        <html>
        <head>
        <title>Add Product</title>
        </head>
        <body>
        <form action='/product' method="POST">
        Enter Product Name<input type="text" name="product"><br>
        Enter Quantity <input type="number" name="quantity"><br>
        <button type="submit">Add Product</button>
        </form>
        </body>
        </html>    
    `);
});

router.post('/product',(req, res, next)=>{
    const product = req.body.product;
    const quantity = req.body.quantity;

    console.log(product);
    console.log(quantity);
})

module.exports = router;