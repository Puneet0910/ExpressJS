const express = require('express');

const router = express.Router();

const contactController = require('../controllers/contactController');

router.get('/contactSucess', contactController.getContactSuccess);

module.exports = router;