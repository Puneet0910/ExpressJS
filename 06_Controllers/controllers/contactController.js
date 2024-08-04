const path = require('path');

const rootDir = require('../util/path');

exports.getContact = (req,res,next)=>{
    res.sendFile(path.join(rootDir,'views', 'contact.html'));
}

exports.postContact = (req,res,next)=>{
    res.redirect('/contactSucess');
}

exports.getContactSuccess = (req,res,next)=>{
    res.sendFile(path.join(rootDir, 'views', 'contactSucess.html'));
}