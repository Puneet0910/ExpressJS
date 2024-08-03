const express = require('express');
const path = require('path');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/contactSucess', (req,res,next)=>{
    res.sendFile(path.join(rootDir, 'views', 'contactSucess.html'));
});

module.exports = router;