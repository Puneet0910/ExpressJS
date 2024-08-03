const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const shopRoute = require('./routes/shopRoute');
const addProductRoute = require('./routes/adminRoute');
const contactRoute = require('./routes/contact');
const success = require('./routes/successRoute');

const app = express();

app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.urlencoded({extended:true}));



app.use(success);
app.use(addProductRoute);
app.use(contactRoute);
app.use(shopRoute);
app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(__dirname,'views', '404Error.html'));
})
app.listen(4000);