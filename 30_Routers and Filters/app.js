const express = require('express');

const bodyParser = require('body-parser');

const adminRoute = require('./routes/adminRoute');

const shopRoute = require('./routes/shop');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use('/admin',adminRoute);
app.use(shopRoute);

app.use((req,res,next)=>{
    res.status(404);
    res.send('<h1>Error Page Not Found</h1>')
})

app.listen(3000);