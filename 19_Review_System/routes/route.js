const express = require('express');

const controller = require('../controller/controller');

const router = express.Router();

router.post('/addReview', controller.addReview);
router.get('/getReviews/:name', controller.getreviews);


module.exports = router;