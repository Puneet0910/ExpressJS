const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.post('delete-product', adminController.postDeleteProduct);

module.exports = router;